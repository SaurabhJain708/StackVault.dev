// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const host = req.headers.get("host"); // e.g., john.stackvault.dev

    if (host) {
      const domainParts = host.split(".");
      const subdomain = domainParts.length > 2 ? domainParts[0] : null;

      // Skip www and main domain
      if (subdomain && subdomain !== "www" && subdomain !== "stackvault") {
        if (!req.nextUrl.pathname.startsWith(`/profile/${subdomain}`)) {
          url.pathname = `/profile/${subdomain}`;
          return NextResponse.redirect(url);
        }
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        console.log("🛡️ Checking auth for:", pathname);

        // Always allow public routes
        if (
          pathname.startsWith("/auth/") ||
          pathname.startsWith("/api/auth/") ||
          pathname === "/favicon.ico" ||
          pathname.startsWith("/api/public/") ||
          pathname === "/login" ||
          pathname.startsWith("/portfolio/") ||
          pathname.startsWith("/preview/") ||
          pathname === "/templates" ||
          pathname.startsWith("/profile/") ||
          pathname === "aboutus" ||
          pathname === "/blogs" ||
          pathname === "/careers" ||
          pathname === "/contact" ||
          pathname === "/privacypolicy" ||
          pathname === "/termsofservice" ||
          pathname === "/api/template" ||
          pathname === "/api/templatebyid" ||
          pathname === "/"
        ) {
          return true;
        }

        // Protect dashboard and private API routes
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/api/private")
        ) {
          return !!token?.id;
        }

        // Default: allow only if token exists
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  },
);

// Matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/private/:path*",
    "/((?!_next|favicon.ico).*)",
  ],
};

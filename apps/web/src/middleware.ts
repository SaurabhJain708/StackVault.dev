// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
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
          pathname === "/templates"
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
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
};

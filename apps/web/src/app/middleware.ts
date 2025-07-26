import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    // This gets called ONLY if authorized() returns true
    console.log("printed ");
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        console.log("🛡️ Checking auth for:", pathname);

        // Always allow access to these routes
        if (
          pathname.startsWith("/auth/") ||
          pathname.startsWith("/api/auth/") ||
          pathname.startsWith("/public/") ||
          pathname.startsWith("/api/public/") ||
          pathname.startsWith("/api/private/") ||
          pathname === "/login" ||
          pathname.startsWith("/public/")
        ) {
          return true;
        }

        // Redirect manually when not authorized on /v1/*
        if (pathname.startsWith("/v1/")) {
          if (token?.id) {
            return true;
          } else {
            // 👇 Trick: return false here & handle redirect in middleware
            return false;
          }
        }

        return !!token;
      },
    },

    pages: {
      signIn: "/auth/login", // 👈 Redirect here if `authorized` returns false
    },
  }
);

// Match everything except public/static/image files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};

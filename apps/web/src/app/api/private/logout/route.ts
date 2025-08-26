import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = new NextResponse("Logout successful", { status: 200 });

    const cookieNames = [
      "__next_hmr_refresh_hash__",
      "next-auth.callback-url",
      "next-auth.csrf-token",
      "next-auth.session-token",
      "__Host-next-auth.csrf-token",
      "__Secure-next-auth.callback-url",
      "__Secure-next-auth.session-token",
    ];

    cookieNames.forEach((name) => {
      response.cookies.set(name, "", {
        maxAge: 0,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

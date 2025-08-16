import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = new NextResponse("Logout successful", { status: 200 });

    const cookieNames = [
      "__next_hmr_refresh_hash__",
      "next-auth.callback-url",
      "next-auth.csrf-token",
      "next-auth.session-token",
    ];

    cookieNames.forEach((name) => {
      response.cookies.set({
        name,
        value: "",
        maxAge: 0,
        path: "/", // important to match
      });
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
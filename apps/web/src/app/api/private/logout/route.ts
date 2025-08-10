import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    const response = new NextResponse("Logout successful", { status: 200 });
    response.cookies.delete("__next_hmr_refresh_hash__");
    response.cookies.delete("next-auth.callback-url");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("next-auth.session-token");
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

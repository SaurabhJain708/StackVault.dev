import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

export async function GET() {
  if (process.env.NODE_ENV !== "test") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = await encode({
    token: {
      id: "test-user-id",
      email: "test@example.com",
      name: "Test User",
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const response = NextResponse.json({ success: true });

  // Use the correct cookie name for your session strategy
  response.cookies.set("next-auth.session-token", token, {
    httpOnly: true,
    path: "/",
    secure: false,
  });

  return response;
}

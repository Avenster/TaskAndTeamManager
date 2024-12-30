// app/utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

// Export session utilities
export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "lax",
      secrets: [process.env.JWT_SECRET!],
      secure: process.env.NODE_ENV === "production",
    },
  });
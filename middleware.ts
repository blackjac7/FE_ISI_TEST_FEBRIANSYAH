import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { COOKIE_NAME } from "./utils/constants";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/task")
  ) {
    if (!request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/signin")) {
    if (request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/signup")) {
    if (request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/signin", "/signup", "/task/:path*"],
};

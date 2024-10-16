import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/es";

    // Redirect to the language-specific path
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

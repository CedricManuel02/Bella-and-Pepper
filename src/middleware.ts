import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the session token from cookies
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(request.nextUrl.pathname === "/checkout" && !token){
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/checkout"], 
};

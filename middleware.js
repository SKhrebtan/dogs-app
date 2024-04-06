import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

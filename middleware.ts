import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === "/login";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isDriverRoute = req.nextUrl.pathname.startsWith("/driver");

    // אם לא מחובר ומנסה לגשת לעמוד מוגן
    if (!isAuth && (isAdminRoute || isDriverRoute)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // אם מחובר ומנסה לגשת לעמוד התחברות
    if (isAuth && isAuthPage) {
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/driver/dashboard", req.url));
      }
    }

    // בדיקת הרשאות לפי תפקיד
    if (isAdminRoute && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/driver/dashboard", req.url));
    }

    if (isDriverRoute && token?.role !== "DRIVER") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // אפשר גישה לעמוד התחברות תמיד
        if (req.nextUrl.pathname === "/login") {
          return true;
        }
        // דרוש אימות לכל שאר העמודים המוגנים
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/driver/:path*", "/login"],
};

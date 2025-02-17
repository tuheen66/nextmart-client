import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type TRole = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

//! to get the pathname of the authRoutes take 'request' as parameter
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  //* checking if user logged in
  if (!userInfo) {
    //* if user wants to go to authRoutes then let him
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    //! if user wants to go private route before login, redirect to login page and after login redirect to the private route he initially wanted to go.
    else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  //? checking if the userInfo has role and the role is included in "roleBasedPrivateRoutes"
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as TRole]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as TRole];

    //? checking if the routes are there where the user wants to go after login, if yes then let him
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  //! to redirect user to home page if not an admin
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};

//! middleware function triggers when navigating from one route to another

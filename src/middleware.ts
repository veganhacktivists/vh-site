import { UserRole } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { i18nRouter } from 'next-i18n-router';
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

import { createRedirectMap } from '../redirects';
import i18nConfig from '../i18nConfig';

import type { NextRequestWithAuth } from 'next-auth/middleware';
import type { NextMiddleware } from 'next/server';

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === UserRole.Admin,
  },
});

const redirectMap = createRedirectMap();

const withPathnameHeader = (nextResponse: NextResponse, pathname: string) => {
  nextResponse.headers.set('x-pathname', pathname);
  return nextResponse;
};

const middleware: NextMiddleware = async (request, event) => {
  const pathname = request.nextUrl.pathname;

  const redirect = redirectMap[pathname];
  if (redirect) {
    return withPathnameHeader(
      NextResponse.redirect(redirect.destination, {
        status: redirect.permanent
          ? StatusCodes.MOVED_PERMANENTLY
          : StatusCodes.MOVED_TEMPORARILY,
      }),
      pathname,
    );
  }

  // There are no translations for the playground pages,
  // so the i18n router middleware is not needed there but runs on all other pages.
  // Is there a clean way to run multiple middlewares?
  if (
    pathname.startsWith('/playground/admin') &&
    typeof authMiddleware === 'function'
  ) {
    const autMwResponse = await authMiddleware(
      request as NextRequestWithAuth,
      event,
    );

    if (autMwResponse) {
      return withPathnameHeader(autMwResponse as NextResponse, pathname);
    }

    return withPathnameHeader(NextResponse.next(), pathname);
  }

  return withPathnameHeader(i18nRouter(request, i18nConfig), pathname);
};

export default middleware;

export const config = {
  matcher: [
    '/((?!api|fonts|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon-32x32.png|favicon-16x16.png|robots.txt).*)',
  ],
};

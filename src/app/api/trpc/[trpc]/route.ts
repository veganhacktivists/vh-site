import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from 'server/api/root';
import { createTRPCContext } from 'server/api/trpc';

import type { NextRequest } from 'next/server';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({ headers: req.headers });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: ({ error }) => {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    allowBatching: true,
  });

export { handler as GET, handler as POST };

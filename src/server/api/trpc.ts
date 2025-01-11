import { Prisma } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';
import prisma from 'lib/db/prisma';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerSession(nextAuthOptions);

  return {
    prisma,
    user: session?.user,
    ...opts,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

superjson.registerCustom<Prisma.Decimal, string>(
  {
    isApplicable: (v): v is Prisma.Decimal => Prisma.Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Prisma.Decimal(v),
  },
  'decimal.js',
);

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

export const mergeTRPCRouters = t.mergeRouters;

export const trpcMiddleware = t.middleware;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const baseProcedure = t.procedure;

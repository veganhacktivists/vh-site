import { TRPCError } from '@trpc/server';
import { UserRole } from '@prisma/client';

import { baseProcedure, trpcMiddleware } from 'server/api/trpc';

export const protectedProcedure = baseProcedure.use(
  trpcMiddleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        user: ctx.user,
      },
    });
  }),
);

export const adminProcedure = protectedProcedure.use(
  trpcMiddleware(async ({ ctx, next }) => {
    if (ctx.user?.role !== UserRole.Admin) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  }),
);

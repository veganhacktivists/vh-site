import { TRPCError } from '@trpc/server';
import { RequestStatus } from '@prisma/client';

import { applyToRequestSchema } from 'lib/services/playground/schemas';
import { applyToHelp } from 'lib/services/playground';
import { createTRPCRouter } from 'server/api/trpc';
import { protectedProcedure } from 'server/api/procedures/auth';

const applicationsRouter = createTRPCRouter({
  submitApplication: protectedProcedure
    .input(applyToRequestSchema)
    .mutation(async ({ input, ctx: { user, prisma } }) => {
      const request = await prisma.playgroundRequest.findFirst({
        where: { id: input.requestId, status: RequestStatus.Accepted },
      });

      if (!request) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Request not found',
        });
      }

      return applyToHelp({
        ...input,
        applicantId: user.id,
      });
    }),
  getLastUserApplication: protectedProcedure.query(
    async ({ ctx: { user, prisma } }) => {
      const application = await prisma.playgroundApplication.findFirst({
        where: {
          applicantId: user.id,
        },
        select: {
          name: true,
          portfolioLink: true,
          twitterUrl: true,
          instagramUrl: true,
          linkedinUrl: true,
          isVegan: true,
          calendlyUrl: true,
          providedEmail: true,
          status: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      return application;
    },
  ),
});

export default applicationsRouter;

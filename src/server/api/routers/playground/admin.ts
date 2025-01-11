import { ApplicationStatus, RequestStatus } from '@prisma/client';
import { z } from 'zod';

import {
  deleteRequest,
  getPendingApplications,
  getRequests,
  repostRequest,
  setApplicationStatus,
  setRequestStatus,
} from 'lib/services/playground/admin';
import {
  deleteRequestSchema,
  getPendingApplicationsSchema,
  getRequestsAdminSchema,
  repostRequestSchema,
  setApplicationStatusSchema,
  setRequestStatusSchema,
} from 'lib/services/playground/schemas';
import { createTRPCRouter } from 'server/api/trpc';
import { adminProcedure } from 'server/api/procedures/auth';

const adminRouter = createTRPCRouter({
  pendingApplications: adminProcedure
    .input(getPendingApplicationsSchema)
    .query(({ input }) => {
      return getPendingApplications(input);
    }),
  setApplicationStatus: adminProcedure
    .input(setApplicationStatusSchema)
    .mutation(({ input }) => {
      return setApplicationStatus(input);
    }),
  deleteApplication: adminProcedure
    .input(z.string().cuid())
    .mutation(({ input: id, ctx: { prisma } }) =>
      prisma.playgroundApplication.update({
        where: { id },
        data: { status: ApplicationStatus.Rejected },
      }),
    ),

  getRequests: adminProcedure
    .input(getRequestsAdminSchema)
    .query(async ({ input }) => {
      const result = await getRequests(input);
      return result;
    }),
  deleteRequest: adminProcedure
    .input(deleteRequestSchema)
    .mutation(async ({ input }) => {
      const request = await deleteRequest(input);
      return request;
    }),
  setRequestStatus: adminProcedure
    .input(setRequestStatusSchema)
    .mutation(async ({ input }) => {
      console.info('setRequestStatus', JSON.stringify(input), Date.now());
      const request = await setRequestStatus(input);

      return request;
    }),
  repostRequest: adminProcedure
    .input(repostRequestSchema)
    .mutation(async ({ input }) => {
      const request = await repostRequest(input);
      return request;
    }),

  requestsWithPendingApplications: adminProcedure.query(
    ({ ctx: { prisma } }) => {
      return prisma.playgroundRequest.findMany({
        where: {
          status: RequestStatus.Accepted,
          applications: {
            some: {
              status: ApplicationStatus.Pending,
            },
          },
        },
        include: {
          applications: {
            where: {
              status: ApplicationStatus.Pending,
            },
            include: {
              applicant: {
                select: {
                  email: true,
                },
              },
            },
          },
          requester: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          budget: {
            select: {
              quantity: true,
              type: true,
            },
          },
          _count: {
            select: {
              applications: {
                where: {
                  status: ApplicationStatus.Accepted,
                },
              },
            },
          },
        },
      });
    },
  ),
});

export default adminRouter;

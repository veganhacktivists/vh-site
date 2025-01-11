import { RequestStatus, ApplicationStatus } from '@prisma/client';

import { getDiscordServer } from 'lib/discord';
import { baseProcedure, createTRPCRouter } from 'server/api/trpc';

import type { TimePerWeek } from '@prisma/client';

const averageWeeklyHoursPerValue: Record<TimePerWeek, number> = {
  OneToThree: 2,
  ThreeToFive: 4,
  FiveToEight: 6.5,
  TenPlus: 12,
};

const statsRouter = createTRPCRouter({
  getPlaygroundStats: baseProcedure.query(async ({ ctx: { prisma } }) => {
    const [requestsOpen, requestsSupported, numberOfVolunteers] =
      await Promise.all([
        prisma.playgroundRequest.count({
          where: {
            status: RequestStatus.Accepted,
          },
        }),
        prisma.playgroundRequest.count({
          where: {
            status: RequestStatus.Completed,
          },
        }),
        getDiscordServer(process.env.DISCORD_PLAYGROUND_SERVER_ID!).then(
          (server) => server.approximateMemberCount,
        ),
      ]);

    const acceptedApplications = await prisma.playgroundApplication.findMany({
      where: {
        status: ApplicationStatus.Accepted,
      },
      select: {
        availableTimePerWeek: true,
        estimatedTimeDays: true,
        request: {
          select: {
            estimatedTimeDays: true,
          },
        },
      },
    });

    const hoursVolunteered = acceptedApplications.reduce(
      (acc, { availableTimePerWeek, estimatedTimeDays, request }) => {
        const hours = averageWeeklyHoursPerValue[availableTimePerWeek];
        return (
          acc +
          (hours / 7) * (request.estimatedTimeDays ?? estimatedTimeDays ?? 0)
        );
      },
      0,
    );

    return {
      requestsOpen,
      requestsSupported,
      numberOfVolunteers,
      hoursVolunteered: Math.round(hoursVolunteered),
    };
  }),
});

export default statsRouter;

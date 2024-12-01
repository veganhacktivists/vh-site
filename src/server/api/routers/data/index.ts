import { getDataDashboardProject } from 'lib/services/data';
import { getDataDashboardProjectByLabelSchema } from 'lib/services/data/schemas';
import { baseProcedure, createTRPCRouter } from 'server/api/trpc';

const dataRouter = createTRPCRouter({
  getDataDashboardProject: baseProcedure
    .input(getDataDashboardProjectByLabelSchema)
    .query(async ({ input }) => {
      return await getDataDashboardProject(input);
    }),
});

export default dataRouter;

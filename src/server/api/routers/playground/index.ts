import adminRouter from './admin';
import requestsRouter from './requests';
import applicationsRouter from './applications';
import statsRouter from './stats';

import { createTRPCRouter, mergeTRPCRouters } from 'server/api/trpc';

const playgroundRouter = mergeTRPCRouters(
  createTRPCRouter({ admin: adminRouter }),
  requestsRouter,
  applicationsRouter,
  statsRouter,
);

export default playgroundRouter;

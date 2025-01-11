import discordRouter from './routers/discord';
import playgroundRouter from './routers/playground';
import dataRouter from './routers/data';
import blogRouter from './routers/blog';
import translationRouter from './routers/translation';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  playground: playgroundRouter,
  data: dataRouter,
  discord: discordRouter,
  blog: blogRouter,
  translation: translationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

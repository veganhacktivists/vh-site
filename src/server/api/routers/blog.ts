import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { baseProcedure, createTRPCRouter } from '../trpc';

import { getContents } from 'lib/cms';

import type { IBlogEntry } from 'types/generated/contentful';

const getBlogSchema = z.object({
  slug: z.string(),
});

const getBlogsBySlugsSchema = z.array(z.string());

const getBlogEntry: (slug: string) => Promise<IBlogEntry> = async (slug) => {
  return (
    await getContents({
      contentType: 'blogEntry',
      query: { slug },
      other: { include: 3 },
    })
  )[0] as IBlogEntry;
};
const blogRouter = createTRPCRouter({
  getBlog: baseProcedure
    .input(getBlogSchema)
    .query(async ({ input: { slug } }) => {
      try {
        return await getBlogEntry(slug);
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }
    }),
  getBlogsBySlugs: baseProcedure
    .input(getBlogsBySlugsSchema)
    .query(async ({ input }) => {
      const blogEntries: IBlogEntry[] = [];
      for (let i = 0; i < input.length; i++) {
        try {
          blogEntries.push(await getBlogEntry(input[i]));
        } catch {}
      }
      return blogEntries;
    }),
});

export default blogRouter;

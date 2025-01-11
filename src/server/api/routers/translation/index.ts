import { getLocalizedHTML } from 'lib/services/translation';
import { getLocalizedHTMLSchema } from 'lib/services/translation/schemas';
import { baseProcedure, createTRPCRouter } from 'server/api/trpc';

const translationRouter = createTRPCRouter({
  getLocalizedHTML: baseProcedure
    .input(getLocalizedHTMLSchema)
    .query(async ({ input }) => {
      return await getLocalizedHTML(input);
    }),
});

export default translationRouter;

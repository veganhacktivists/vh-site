'use server';

import Snoowrap from 'snoowrap';

import { CATEGORY_LABELS } from '../../../prisma/constants';

import { getListFromEnv } from 'lib/helpers/env';

import type { RequestWithBudget } from 'lib/services/playground/admin';
import type { Submission } from 'snoowrap';

declare module 'snoowrap' {
  // @ts-expect-error errors because of incorrect implementation of the Promise interface
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface RedditContent<T> {
    then: undefined;
    catch: undefined;
    finally: undefined;
  }
}

const r = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  password: process.env.REDDIT_PASSWORD,
  username: process.env.REDDIT_USERNAME,
});

r.config({ proxies: false, continueAfterRatelimitError: true });

const subredditsToPost = getListFromEnv('PLAYGROUND_SUBREDDITS');

export const postPlaygroundRequestOnReddit = async (
  request: RequestWithBudget,
) => {
  if (process.env.NODE_ENV !== 'production') {
    return [];
  }
  const compensation = request.budget
    ? 'This is a possible paid role!'
    : 'This is a volunteer role, please help the animals!';

  const message = `**${
    request.organization || request.name
  }** needs help! If you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism!

  ## **[${request.title}](https://veganhacktivists.org/playground/request/${
    request.id
  })**

  **Website:** [${request.website}](${request.website})

  **Compensation:** ${compensation}

  **Description:** ${request.description}

  **Interested in this request?** Please click the link below to apply to help on Playground!

  **Click here:** [Link to request](https://veganhacktivists.org/playground/request/${
    request.id
  })

  Thanks for your activism for the animals!

  **VH: Playground** by [Vegan Hacktivists](https://veganhacktivists.org/)

  *Find other requests to help animals, [click here!](https://veganhacktivists.org/playground)*`;

  const submissions: Submission[] = [];

  try {
    for await (const subreddit of subredditsToPost) {
      const submission = await r.submitSelfpost({
        subredditName: subreddit,
        title:
          `(${
            request.category === 'Other'
              ? 'Volunteer'
              : CATEGORY_LABELS[request.category]
          } needed!) ` + request.title,
        text: message,
      });

      submissions.push(submission);
    }
  } catch (err) {
    for await (const submission of submissions) {
      await submission.delete();
    }
    throw err;
  }
  return submissions;
};

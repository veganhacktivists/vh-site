import React from 'react';

import SquareField from '../../../decoration/squares';
import { SectionHeader } from '../../../decoration/textBlocks';
import { HighlightedProjects } from '../highlightedProjects';
import SectionContainer from '../sectionContainer';

import { formatNumber } from 'lib/helpers/format';
import getServerIntl from 'app/intl';

import type { IntlShape } from 'react-intl';
import type { IProjectFields } from 'types/generated/contentful';

export const getProjectDescriptions: (
  intl: IntlShape,
) => Record<string, React.ReactNode> = (intl) => ({
  'Activist Hub': (
    <>
      <p>
        {intl.formatMessage(
          {
            id: 'page.year-in-review.2021.section.featured-projects.activist-hub.paragraph.0',
            defaultMessage:
              'We surveyed over <no-localization>{noOfActivists}</no-localization> animal rights activists to understand what tools would best support their advocacy. The number one request was a method of monitoring our effectiveness in order to make informed decisions about our strategy and future efforts. So, we created <no-localization>Activist Hub</no-localization>!',
          },
          { noOfActivists: formatNumber(1100) },
        )}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.activist-hub.paragraph.1',
          defaultMessage:
            '<no-localization>Activist Hub</no-localization> is an online tool that allows activists to see how many people they have inspired to watch documentaries, to take a vegan challenge, and have gone vegan!',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.activist-hub.paragraph.2',
          defaultMessage:
            '<no-localization>Activist Hub</no-localization> also acts as the world’s first animal rights social network! Add friends, join groups, share or create posts, strategize and talk with other activists. Our hub is 100% free to use for any individual or organization advocating on behalf of animals.',
        })}
      </p>
    </>
  ),
  'Vegan Linguists': (
    <>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.vegan-linguists.paragraph.0',
          defaultMessage:
            'Every day, more and more people from around the world are being digitally connected.',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.vegan-linguists.paragraph.1',
          defaultMessage:
            'It has become increasingly important to translate online vegan content to reach more people. <no-localization>Vegan Linguists</no-localization> is a free content translation service run by vegans, for vegans. We translate vegan-content to help make veganism more accessible worldwide! All you need to do is sign up and submit your content—or volunteer as a translator, for the animals.',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.vegan-linguists.paragraph.2',
          defaultMessage:
            'We are proud to have worked and launched with <no-localization>Animal Ethics</no-localization>, <no-localization>Faunalytics</no-localization>, <no-localization>Peace Advocacy Network</no-localization>, <no-localization>Sinergia Animal</no-localization>, among many others.',
        })}
      </p>
    </>
  ),
  '3 Movies': (
    <>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.3-movies.paragraph.0',
          defaultMessage:
            'Watch three thought-provoking movies that shed light on uncomfortable realities, and explore other resources for support!',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.3-movies.paragraph.1',
          defaultMessage:
            'This project allows you to create your own landing page with vegan documentaries, videos, resources, challenges, and more, to share with friends, family, or online - and then track all of the clicks and watch time you get.',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.3-movies.paragraph.2',
          defaultMessage:
            "Your <no-localization>3 Movies</no-localization> link is the only link you'll ever need to share during your outreach!",
        })}
      </p>
    </>
  ),
  'Watch Dominion': (
    <>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.watch-dominion.paragraph.0',
          defaultMessage:
            '<no-localization>Watch Dominion</no-localization> provides easy multi-language access to the most promoted documentary in the vegan movement, <no-localization>Dominion</no-localization>.',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.watch-dominion.paragraph.1',
          defaultMessage:
            '<no-localization>Watch Dominion</no-localization> also allows other organizations to embed Dominion (without age restrictions or worries of it being taken down) on their own website while collecting watch-time statistics.',
        })}
      </p>
      <p>
        {intl.formatMessage({
          id: 'page.year-in-review.2021.section.featured-projects.watch-dominion.paragraph.2',
          defaultMessage:
            '<no-localization>Anonymous for the Voiceless</no-localization>, <no-localization>DontWatch.org</no-localization>, <no-localization>Viena Animal Save</no-localization>, and many others use this project now for uninterrupted access.',
        })}
      </p>
    </>
  ),
});

export interface FeaturedProjectsProps {
  projects: IProjectFields[];
  locale: string;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  locale,
}) => {
  const intl = getServerIntl(locale);

  const projectDescriptions = getProjectDescriptions(intl);

  return (
    <>
      <SectionContainer
        header={
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.year-in-review.2021.section.featured-projects.headline',
              defaultMessage: 'Featured <b>projects</b>',
            })}
          />
        }
        color='grey-background'
      >
        <HighlightedProjects
          projects={projects.map((project) => ({
            ...project,
            customDescription: projectDescriptions[project.name],
          }))}
        />
      </SectionContainer>
      <SquareField
        className='hidden md:block'
        squares={[
          { color: 'grey-light', left: 0, bottom: 0 },
          { color: 'grey', right: 0, top: 0 },
        ]}
      />
    </>
  );
};

export default FeaturedProjects;

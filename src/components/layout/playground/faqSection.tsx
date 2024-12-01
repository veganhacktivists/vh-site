import classNames from 'classnames';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SquareField from '../../decoration/squares';
import Accordion from '../accordion';

import CustomLink from 'components/decoration/link';
import { JOIN_PLAYGROUND_URL } from 'lib/discord/constants';

import type { IntlShape } from 'react-intl';

const getFaqEntries = (intl: IntlShape) =>
  [
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.0.question',
        defaultMessage: 'What is VH: Playground exactly?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.0.answer'
          defaultMessage='<p>Playground is a community of passionate vegan volunteers looking to support animal advocates and organizations by volunteering their time and skills. Their diverse skill sets include software development, design, content creation, marketing, and much more. Anyone can join this community and apply to help you with your request.</p> <p>Playground is separate from the Vegan Hacktivists team, and aims to increase the capacity in which we can support your work for the animals.</p>'
          values={{ p: (chunk) => <p>{chunk}</p> }}
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.1.question',
        defaultMessage:
          'How does it work if I want to submit a request for a project?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.1.answer'
          defaultMessage="<p> If you're an organization or advocate dedicated to improving or saving the lives of animals, we want to support your work. </p> <p> If you have a specific project or operational need in mind, click on &ldquo;Submit a request&rdquo; and fill out the form to let us know exactly what you need help with. We'll review your request to make sure it fits our community standards, and then approve or decline it. If approved, you will get an email confirming when your request is live and public. Then all you have to do is wait for volunteers to apply! We'll review all applications, vet them, and then approve the most suitable one. You'll automatically be connected with the volunteer over email with a Calendy link. </p>"
          values={{ p: (chunk) => <p>{chunk}</p> }}
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.2.question',
        defaultMessage: 'How does it work if I want to volunteer my time here?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.2.answer'
          defaultMessage="<p> All vegans who can code, design, edit, translate, research, analyze data, or contribute other skills are welcome! Simply browse the list of requests <link>here</link> and apply to the ones most relevant to your skill set. Make sure you can commit a reasonable amount of time and have the ability or qualifications to do the work properly. If you're matched with a project, remember to communicate your progress and be mindful of the project's deadline. </p> <p> Fill out your information below the request and we'll review your application. You'll get an email to tell you whether your help has been approved or declined. If approved, we'll automatically connect you to the requestor with a Calendly link so that you can get started! </p>"
          values={{
            p: (chunk) => <p>{chunk}</p>,
            link: (chunk) => (
              <CustomLink href={`/${intl.locale}/playground`}>
                {chunk}
              </CustomLink>
            ),
          }}
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.3.question',
        defaultMessage: 'Are people applying to my request qualified?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.3.answer'
          defaultMessage="<p> Anyone can join this community and apply to volunteer. However, we carefully review every application. While we can't guarantee the quality of work, we do our best to make sure the applicant has the required skills and background for your project. Our review process includes checking their LinkedIn, portfolio, resume, past work, and social media profiles. Depending on the request, we may also interview the applicant by phone or email.</p>"
          values={{ p: (chunk) => <p>{chunk}</p> }}
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.4.question',
        defaultMessage: 'Is it possible to get support from the VH team?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.4.answer'
          defaultMessage="<p> Playground is designed to increase our capacity by leveraging our vast network of skilled volunteers who are enthusiastic to contribute to the movement. Currently, VH's core team of developers, designers, and specialists are dedicated to various priority projects. Given that we review each request on Playground, we will reach out if we believe that your needs can be met by our core team. Please take a look at our <link>service offerings</link> to learn more about VH's areas of specialty.</p>"
          values={{
            p: (chunk) => <p>{chunk}</p>,
            link: (chunk) => (
              <CustomLink href={`/${intl.locale}/services`}>{chunk}</CustomLink>
            ),
          }}
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.5.question',
        defaultMessage:
          'How long does it take for my request/application to get accepted?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.5.answer'
          defaultMessage="<p> If you're submitting a request for support, it will usually be reviewed and live within 24 hours. To find a suitable volunteer for your project, it can take anywhere from one to seven days. We thank you for your patience as we're still new and growing! </p> <p> If you're applying to help someone with a request, you should get an email within 24 to 48 hours confirming your application status.</p>"
          values={{ p: (chunk) => <p>{chunk}</p> }}
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'page.playground.section.faq.6.question',
        defaultMessage:
          'As a volunteer, can I stay updated on new requests that come in?',
      }),
      children: (
        <FormattedMessage
          id='page.playground.section.faq.6.answer'
          defaultMessage='<p>Absolutely! Join our <link> Playground Discord server </link> to view the latest requests. Turn on notifications to get alerts whenever a new request comes in. You can also chat with other volunteers, discuss your experiences, and get support from the Playground community. We look forward to seeing you soon! </p>'
          values={{
            p: (chunk) => <p>{chunk}</p>,
            link: (chunk) => (
              <CustomLink href={JOIN_PLAYGROUND_URL}>{chunk}</CustomLink>
            ),
          }}
        />
      ),
    },
  ].map((entry) => ({
    ...entry,
    children: <div className='flex flex-col gap-5'>{entry.children}</div>,
  }));

interface FaqSectionProps {
  design?: 'dark' | 'light';
}

const FaqSection: React.FC<FaqSectionProps> = ({ design }) => {
  const intl = useIntl();

  return (
    <div>
      <SquareField
        className='hidden md:block'
        squares={[
          {
            color: `${
              design === 'dark'
                ? 'grey'
                : design === 'light'
                  ? 'grey-light'
                  : 'white'
            }`,
            size: 16,
            right: 0,
            top: 0,
          },
          {
            bottom: 0,
            left: 0,
            color: 'grey',
          },
        ]}
      />
      <div
        className={classNames(
          design === 'dark'
            ? 'bg-[#3D3D3D]'
            : design === 'light'
              ? 'bg-white'
              : 'bg-grey-background',
          'py-10',
        )}
      >
        <span
          id='faq'
          className={classNames(
            design === 'dark' ? 'text-white' : 'text-black',
            'text-3xl font-bold font-mono',
          )}
        >
          <FormattedMessage
            id='page.playground.section.faq.headline'
            defaultMessage='Frequently Asked Questions'
          />
        </span>
        <div className='mb-4 mt-9'>
          <Accordion entries={getFaqEntries(intl)} design={design} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

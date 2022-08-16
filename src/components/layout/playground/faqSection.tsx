import classNames from 'classnames';
import React from 'react';

import SquareField from '../../decoration/squares';

import Accordion from './accordion';

interface FaqSectionProps {
  design?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ design }) => {
  const faqEntries = [
    {
      headline: 'What is VH: Playground exactly?',
      content:
        'Playground is a community of passionate vegan volunteers looking to support animal advocates and organizations by volunteering their skills, whether that be code, design, marketing, or something else! Anyone can join this community and apply to help you with your request. Playground is separate from the core team of Vegan Hacktivists with the aim to increase the capacity in which we can help you and others.',
      expanded: true,
    },
    {
      headline: 'How does it work if I want to submit a request for help?',
      content:
        "If you're an organization or animal advocate seeking support for your project, just click on “Submit a request” and let our community know exactly what you need help with. Once you submit your request, we'll review it to make sure it fits our community standards, and then either approve or decline the request. You'll get an email letting you know when your request is live and public, and then all you have to do is wait for our community of volunteers to apply to help! We'll review all applications that have applied to help you, vet them the best that we can, and then approve the best one. You'll automatically be connected with the volunteer over email with a Calendy link!",
    },
    {
      headline: 'How does it work if I want to volunteer my time here?',
      content:
        "All vegans that can code, design, or have another valuable skill to contribute, are welcome here! Simply browse the list of requests here on Playground and choose and apply to the one that is most relevant to your skill-set. Make sure you're able to commit a reasonable amount of time to help with the request, and make sure that you have the skills to do it properly. Below the request you'll be able to fill out information we'll need from you, and once submitted, we'll review your application and make a decision. You'll get an email whether you've been approved or declined to help, if approved, we'll automatically connect you to the requestor with a Calends link so that you can get started!",
    },
    {
      headline: 'Are people applying to my request qualified?',
      content:
        "Anyone can join this community and apply to help you with your request, however, Vegan Hacktivists does the work in reviewing those applications for you. While we can't guarantee the quality of work, we'll do our best to make sure that the applicant has the skills and time available to help you. Our review process includes reviewing their LinkedIn, Portfolio, Resume, past work, and social media profiles. Depending on the request, we may also personally interview the applicant over the phone or via email before accepting their application to help with your request.",
    },
    {
      headline:
        "I'd rather get support from the core VH team, is that possible?",
      content:
        'Unfortunately, our core team of developers, designers and specialists are almost always over capacity in the work that we do on personal projects and for other advocates and organizations. Playground was designed with the aim to increase the capacity in which we can help you and others by leveraging our massive network of vegan communities to find volunteers for you. Playground will almost always be able to meet your needs as much as the core VH team could, so give it a try!',
    },
    {
      headline:
        'How long does it take for my request/application to get accepted?',
      content:
        "If you're submitting a request for support, we usually are able to review and get it live within 24 hours. If you're submitting to help someone with a request, it takes about 24 to 48 hours for us to review your application before we accept or decline your request. It can take anywhere from 1 to 7 days for us to find a suitable person to help you with your request, please be patient as we're new and still growing!",
    },
    {
      headline:
        'As a volunteer, can I stay updated on new requests that come in?',
      content:
        "Absolutely! Join our Playground Discord server, all new requests get posted automatically there. You'll get notifications and you'll also be able to chat and discuss your volunteer work and experiences, as-well as get support with the Playground community there. We're looking forward to seeing you soon!",
    },
  ];
  return (
    <div>
      <SquareField
        className="hidden md:block"
        squares={[
          {
            color: `${
              design === 'dark'
                ? '#E2E2E2'
                : design === 'light'
                ? '#3D3D3D3D'
                : 'white'
            }`,
            size: 16,
            right: 0,
            top: 0,
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
          'py-10'
        )}
      >
        <span
          className={classNames(
            design === 'dark' ? 'text-white' : 'text-black',
            'text-3xl font-bold font-mono'
          )}
        >
          Frequently Asked Questions
        </span>
        <div className="mb-4 mt-9">
          <Accordion entries={faqEntries} design={design} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
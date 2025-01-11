import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import {
  SubSection,
  SectionHeader,
} from '../../../components/decoration/textBlocks';
import SquareField from '../../../components/decoration/squares';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';

import type PageWithLayout from '../../../types/persistentLayout';

const TermsAndConditions: PageWithLayout = () => {
  const intl = useIntl();
  return (
    <>
      <NextSeo title='Terms And Conditions' />
      <SectionHeader header={'<b>Terms</b> And <b>Conditions</b>'}>
        By participating in Playground, you agree to abide by the following
        guidelines.
      </SectionHeader>
      <SquareField
        squares={[
          { size: 16, top: -16, color: 'grey-background' },
          { size: 16, top: -16, right: 0, color: 'grey-background' },
          { size: 16, top: 0, right: 0, color: 'white' },
        ]}
        className='hidden md:block'
      />
      <div className='pb-10'>
        <div>
          <SubSection header='In this document:'>
            <ul className='text-xl list-disc text-left lg:ml-7'>
              <li>
                <b>Volunteer</b> refers to any individual working or seeking to
                work on a task or project, whether compensated or working on a
                volunteer basis.
              </li>
              <li>
                <b>Requestor</b> refers to an individual, employee, volunteer,
                or representative of the group you represent seeking support for
                a project.
              </li>
              <li>
                <b>Website</b> refers to{' '}
                <span className='text-green'>
                  <Link href={`/${intl.locale}/playground`}>
                    veganhacktivists.org/playground
                  </Link>
                </span>
              </li>
            </ul>
          </SubSection>
          <SubSection header='When using our website, you agree that:'>
            <ol className='text-xl list-decimal text-left lg:ml-7'>
              <li>
                Any information submitted on the website is true and accurate.
              </li>
              <li>
                You are solely responsible for, and assume all liability
                regarding (a) the information and content you contribute and (b)
                your interactions with other users through the website.
              </li>
              <li>
                You assume all risks when using our website, including but not
                limited to risks associated with any online and offline
                interactions with others. Any reports of harassment will be
                investigated and potentially result in removing access to the
                Playground community.
              </li>
            </ol>
          </SubSection>
          <SubSection header='Compensated Work:'>
            <ol className='text-xl list-decimal text-left lg:ml-7'>
              <li>
                Some organizations may provide paid work, in which case this
                will be made explicit in the request itself, but this should not
                be expected as the primary purpose of the website is for
                volunteer opportunities.
              </li>
              <li>
                VH does not mediate payment and invoicing between the volunteer
                and the organization. Payment arrangements should be made
                between the volunteer and the organization.
              </li>
            </ol>
          </SubSection>
          <SubSection header='Volunteer Expectations:'>
            <ol className='text-xl list-decimal text-left lg:ml-7'>
              <li>
                Understand that the work is voluntary and there will be no
                compensation.
              </li>
              <li>
                Deliverables that infringe on intellectual property of third
                parties or contain plagiarism shall not be provided.
              </li>
              <li>
                Deliverables must be such that they cannot be interpreted as
                defamatory, inaccurate, abusive, obscene, profane, offensive,
                tortuous, or otherwise objectionable.
              </li>
              <li>
                Deliverables will not be used in a manner that promotes racism,
                bigotry, hatred, or harm of any kind against any group or
                individual.
              </li>
              <li>
                Only sign up for deliverables you feel comfortable being able to
                produce. Do not take on a deliverable that may be above your
                current skills.
              </li>
              <li>
                Teamwork may be required with other volunteers and/or employees.
                In this case, maintain a respectful, friendly, and professional
                attitude with your team members.
              </li>
              <li>
                Provide deliverables in a timely manner. Reach out to your
                requestor and/or your main point of contact immediately if you
                will not be able to work on a deliverable.
              </li>
            </ol>
          </SubSection>
          <SubSection header='Requestor Expectations:'>
            <ol className='text-xl list-decimal text-left lg:ml-7'>
              <li>
                Please be patient. We will do our best to match a volunteer with
                your work request in a timely manner.
              </li>
              <li>
                While we do our best to identify and match you with a suitable
                volunteer, we cannot guarantee the quality of the work of the
                volunteers.
              </li>
              <li>
                Give due credit on the work produced by volunteers, according to
                the{' '}
                <span className='text-green'>
                  <Link
                    href={
                      'https://wiki.creativecommons.org/wiki/best_practices_for_attribution'
                    }
                  >
                    Creative Commons Best Practices for Attribution.
                  </Link>
                </span>
              </li>
              <li>
                Be mindful of the volunteer’s time and be reasonable with
                expectations of deliverables, workload, and schedule. If the
                scope of the task or project changes or increases, please
                solicit the volunteer’s input and if they are unable to meet
                those changes, proceed to create a new request on the website.
              </li>
              <li>
                If payment for the work is offered, pay the volunteer in a
                timely manner and according to the agreed schedule.
              </li>
            </ol>
          </SubSection>
        </div>
      </div>
    </>
  );
};

TermsAndConditions.Layout = PlaygroundLandingLayout;

export default TermsAndConditions;

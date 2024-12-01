import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import SquareField from '../../../components/decoration/squares';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';
import SubmitRequestForm from 'components/layout/playground/submitRequestForm';
import { SectionHeader } from 'components/decoration/textBlocks';

import type PageWithLayout from 'types/persistentLayout';

const Header: React.FC = () => {
  const intl = useIntl();

  return (
    <div>
      <SectionHeader
        className='-mb-10'
        header={intl.formatMessage({
          id: 'page.playground.section.submit-request.form.headline',
          defaultMessage: '<b>Need support? Let us know!</b>',
        })}
      >
        <FormattedMessage
          id='page.playground.section.submit-request.form.subline'
          defaultMessage='Please fill in the form below.'
        />
      </SectionHeader>
    </div>
  );
};

const SubmitRequestPage: PageWithLayout = ({}) => {
  const intl = useIntl();
  const router = useRouter();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({
          id: 'page.playground.section.submit-request.next-seo.title',
          defaultMessage: 'Submit Your Request',
        })}
      />
      <Header />
      <SquareField
        squares={[
          { size: 16, top: -16, color: 'grey-background' },
          { size: 16, top: -16, right: 0, color: 'grey-background' },
          { size: 16, top: 0, right: 0, color: 'white' },
        ]}
        className='hidden md:block'
      />
      <SubmitRequestForm
        requestId={`${
          typeof router?.query?.id === 'string' ? router.query.id : ''
        }`}
      />
    </>
  );
};

SubmitRequestPage.Layout = PlaygroundLandingLayout;

export default SubmitRequestPage;

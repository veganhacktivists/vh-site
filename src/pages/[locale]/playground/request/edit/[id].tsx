import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { toast } from 'react-toastify';

import SquareField from '../../../../../components/decoration/squares';
import useOnce from '../../../../../hooks/useOnce';

import { PlaygroundLandingLayout } from 'components/layout/playground/layout';
import SubmitRequestForm from 'components/layout/playground/submitRequestForm';
import { SectionHeader } from 'components/decoration/textBlocks';

import type PageWithLayout from 'types/persistentLayout';

const Header: React.FC = () => {
  return (
    <div>
      <SectionHeader className='-mb-10' header='<b>Edit request</b>'>
        Update your request information in the form below.
      </SectionHeader>
    </div>
  );
};

const idSchema = z.string().cuid({ message: 'The request ID is invalid' });

const EditRequestPage: PageWithLayout = ({}) => {
  const router = useRouter();
  useOnce(
    async () => {
      const data = idSchema.safeParse(router.query.id);
      if (data.success) {
        return;
      }

      await router.push('/playground');
      toast.error(data.error.issues.map((issue) => issue.message).join('\n'));
    },
    { enabled: router.isReady },
  );
  return (
    <>
      <NextSeo title='Submit Your Request' />
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

EditRequestPage.Layout = PlaygroundLandingLayout;

export default EditRequestPage;

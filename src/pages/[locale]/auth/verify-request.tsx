import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { DarkButton } from '../../../components/decoration/buttons';

import type { NextPage } from 'next';

const VerifyRequest: NextPage = () => {
  const { back } = useRouter();
  return (
    <div className='flex flex-col items-center m-10'>
      <h1 className='text-3xl font-bold'>
        <FormattedMessage
          id='page.verify-request.heading'
          defaultMessage='Check your email'
        />
      </h1>
      <div className='mt-4 text-xl max-w-xl break-words'>
        <FormattedMessage
          id='page.verify-request.content'
          defaultMessage='Please follow the instructions we have sent you. If you are not seeing the email in your inbox, please check your spam folder.'
        />
      </div>
      <div>
        <DarkButton
          className='mt-4 mx-auto w-fit'
          onClick={() => {
            back();
          }}
        >
          <FormattedMessage
            id='page.verify-request.button.go-back'
            defaultMessage='Go back'
          />
        </DarkButton>
      </div>
    </div>
  );
};

export default VerifyRequest;

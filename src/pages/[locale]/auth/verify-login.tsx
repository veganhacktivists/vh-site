import { FormattedMessage, useIntl } from 'react-intl';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { DarkButton } from '../../../components/decoration/buttons';
import { FirstSubSection } from '../../../components/decoration/textBlocks';
import SquareField from '../../../components/decoration/squares';
import useOnce from '../../../hooks/useOnce';

const VerifyLogin: React.FC = () => {
  const intl = useIntl();
  const router = useRouter();

  useOnce(
    async () => {
      try {
        z.object({
          callbackUrl: z.string().url(),
          token: z.string(),
          email: z.string().email(),
        }).parse(router.query);
      } catch {
        await router.push('/auth/signin');

        toast.error(
          intl.formatMessage({
            id: 'page.verify-login.error.invalid-request',
            defaultMessage: 'Invalid request',
          }),
        );
      }
    },
    { enabled: router.isReady },
  );

  const verifyEndpointUrl = useMemo(() => {
    const host =
      process.env.NODE_ENV === 'production'
        ? 'veganhacktivists.org'
        : 'localhost:3000';
    const protocol =
      process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
    const verifyEndpointUrl = new URL(
      `${protocol}${host}/api/auth/callback/email`,
    );

    Object.entries(router.query).map(([key, value]) => {
      verifyEndpointUrl.searchParams.append(key, value as string);
    });

    return verifyEndpointUrl.href;
  }, [router.query]);

  return (
    <>
      <SquareField
        squares={[
          { size: 16, top: 0, color: 'grey-light' },
          { size: 16, top: 16, left: 16, color: 'grey-light' },
          { size: 24, top: 0, right: 0, color: 'grey' },
        ]}
        className='hidden md:block'
      />

      <form method='post' action={verifyEndpointUrl}>
        <div className='flex flex-col items-center'>
          <FirstSubSection
            header={intl.formatMessage({
              id: 'page.verify-login.headline',
              defaultMessage: 'Login verification',
            })}
          >
            <FormattedMessage
              id='page.verify-login.intro'
              defaultMessage='Click the button below to verify your login'
            />
          </FirstSubSection>

          <DarkButton type='submit'>
            <FormattedMessage
              id='page.verify-login.button.verify'
              defaultMessage='Verify'
            />
          </DarkButton>
        </div>
      </form>
    </>
  );
};

export default VerifyLogin;

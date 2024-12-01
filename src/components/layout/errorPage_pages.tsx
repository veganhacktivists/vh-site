import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { StatusCodes } from 'http-status-codes';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { DarkButton } from '../decoration/buttons';
import useErrorStore from '../../lib/stores/errorStore';
import {
  avocado,
  mango,
  peach,
  sweetPotato,
  watermelon,
} from '../../images/teams';

import CustomImage from 'components/decoration/customImage';

import type { FallbackProps } from 'react-error-boundary';
import type { NextPage } from 'next';

import errorTypeImage from '~images/VH-error-type.png';

export interface ErrorProps extends Omit<FallbackProps, 'error'> {
  error?: FallbackProps['error'] & {
    statusCode?: number;
  };
}

const Error: NextPage<ErrorProps> = ({ error, resetErrorBoundary }) => {
  const router = useRouter();
  const locale = useIntl().locale;

  useEffect(() => {
    return () => {
      resetErrorBoundary?.();
    };
  }, [resetErrorBoundary]);

  const { setErrorData, generateErrorMessage } = useErrorStore();

  const handleContactClick = () => {
    resetErrorBoundary?.();
    setErrorData({ pageThatErrored: router.asPath, error });
  };

  const contactPageError: string | boolean = router.asPath === '/contact';

  const message =
    error?.statusCode === StatusCodes.NOT_FOUND ? 'Page not found.' : 'Whoops!';

  return (
    <>
      <NextSeo noindex title={message} />
      <article className='min-h-[40rem] flex flex-col justify-center items-center p-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col justify-start gap-12 md:flex-row'>
            <div className='w-80'>
              <CustomImage src={errorTypeImage} alt='ERROR' priority />
            </div>
            <div className='flex flex-col items-start gap-3 text-2xl text-center justify-evenly md:gap-0 md:text-left'>
              <h1 className='w-full font-mono font-bold text-red'>{message}</h1>
              <div className='w-full font-mono'>
                {contactPageError
                  ? 'Please contact us at'
                  : 'If you believe this is a mistake'}
                &hellip;
              </div>
            </div>
          </div>
          <div className='flex flex-col-reverse justify-start gap-12 md:flex-row'>
            <div className='md:-mt-3'>
              {[avocado, mango, peach, sweetPotato, watermelon].map((fruit) => (
                <CustomImage
                  key={fruit.src}
                  src={fruit}
                  height='64'
                  width='64'
                  alt=''
                />
              ))}
            </div>
            <div className='flex justify-center w-full md:w-min'>
              {contactPageError ? (
                <span className='font-mono text-2xl font-bold md:text-left'>
                  <Link
                    href={{
                      pathname: 'mailto:hello@veganhacktivists.org',
                      query: {
                        subject: 'Website error!',
                        body: generateErrorMessage({
                          pageThatErrored: router.asPath,
                          error,
                        }),
                      },
                    }}
                    passHref
                    target='_blank'
                    rel='noreferrer'
                  >
                    hello@veganhacktivists.org
                  </Link>
                </span>
              ) : (
                <DarkButton
                  className='w-52'
                  href={`/${locale}/contact`}
                  onClick={handleContactClick}
                >
                  Let us know!
                </DarkButton>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Error;

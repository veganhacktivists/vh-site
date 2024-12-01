'use client';

import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { DarkButton } from '../decoration/buttons';
import {
  avocado,
  mango,
  peach,
  sweetPotato,
  watermelon,
} from '../../images/teams';

import CustomImage from 'components/decoration/customImage';
import { usePathnameWithoutLocale } from 'lib/translation/usePathnameWithoutLocale';

import type { NextPage } from 'next';

import errorTypeImage from '~images/VH-error-type.png';

export interface ErrorProps {
  error: Error & { statusCode?: number };
  reset?: () => void;
}

const Error: NextPage<ErrorProps> = ({ error, reset }) => {
  const intl = useIntl();
  const pathname = usePathnameWithoutLocale();
  const locale = intl.locale;

  useEffect(() => {
    return () => {
      reset?.();
    };
  }, [reset]);

  if (pathname === null) {
    return null;
  }

  const handleContactClick = () => {
    reset?.();
  };

  const generateErrorMessage = (context: {
    pageThatErrored?: string;
    error: Error & { statusCode?: number };
  }): string => {
    const { pageThatErrored, error } = context;
    const thenHappened = error?.statusCode
      ? `I found a ${error?.statusCode} error`
      : 'a client error happened';

    const defaultErrorMessage = pageThatErrored
      ? `[Please tell us what you were doing prior to the error occurring...]

...then ${thenHappened} at ${pageThatErrored}${
          error?.name ? `: ${error.name}. ${error.message}` : ''
        }.

Thanks!`
      : '';
    return defaultErrorMessage;
  };

  const contactPageError: string | boolean = pathname === '/contact';

  const message =
    error?.statusCode === StatusCodes.NOT_FOUND
      ? intl.formatMessage({
          id: 'page.not-found.next-seo.title',
          defaultMessage: 'Page not found',
        })
      : intl.formatMessage({
          id: 'page.error.next-seo.title',
          defaultMessage: 'Whoops!',
        });

  return (
    <>
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
                  ? intl.formatMessage({
                      id: 'page.not-found.contact.contact-page-error.cta-email',
                      defaultMessage: 'Please contact us at',
                    })
                  : intl.formatMessage({
                      id: 'page.not-found.contact.cta-label',
                      defaultMessage: 'If you believe this is a mistake',
                    })}
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
                          pageThatErrored: pathname,
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
                  href={`/${locale}/contact?message=${btoa(
                    generateErrorMessage({
                      pageThatErrored: pathname,
                      error,
                    }),
                  )}`}
                  onClick={handleContactClick}
                >
                  {intl.formatMessage({
                    id: 'page.not-found.contact.cta-button.label',
                    defaultMessage: 'Let us know!',
                  })}
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

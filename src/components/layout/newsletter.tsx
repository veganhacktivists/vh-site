'use client';

import classNames from 'classnames';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';

import { pixelEnvelope } from '../../images/separators';
import { DarkButton } from '../decoration/buttons';
import Spinner from '../decoration/spinner';
import TextInput from '../forms/inputs/textInput';
import { FirstSubSection } from '../decoration/textBlocks';

import CustomImage from 'components/decoration/customImage';

interface NewsletterRequestProps {
  email: string;
}

interface NewsletterProps {
  onChange?: (signedUp: boolean) => void;
  showCancelButton?: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({
  onChange,
  showCancelButton,
}) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewsletterRequestProps>();

  const onSubmit = useCallback(
    async (props: NewsletterRequestProps) => {
      const submit = async () => {
        try {
          await axios.post('/api/subscribe-to-newsletter', props);
          onChange?.(true);
        } catch (e) {
          onChange?.(false);
          throw e;
        }
      };

      await toast
        .promise(submit, {
          pending: 'Submitting...',
          error: intl.formatMessage({
            id: 'page.blog.section.newsletter.form.error',
            defaultMessage:
              'An error has occurred. Please check that your email is correct and try again',
          }),
          success: intl.formatMessage({
            id: 'page.blog.section.newsletter.form.success',
            defaultMessage: 'Welcome to the newsletter!',
          }),
        })
        .catch(() => {
          //ignore
        });
    },
    [intl, onChange],
  );

  return (
    <div className='w-full p-8 mx-auto bg-grey-background text-grey'>
      <div className='flex justify-center'>
        <CustomImage
          src={pixelEnvelope.src}
          height={pixelEnvelope.height}
          width={pixelEnvelope.width}
          alt={intl.formatMessage({
            id: 'page.blog.section.newsletter.image.alt-text',
            defaultMessage:
              'Pixel art of a green heart emerging from an open envelope surrounded by sparkles',
          })}
        />
      </div>
      <h1 className='mb-4 text-center'>
        <FirstSubSection
          header={intl.formatMessage({
            id: 'page.blog.section.newsletter.heading',
            defaultMessage: 'Our <b>newsletter</b>',
          })}
        />
      </h1>
      <div className='mx-auto mb-8 text-2xl text-center font-serif'>
        <FormattedMessage
          id='page.blog.section.newsletter.intro'
          defaultMessage='Sign up for our newsletter now and never miss an update!<no-localization>{br}</no-localization>Every month, you will receive...'
          values={{
            br: <br />,
          }}
        />
      </div>
      <div
        className={classNames('mx-auto text-xl font-serif italic mb-8 w-fit')}
      >
        <ul className='list-none'>
          {[
            intl.formatMessage({
              id: 'page.blog.section.newsletter.features.0',
              defaultMessage: 'Updates about our projects and events',
            }),
            intl.formatMessage({
              id: 'page.blog.section.newsletter.features.1',
              defaultMessage:
                'Exciting news and opportunities from the movement',
            }),
            intl.formatMessage({
              id: 'page.blog.section.newsletter.features.2',
              defaultMessage: 'Original content from our blog',
            }),
            intl.formatMessage({
              id: 'page.blog.section.newsletter.features.3',
              defaultMessage: 'And much more!',
            }),
          ].map((bulletText, i) => (
            <li
              className='flex flex-row items-baseline p-1 text-left before:bg-green before:shrink-0 before:basis-2 before:inline-block before:w-2 before:h-2 gap-x-2 w-fit'
              key={i}
            >
              {bulletText}
            </li>
          ))}
        </ul>
      </div>

      <form className='text-2xl' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center justify-center space-x-2 gap-y-8'>
          <div className='w-2/3 xl:w-1/2 font-serif'>
            <TextInput
              {...register('email', {
                required: intl.formatMessage({
                  id: 'page.blog.section.newsletter.form.email.prompt',
                  defaultMessage: 'Please enter a valid email',
                }),
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: intl.formatMessage({
                    id: 'page.blog.section.newsletter.form.email.prompt',
                    defaultMessage: 'Please enter a valid email',
                  }),
                },
              })}
              placeholder={intl.formatMessage({
                id: 'page.blog.section.newsletter.form.email.placeholder',
                defaultMessage: 'Enter your email',
              })}
              error={errors.email?.message}
            >
              Email
            </TextInput>
          </div>
          <div className='flex flex-col justify-center align-baseline md:flex-row gap-x-10 gap-y-2'>
            <DarkButton className='w-full mx-auto md:w-auto' type='submit'>
              {isSubmitting ? (
                <Spinner />
              ) : (
                <FormattedMessage
                  id='page.blog.section.newsletter.form.btn.sign-up'
                  defaultMessage='Sign up!'
                />
              )}
            </DarkButton>
            {showCancelButton && (
              <div className='m-auto'>
                <p
                  onClick={() => {
                    if (!isSubmitting) {
                      onChange?.(false);
                    }
                  }}
                  className={classNames('font-mono underline cursor-pointer', {
                    'cursor-pointer': !isSubmitting,
                    'cursor-not-allowed': isSubmitting,
                  })}
                >
                  <FormattedMessage
                    id='page.blog.section.newsletter.form.btn.cancel'
                    defaultMessage='No thanks'
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;

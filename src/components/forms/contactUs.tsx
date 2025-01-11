import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSearchParams } from 'next/navigation';

import { firstLetterUppercase } from '../../lib/helpers/strings';
import { DarkButton } from '../decoration/buttons';
import Spinner from '../decoration/spinner';

import TextArea from './inputs/textArea';
import TextInput from './inputs/textInput';
import Label from './inputs/label';
import SelectInput from './inputs/selectInput';

import { useFAQDetect } from 'hooks/useFAQDetect';

const SERVICES = [
  'Website',
  'Project',
  'Funding',
  'Advice',
  'Security Consultation',
] as const;

interface ContactUsSubmission {
  name: string;
  email: string;
  service: (typeof SERVICES)[number] | null;
  message: string;
}

const ContactUsForm: React.FC = () => {
  const { onMessageChange, suggestions } = useFAQDetect();

  const intl = useIntl();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactUsSubmission>({
    defaultValues: {
      service: null,
    },
  });
  const { reload } = useRouter();

  const searchParams = useSearchParams();
  const defaultErrorMessage = searchParams?.get('message') ?? '';

  const onSubmit = useCallback(
    async (values: ContactUsSubmission) => {
      const submit = async () => axios.post('/api/contact-us', values);

      await toast
        .promise(submit, {
          pending: intl.formatMessage({
            id: 'section.contact-us-form.submission.toast.pending',
            defaultMessage: 'Submitting...',
          }),
          error: intl.formatMessage({
            id: 'section.contact-us-form.submission.toast.error',
            defaultMessage:
              'Something went wrong processing your submission! Please try again later',
          }),
          success: intl.formatMessage({
            id: 'section.contact-us-form.submission.toast.success',
            defaultMessage: 'Your request was sent successfully!',
          }),
        })
        .then(() => {
          reset();
          setTimeout(() => {
            reload();
          }, 5000);
        });
    },
    [intl, reload, reset],
  );

  const inputLabels = useMemo(
    () => ({
      name: intl.formatMessage({
        id: 'section.contact-us-form.input-field.label.name',
        defaultMessage: 'Name',
      }),
      service: intl.formatMessage({
        id: 'section.contact-us-form.input-field.label.service',
        defaultMessage: 'Service',
      }),
      email: intl.formatMessage({
        id: 'section.contact-us-form.input-field.label.email',
        defaultMessage: 'Email',
      }),
      message: intl.formatMessage({
        id: 'section.contact-us-form.input-field.label.message',
        defaultMessage: 'Message',
      }),
    }),
    [intl],
  );

  return (
    <div className='pt-5 mx-auto md:w-2/3' id='contact-us'>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            placeholder={inputLabels.name}
            {...register('name', {
              required: intl.formatMessage({
                id: 'section.contact-us-form.input-field.empty-error.name',
                defaultMessage: 'Please enter a name',
              }),
            })}
            error={errors.name?.message}
          >
            {inputLabels.name}
          </TextInput>
        </div>
        <div>
          <TextInput
            placeholder='yourname@example.com'
            {...register('email', {
              required: intl.formatMessage({
                id: 'section.contact-us-form.input-field.empty-error.email',
                defaultMessage: 'The email is required',
              }),
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: intl.formatMessage({
                  id: 'section.contact-us-form.input-field.pattern-error.email',
                  defaultMessage: 'Please enter a valid email',
                }),
              },
            })}
            error={errors.email?.message}
          >
            {inputLabels.email}
          </TextInput>
        </div>
        <div>
          <Label htmlFor='service'>{inputLabels.service}</Label>
          <Controller
            name='service'
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'section.contact-us-form.input-field.empty-error.service',
                defaultMessage: 'Select a service',
              }),
            }}
            render={({ field: { value, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={
                  value
                    ? { value: value, label: firstLetterUppercase(value) }
                    : null
                }
                onChange={(option) => {
                  onChange(option ? option.value : null);
                }}
                ref={null}
                error={errors.service?.message}
                options={SERVICES.map((option) => ({
                  value: option,
                  label: firstLetterUppercase(option),
                }))}
              />
            )}
          />
        </div>
        <div>
          <TextArea
            error={errors.message?.message}
            {...register('message')}
            name='message'
            defaultValue={atob(defaultErrorMessage)}
            onChange={onMessageChange}
          >
            {inputLabels.message}
          </TextArea>
        </div>
        {suggestions.map((suggestion, i) => (
          <div
            className='text-left border-l-8 border-l-yellow bg-white p-4'
            key={i}
          >
            {suggestion}
          </div>
        ))}
        <div className='pt-5 pb-10'>
          <DarkButton
            type='submit'
            disabled={isSubmitting || isSubmitSuccessful}
            className='px-10 w-52'
          >
            {isSubmitting ? (
              <Spinner />
            ) : (
              <FormattedMessage
                id='section.contact-us-form.submit-button.label'
                defaultMessage='Submit'
              />
            )}
          </DarkButton>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;

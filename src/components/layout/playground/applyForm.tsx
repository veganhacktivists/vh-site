import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  ApplicationStatus,
  PlaygroundRequestCategory,
  RequestStatus,
  TimePerWeek,
  UserRole,
} from '@prisma/client';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../../../prisma/constants';

import SignInPrompt from './siginInPrompt';
import ConfirmationModal from './confirmationModal';

import { readableTimeDiff } from 'lib/helpers/date';
import { DarkButton, WhiteButton } from 'components/decoration/buttons';
import { applyToRequestSchemaClient } from 'lib/services/playground/schemas';
import useOnce from 'hooks/useOnce';
import TextInput from 'components/forms/inputs/textInput';
import RadioButton from 'components/forms/inputs/radioButton';
import Checkbox from 'components/forms/inputs/checkbox';
import SubtleBorder from 'components/decoration/subtleBorder';
import usePlaygroundApplyStore from 'lib/stores/playground/applyStore';
import Spinner from 'components/decoration/spinner';
import TextArea from 'components/forms/inputs/textArea';
import SelectInput from 'components/forms/inputs/selectInput';
import Label from 'components/forms/inputs/label';
import { formatCurrency } from 'lib/helpers/format';
import { api } from 'trpc/react';

import type { RouterInputs, RouterOutputs } from 'trpc/react';
import type { Source } from '@prisma/client';
import type { z } from 'zod';

export const TimePerWeekLabel: Record<TimePerWeek, string> = {
  OneToThree: '1-3 hours/week',
  ThreeToFive: '3-5 hours/week',
  FiveToEight: '5-8 hours/week',
  TenPlus: '10+ hours/week',
};

export const SourceLabel: Record<Source, string> = {
  SearchEngine: 'Google / searching',
  Reddit: 'Reddit community',
  SocialMediaPost: 'Social media posts',
  EmailPodcastAds: 'Email / podcast / ads',
  WordOfMouth: 'Friends, colleagues, family',
  WebsiteOrBlog: 'A website, or blog post',
  None: 'None of these',
};

const Field: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div>
      <div className='font-bold uppercase'>{title}</div>
      {children}
    </div>
  );
};
interface RequestProps {
  request: RouterOutputs['playground']['getRequest'];
}

export const RequestDetails: React.FC<RequestProps> = ({ request }) => {
  const { data: session } = useSession();
  const timeSinceCreated = useMemo(() => {
    if (!request) return null;
    return readableTimeDiff(request.createdAt)[0];
  }, [request]);

  const [dueDateFormatted, timeUntilDue, isDue, hasNoDue] = useMemo(() => {
    return request.dueDate
      ? [
          DateTime.fromJSDate(request.dueDate).toFormat('MMMM dd, yyyy'),
          ...readableTimeDiff(request.dueDate),
        ]
      : [null, null, null, true];
  }, [request.dueDate]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const words = request.description?.split(' ');
    let newDescription = '';
    const MAX_WORDS = 100;
    if (words.length > MAX_WORDS && !isExpanded) {
      for (let i = 0; i < MAX_WORDS; i++) {
        newDescription += words[i] + (i < MAX_WORDS - 1 ? ' ' : '...');
      }
    } else {
      newDescription = request.description;
      setIsExpanded(true);
    }
    setDescription(newDescription);
  }, [isExpanded, request.description]);

  const formattedBudget = useMemo(() => {
    if (!request?.budget) return null;
    return formatCurrency(request?.budget?.quantity.toNumber());
  }, [request?.budget]);

  return (
    <div className='px-10 mb-5 md:px-40'>
      <div className='flex flex-row justify-start gap-5'>
        {request.status !== RequestStatus.Accepted && (
          <div
            className={classNames('px-3 py-1 ml-0 border w-fit mb-5', {
              'bg-red text-white': request.status === RequestStatus.Rejected,
              'bg-grey text-grey-light':
                request.status === RequestStatus.Pending,
            })}
          >
            {request.status} request!
          </div>
        )}
      </div>

      <div className='relative flex flex-col-reverse justify-between gap-2 mb-4 font-mono text-xl text-left md:flex-row'>
        <div className='prose prose-p:max-w-prose md:prose-xl max-w-none prose-p:leading-6 prose-headings:leading-none'>
          <div
            className='absolute w-16 -translate-x-full -left-5 aspect-square'
            style={{
              backgroundColor: CATEGORY_COLORS[request.category],
            }}
          />
          <Field title='Title'>
            <h1 className='text-2xl font-bold' title={request.title}>
              {request.title}
            </h1>
          </Field>
          <Field title='Description'>
            <div className='font-sans break-words'>
              <div className='inline-block'>
                {description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {!isExpanded && (
                  <div className='flex justify-center my-14'>
                    <WhiteButton
                      className='font-mono text-2xl'
                      onClick={() => setIsExpanded(true)}
                    >
                      Read more
                    </WhiteButton>
                  </div>
                )}
              </div>
            </div>
          </Field>
          <Field title='About the organization'>
            <div className='font-sans break-words'>
              <div className='inline-block'>
                {request.organizationDescription
                  ?.split('\n')
                  .map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>
            </div>
          </Field>

          <Field title='Skills required'>
            <div>{request.requiredSkills.join(', ')}</div>
          </Field>
        </div>
        <SubtleBorder className='flex flex-col gap-1 p-8 min-w-fit bg-grey-background h-fit'>
          <Field title='Category'>{CATEGORY_LABELS[request.category]}</Field>
          <Field
            title={`${
              hasNoDue
                ? 'Due Date'
                : dueDateFormatted
                  ? isDue
                    ? 'Was due'
                    : 'Due'
                  : 'Due'
            }`}
          >
            {hasNoDue ? 'None' : timeUntilDue ? dueDateFormatted : 'Today'}
          </Field>
          <Field title='Compensation'>
            {request.budget ? (
              <div>
                {formattedBudget} {request.budget.type.toLowerCase()}
              </div>
            ) : (
              'Volunteer role'
            )}
          </Field>
          <Field title='Website'>{request.website}</Field>
          {request.category === PlaygroundRequestCategory.Designer && (
            <>
              <Field title='Current design exists'>
                {request.designRequestCurrentDesignExists ? 'Yes' : 'No'}
              </Field>
              {request.designRequestType && (
                <Field title='Design request type'>
                  {request.designRequestType}
                </Field>
              )}
            </>
          )}
          {request.category === PlaygroundRequestCategory.Developer && (
            <>
              <Field title='Website exists'>
                {request.devRequestWebsiteExists ? 'Yes' : 'No'}
              </Field>
              {request.devRequestWebsiteUrl && (
                <Field title='Concerned website url'>
                  {request.devRequestWebsiteUrl}
                </Field>
              )}
            </>
          )}
          {request.organization && (
            <Field title='Organization name'>{request.organization}</Field>
          )}
          {session?.user?.role === UserRole.Admin && (
            <>
              <Field title='Provided email'>{request.providedEmail}</Field>
              <Field title='Registered email'>
                {request.requester.email ?? ''}
              </Field>
            </>
          )}
        </SubtleBorder>
      </div>
      <div className='font-serif italic text-left text-grey-light'>
        <FontAwesomeIcon icon={faClock} /> Posted{' '}
        {timeSinceCreated ? `${timeSinceCreated} ago` : 'today'}
      </div>
    </div>
  );
};

const FormSidebar: React.FC<RequestProps> = ({ request }) => {
  const initials = useMemo(() => {
    const [first, second] = request.name.split(/\s+/);
    if (second) {
      return `${first[0]}${second[0]}`.toUpperCase();
    }

    return `${first[0].toUpperCase()}${first?.[1] || ''}`;
  }, [request.name]);

  return (
    <aside className='text-center truncate lg:text-left'>
      <div className='font-bold uppercase'>About the Requestor</div>
      <div className='grid content-center w-32 mx-auto mt-4 mb-4 rounded-full place-content-center aspect-square bg-red lg:ml-0'>
        <div className='font-bold text-white text-7xl w-fit'>{initials}</div>
      </div>
      <div>
        <div className='text-lg font-bold truncate'>{request.name}</div>
        <div title={request.organization || undefined} className='truncate'>
          {request.organization}
        </div>
        <div className='truncate'>
          <a
            target='_blank'
            rel='noreferrer'
            className='font-bold underline truncate hover:text-grey visited:text-grey'
            href={
              request.website.match(/^https?:\/\//)
                ? request.website
                : `http://${request.website}`
            }
          >
            {request.website.replace(/^https?:\/\//i, '')}
          </a>
        </div>
      </div>
    </aside>
  );
};

type FormInput = z.infer<typeof applyToRequestSchemaClient>;

const MainForm: React.FC<RequestProps> = ({ request }) => {
  const intl = useIntl();
  const { data: session, status: sessionStatus } = useSession();
  const storedForm = usePlaygroundApplyStore((state) =>
    state.getForm(request.id),
  );
  const setFormData = usePlaygroundApplyStore((state) =>
    state.setForm(request.id),
  );
  const clearFormData = usePlaygroundApplyStore((state) =>
    state.resetForm(request.id),
  );

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const onModalClose = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<RouterInputs['playground']['submitApplication']>({
    defaultValues: {
      ...storedForm,
      hasAppliedInThePast: request.userAlreadyApplied,
      requestId: request.id,
    },
    resolver: zodResolver(applyToRequestSchemaClient),
  });

  const onChangeValue = useCallback(
    (name: keyof FormInput) => (value: unknown) => {
      setFormData({ [name]: value });
    },
    [setFormData],
  );

  const myRegister = useCallback<typeof register>(
    (name, options) => {
      return register(name, {
        ...options,
        onChange: (value) => {
          options?.onChange?.(value);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          onChangeValue(name)(value.currentTarget.value);
        },
      });
    },
    [onChangeValue, register],
  );
  const shouldSubmit = router.query.submit === 'true';

  const { data: lastApplication, isSuccess: isLastApplicationSuccess } =
    api.playground.getLastUserApplication.useQuery(undefined, {
      enabled: sessionStatus === 'authenticated',
    });

  useOnce(
    () => {
      if (!session?.user) return;
      const { name, email } = session.user;
      if (name && !watch('name')) {
        setValue('name', name);
        setFormData({ name });
      }

      if (email && !watch('providedEmail')) {
        setValue('providedEmail', email);
        setFormData({ providedEmail: email });
      }
    },
    {
      enabled:
        sessionStatus === 'authenticated' && !shouldSubmit && router.isReady,
    },
  );

  useOnce(
    () => {
      if (!lastApplication) return;

      Object.entries(lastApplication).forEach(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (value && !watch(key as any)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(key as any, value);
        }
      });
    },
    {
      enabled: isLastApplicationSuccess && !shouldSubmit && router.isReady,
    },
  );

  const {
    mutateAsync,
    isPending: isLoading,
    isSuccess,
  } = api.playground.submitApplication.useMutation({
    onSuccess: () => {
      clearFormData();
      reset();
    },
  });

  const mutate = useCallback<typeof mutateAsync>(
    (params) => {
      return toast.promise(mutateAsync(params), {
        pending: 'Submitting...',
        success: 'Your application has been submitted!',
        error: 'Error submitting the application. Please try again later.',
      });
    },
    [mutateAsync],
  );

  const onSubmit = useCallback(
    async (values: RouterInputs['playground']['submitApplication']) => {
      if (sessionStatus !== 'authenticated') {
        if (sessionStatus === 'unauthenticated') setIsSignInModalOpen(true);
        reset(undefined, { keepValues: true });
        return;
      }

      await mutate(values);
    },
    [sessionStatus, mutate, reset],
  );

  useOnce(
    () => {
      formRef!.scrollIntoView({ block: 'end' });
      void handleSubmit(onSubmit)();
    },
    { enabled: router.isReady && !!formRef && shouldSubmit },
  );

  return (
    <>
      <form
        ref={setFormRef}
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-5 mx-auto text-left align-bottom md:grid-cols-6'
      >
        <div className='font-serif text-2xl italic font-medium col-span-full'>
          Interested in applying to help with this project?
        </div>
        <TextInput
          showRequiredMark
          className='col-span-full'
          error={errors.name?.message}
          {...myRegister('name')}
          placeholder='Your name'
        >
          Name
        </TextInput>
        <TextInput
          className='col-span-full'
          error={errors.pronouns?.message}
          {...myRegister('pronouns')}
          placeholder='Your pronouns'
        >
          Pronouns
        </TextInput>
        <TextInput
          showRequiredMark
          className='flex flex-col md:col-span-3'
          error={errors.providedEmail?.message}
          {...myRegister('providedEmail')}
          placeholder='name@example.com'
        >
          Email
        </TextInput>
        <TextInput
          showRequiredMark
          className='md:col-span-3'
          error={errors.portfolioLink?.message}
          {...myRegister('portfolioLink')}
          placeholder='yourwebsite.com'
        >
          <span className='hidden lg:inline'>Personal website or p</span>
          <span className='inline lg:hidden'>P</span>ortfolio link
        </TextInput>
        <TextInput
          className='md:col-span-2'
          error={errors.twitterUrl?.message}
          {...myRegister('twitterUrl')}
          placeholder='@yourhandle'
        >
          Twitter
        </TextInput>
        <TextInput
          className='md:col-span-2'
          error={errors.instagramUrl?.message}
          {...myRegister('instagramUrl')}
          placeholder='@yourhandle'
        >
          Instagram
        </TextInput>
        <TextInput
          className='md:col-span-2'
          error={errors.linkedinUrl?.message}
          {...myRegister('linkedinUrl')}
          placeholder='linkedin.com/in/'
        >
          LinkedIn
        </TextInput>
        <div className='flex flex-col justify-start gap-5 md:flex-row col-span-full'>
          <div className='font-bold'>
            Have you applied for a Playground project in the past?
          </div>
          <Controller
            control={control}
            name='hasAppliedInThePast'
            render={({ field: { value, onChange } }) => (
              <>
                <RadioButton
                  onChange={() => {
                    setFormData({ hasAppliedInThePast: true });
                    onChange(true);
                  }}
                  checked={value === true}
                  label='Yes'
                />
                <RadioButton
                  onChange={() => {
                    setFormData({ hasAppliedInThePast: false });

                    onChange(false);
                  }}
                  checked={value === false}
                  label='No'
                />
                {errors.hasAppliedInThePast?.message && (
                  <span className='text-red'>
                    {errors.hasAppliedInThePast.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className='flex flex-col justify-start gap-5 md:flex-row col-span-full'>
          <div className='font-bold'>Are you vegan?</div>
          <Controller
            control={control}
            name='isVegan'
            render={({ field: { value, onChange } }) => (
              <>
                <RadioButton
                  onChange={() => {
                    setFormData({ isVegan: true });
                    onChange(true);
                  }}
                  checked={value === true}
                  label='Yes'
                />
                <RadioButton
                  onChange={() => {
                    setFormData({ isVegan: true });
                    onChange(false);
                  }}
                  checked={value === false}
                  label='No'
                />
                {errors.isVegan?.message && (
                  <span className='text-red'>{errors.isVegan.message}</span>
                )}
              </>
            )}
          />
        </div>
        <TextInput
          className='col-span-full md:col-span-3'
          error={errors.calendlyUrl?.message}
          {...myRegister('calendlyUrl')}
          placeholder='calendly.com/yourname'
        >
          Calendly link (or alternative scheduling link)
        </TextInput>
        <div className='relative bottom-0 self-end col-span-full md:col-span-3'>
          <Label
            htmlFor='availableTimePerWeek'
            error={errors.availableTimePerWeek?.message}
            showRequiredMark
          >
            Available time per week
          </Label>
          <Controller
            control={control}
            name='availableTimePerWeek'
            render={({ field: { value: current, onChange, ...field } }) => (
              <SelectInput
                {...field}
                placeholder='Select an option'
                onChange={(value) => {
                  setFormData({
                    availableTimePerWeek: value?.value as TimePerWeek,
                  });
                  onChange(value ? value.value : null);
                }}
                current={{ value: current, label: TimePerWeekLabel[current] }}
                options={Object.keys(TimePerWeek).map((time) => ({
                  value: time,
                  label: TimePerWeekLabel[time as TimePerWeek],
                }))}
              />
            )}
          />
        </div>
        <TextInput
          className='col-span-full'
          type='number'
          inputMode='numeric'
          min={1}
          placeholder='Days'
          {...myRegister('estimatedTimeDays', { valueAsNumber: true })}
          error={errors.estimatedTimeDays?.message}
        >
          Estimated time commitment
          <span className='text-red'>*</span>&nbsp;
          <span className='font-thin'>
            Please give a rough estimate of how long do you think this should
            take
          </span>
        </TextInput>
        <div className='col-span-full'>
          <Label error={errors.source?.message} htmlFor='source'>
            Where did you hear about Playground?
          </Label>
          <Controller
            name='source'
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={
                  value ? { value: value, label: SourceLabel[value] } : null
                }
                onChange={(value) => {
                  setFormData({
                    source: value?.value as Source,
                  });
                  onChange(value ? value.value : null);
                }}
                options={Object.entries(SourceLabel).map(([value, label]) => ({
                  value,
                  label,
                }))}
              />
            )}
          />
        </div>
        <TextArea
          error={errors.moreInfo?.message}
          showRequiredMark
          className='col-span-full'
          rows={5}
          {...myRegister('moreInfo')}
          placeholder='e.g. What skill you have relating to this project, why do you want to help, etc.'
        >
          Please tell us a little bit more about yourself and why you&apos;d be
          a good fit for this request
        </TextArea>
        <Controller
          control={control}
          name='commitToHelping'
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              labelPosition='right'
              checked={value}
              onChange={(checked) => {
                setFormData({ [field.name]: checked });
                onChange(checked);
              }}
              className='col-span-full'
              error={errors.commitToHelping?.message}
              {...field}
            >
              I understand that if selected, I will do my best to commit to a
              reasonable amount of time needed to help with this project,
              communicate progress updates, and meet any potential deadlines.
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name='agreeToTerms'
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              labelPosition='right'
              checked={value}
              onChange={(checked) => {
                setFormData({ [field.name]: checked });
                onChange(checked);
              }}
              className='col-span-full'
              error={errors.agreeToTerms?.message}
              {...field}
            >
              I agree to the{' '}
              <span className='text-green'>
                <Link href={`/${intl.locale}/playground/terms-and-conditions`}>
                  VH: Playground terms and conditions
                </Link>
              </span>
            </Checkbox>
          )}
        />
        <DarkButton
          disabled={isLoading || isSuccess || request.userAlreadyApplied}
          type='submit'
          className='w-full px-10 mx-auto col-span-full md:ml-0 md:w-fit'
        >
          {isLoading ? (
            <Spinner />
          ) : request.userAlreadyApplied ? (
            'You have already applied!'
          ) : (
            'Submit'
          )}
        </DarkButton>
      </form>
      <ConfirmationModal isOpen={isSuccess} type='application' />
      <SignInPrompt
        isOpen={isSignInModalOpen}
        type='application'
        onClose={onModalClose}
        email={watch('providedEmail')}
        submitOnVerify
      />
    </>
  );
};

const RequestApplicationBlocked: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className='text-5xl'>⚠️</div>
      <h1 className='text-2xl my-5'>
        Please contact us before submitting another application.
      </h1>
      <DarkButton className='w-fit m-auto' href={`/${intl.locale}/contact`}>
        Contact
      </DarkButton>
    </>
  );
};

export const RequestApplyForm: React.FC<RequestProps> = ({ request }) => {
  const { status: sessionStatus } = useSession();
  const { data: lastApplication } =
    api.playground.getLastUserApplication.useQuery(undefined, {
      enabled: sessionStatus === 'authenticated',
    });

  return (
    <div className='flex flex-col-reverse justify-between px-10 py-10 divide-white bg-grey-background lg:flex-row lg:divide-x-2 gap-y-5'>
      {lastApplication?.status === ApplicationStatus.Blocked ? (
        <div className='max-w-lg mx-auto xl:max-w-sm'>
          <RequestApplicationBlocked />
        </div>
      ) : (
        <>
          <div className='flex-grow max-w-lg mx-auto xl:max-w-2xl lg:translate-x-20'>
            <MainForm request={request} />
          </div>
          <div className='mx-auto lg:mx-0 lg:px-10 xl:pl-20 lg:max-w-sm w-max'>
            <FormSidebar request={request} />
          </div>
        </>
      )}
    </div>
  );
};

export default Request;

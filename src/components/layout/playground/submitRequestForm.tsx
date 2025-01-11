import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import {
  BudgetType,
  PlaygroundRequestCategory,
  RequestStatus,
} from '@prisma/client';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { PlaygroundRequestOrganizationType } from '@prisma/client';
import { useIntl } from 'react-intl';

import { DarkButton } from '../../decoration/buttons';
import Spinner from '../../decoration/spinner';
import TextArea from '../../forms/inputs/textArea';
import TextInput from '../../forms/inputs/textInput';
import Label from '../../forms/inputs/label';
import SelectInput from '../../forms/inputs/selectInput';
import Checkbox from '../../forms/inputs/checkbox';
import ToolTip from '../../decoration/tooltip';
import CustomLink from '../../decoration/link';
import useOnce from '../../../hooks/useOnce';
import {
  CATEGORY_DESCRIPTION,
  CATEGORY_LABELS,
} from '../../../../prisma/constants';

import SignInPrompt from './siginInPrompt';
import ConfirmationModal from './confirmationModal';

import usePlaygroundSubmitRequestStore from 'lib/stores/playground/submitRequestStore';
import { verifyRequestFormRequestSchema } from 'lib/services/playground/schemas';
import { useIsFirstRender } from 'hooks/useIsFirstRender';
import { api } from 'trpc/react';

import type { PlaygroundRequestDesignRequestType } from '@prisma/client';
import type { z } from 'zod';
import type { submitRequestSchemaClient } from 'lib/services/playground/schemas';
import type { OptionType } from '../../forms/inputs/selectInput';
import type { FieldError } from 'react-hook-form';
import type { RefCallback } from 'react';

const CATEGORIES = Object.keys(PlaygroundRequestCategory).map((cat) => ({
  value: cat as PlaygroundRequestCategory,
  label: `${CATEGORY_LABELS[cat as PlaygroundRequestCategory]} (${
    CATEGORY_DESCRIPTION[cat as PlaygroundRequestCategory]
  })`,
}));

const IS_FOR_PROFIT_ORGANIZATION_OPTIONS: OptionType<PlaygroundRequestOrganizationType>[] =
  [
    { label: 'No', value: PlaygroundRequestOrganizationType.Activism },
    { label: 'Yes', value: PlaygroundRequestOrganizationType.Profit },
  ];

const DEV_REQUEST_WEBSITE_EXISTS_OPTIONS: OptionType<boolean>[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const DESIGN_REQUEST_TYPE_OPTIONS: OptionType<PlaygroundRequestDesignRequestType>[] =
  [
    { label: 'Logo (New or Redesign)', value: 'Logo' },
    { label: 'Social Media (Banners, etc)', value: 'SocialMedia' },
    { label: 'Branding (Guides, advice, etc)', value: 'Branding' },
    { label: 'Donor documents (Design, layout, etc)', value: 'DonorDocuments' },
    { label: 'User Interface (UI/UX, etc)', value: 'UserInterface' },
    { label: 'Illustration (Images, drawings)', value: 'Illustration' },
    { label: 'Animation (Videos, etc)', value: 'Animation' },
    { label: 'Miscellaneous (Icons, small changes)', value: 'Miscellaneous' },
    { label: 'Other', value: 'Other' },
  ];

const DESIGN_REQUEST_CURRENT_DESIGN_EXISTS_OPTIONS: OptionType<boolean>[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const IS_FREE_OPTIONS: OptionType<boolean>[] = [
  { label: 'Volunteer', value: true },
  { label: 'Paid', value: false },
];

const BUDGET_TYPE_OPTIONS: OptionType<BudgetType>[] = [
  { label: BudgetType.Fixed, value: BudgetType.Fixed },
  { label: BudgetType.Hourly, value: BudgetType.Hourly },
  { label: BudgetType.Monthly, value: BudgetType.Monthly },
];

type FormInput = z.input<typeof submitRequestSchemaClient>;
type FormOutput = z.infer<typeof submitRequestSchemaClient>;

interface SubmitRequestFormParam {
  requestId?: string;
}

const SubmitRequestForm: React.FC<SubmitRequestFormParam> = ({ requestId }) => {
  const intl = useIntl();
  const { data: session, status: sessionStatus } = useSession();
  const utils = api.useUtils();

  const { budget: storedBudget, ...storedForm } =
    usePlaygroundSubmitRequestStore((state) => state.form);
  const setFormData = usePlaygroundSubmitRequestStore((state) => state.setForm);
  const clearFormData = usePlaygroundSubmitRequestStore(
    (state) => state.resetForm,
  );

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [requestLoaded, setRequestLoaded] = useState(false);
  const onModalClose = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<FormInput>({
    defaultValues: storedForm.id ? undefined : storedForm,
    resolver: zodResolver(verifyRequestFormRequestSchema),
  });

  const [isFree, setIsFree] = useState(false);

  const { data: request } = api.playground.getRequest.useQuery(
    { id: requestId, extended: true },
    {
      enabled: !!requestId,
    },
  );

  useEffect(() => {
    if (request && sessionStatus !== 'loading' && !requestLoaded) {
      if (
        request.status !== RequestStatus.Rejected &&
        (!session?.user ||
          (session?.user?.role !== 'Admin' &&
            !request.isRequestedByCurrentUser))
      ) {
        void router.push('/playground');
        return;
      }
      const skills = request.requiredSkills.join(', ');
      type RequestFormData = Pick<
        typeof request,
        | 'providedEmail'
        | 'name'
        | 'phone'
        | 'website'
        | 'calendlyUrl'
        | 'title'
        | 'category'
        | 'description'
        | 'neededVolunteers'
      >;
      const requestData: RequestFormData = {
        ...request,
      };
      const formData: Partial<z.infer<typeof verifyRequestFormRequestSchema>> =
        {
          ...requestData,
          dueDate: request?.dueDate
            ? DateTime.fromISO(request.dueDate.toISOString()).toFormat(
                'yyyy-LL-dd',
              )
            : '',
          budget: request?.budget
            ? {
                type: request?.budget.type,
                quantity: request?.budget?.quantity.toNumber(),
              }
            : undefined,
          phone: request?.phone ?? undefined,
          organization: request?.organization ?? undefined,
          requiredSkills: skills,
        };
      Object.keys(formData).forEach((keystring) => {
        const key = keystring as keyof typeof formData;
        setValue(key, formData[key]);
      });
      if (formData.budget?.type) {
        setIsFree(false);
        setValue('budget.type', formData.budget?.type);
      }
      setRequestLoaded(true);
    }
  }, [request, setValue, session, router, sessionStatus, requestLoaded]);

  const filledDataFromStorage = useOnce(() => {
    if (!storedBudget) {
      setIsFree(true);
      return;
    }
    setValue('budget', storedBudget as FormInput['budget']);
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
          onChangeValue(name as any)(value.currentTarget?.value);
        },
      });
    },
    [onChangeValue, register],
  );

  const { data: lastSubmittedRequest } =
    api.playground.getLastUserRequest.useQuery(undefined, {
      enabled: sessionStatus === 'authenticated',
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 1,
    });

  useOnce(
    () => {
      if (!session?.user || requestId) return;
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
        sessionStatus === 'authenticated' &&
        router.isReady &&
        router.query.submit !== 'true' &&
        filledDataFromStorage,
    },
  );

  useOnce(
    () => {
      if (!requestId) {
        Object.entries(lastSubmittedRequest!).forEach(([key, value]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (value && !watch(key as any)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setValue(key as any, value);
          }
        });
      }
    },
    {
      enabled:
        !!lastSubmittedRequest &&
        router.isReady &&
        router.query.submit !== 'true' &&
        filledDataFromStorage,
    },
  );

  const { mutateAsync, isPending, isSuccess } =
    api.playground.submitRequest.useMutation({
      onSuccess: () => {
        clearFormData();
        reset();
      },
    });

  const mutate = useCallback<typeof mutateAsync>(
    (params) => {
      if (requestId) {
        params = {
          id: requestId,
          ...params,
        };
      }
      if (params.dueDate) {
        params.dueDate = new Date(params.dueDate);
      } else {
        params.dueDate = null;
      }
      return toast.promise(mutateAsync(params), {
        pending: 'Submitting...',
        success: 'Your application has been submitted!',
        error:
          "There's been an error submitting your application. Please try again later.",
      });
    },
    [mutateAsync, requestId],
  );

  const onSubmit = useCallback(
    async (values: FormOutput) => {
      if (sessionStatus === 'unauthenticated') {
        setIsSignInModalOpen(true);
        reset(undefined, {
          keepValues: true,
        });
        return;
      } else if (sessionStatus === 'loading') {
        reset(undefined, {
          keepValues: true,
        });
      }

      await mutate(values);
      await utils.playground.getRequest.invalidate({ id: requestId });
    },
    [mutate, reset, sessionStatus, requestId, utils.playground.getRequest],
  );

  useOnce(
    () => {
      formRef!.scrollIntoView({
        block: 'end',
      });
      void handleSubmit(onSubmit)();
    },
    {
      enabled:
        router.isReady &&
        sessionStatus === 'authenticated' &&
        router.query.submit === 'true' &&
        !!formRef &&
        filledDataFromStorage,
    },
  );

  useEffect(() => {
    if (!isFree) return;
    setValue('budget', undefined);
  }, [isFree, setValue]);

  const [requestCategory, organizationType] = watch([
    'category',
    'organizationType',
  ]);

  // reset category specific values
  useEffect(() => {
    setValue('devRequestWebsiteExists', undefined);
    setValue('devRequestWebsiteUrl', undefined);
    setValue('designRequestType', undefined);
    setValue('designRequestCurrentDesignExists', undefined);
  }, [requestCategory, setValue]);

  const isFirstRender = useIsFirstRender();

  const requestCategoryToRequestDescriptionPlaceholderMap: Partial<
    Record<PlaygroundRequestCategory, string>
  > = {
    Developer:
      'Please outline what you require on your website (e.g. event calendar, blog, resources, donation buttons, etc). Make sure to  include what platform you would like to use, how many pages/how complex the website is, and whether you have the content ready.',
    Designer:
      'Please outline in detail what design you require help with. For example, if you want to redesign your logo, describe what you like/dislike about your current design. Consider also describing the personality of your brand and share if you have some examples of designs that you love.',
  };

  return (
    <div className='px-10 bg-grey-background' id='contact-us'>
      <form
        ref={setFormRef as RefCallback<HTMLElement>}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-5 py-10 mx-auto text-left lg:grid-cols-6 md:max-w-3xl'
      >
        <div className='text-xl col-span-full'>Personal Information</div>
        <TextInput
          className='lg:col-span-3 col-span-full'
          placeholder='Name'
          showRequiredMark
          {...myRegister('name', { required: 'Please enter a name' })}
          error={errors.name?.message}
        >
          Name
        </TextInput>
        <TextInput
          className='lg:col-span-3 col-span-full'
          placeholder='they/them'
          {...myRegister('pronouns')}
          error={errors.pronouns?.message}
        >
          Pronouns
        </TextInput>
        <TextInput
          className='col-span-full'
          placeholder='Email'
          showRequiredMark
          {...myRegister('providedEmail', {
            required: 'The email is required',
          })}
          error={errors.providedEmail?.message}
        >
          Email
        </TextInput>
        <TextInput
          className='lg:col-span-3 col-span-full'
          placeholder='Phone'
          showRequiredMark
          type='tel'
          {...myRegister('phone', { required: 'The phone is required' })}
          error={errors.phone?.message}
        >
          Phone
        </TextInput>
        <TextInput
          placeholder='www.website...'
          showRequiredMark
          {...myRegister('website', {
            required: 'Please enter a valid website',
          })}
          className='w-full col-span-full'
          error={errors.website?.message}
        >
          Website
        </TextInput>
        <TextInput
          showRequiredMark
          placeholder='Calendly'
          className='col-span-full'
          {...myRegister('calendlyUrl')}
          error={errors.calendlyUrl?.message}
        >
          Link to your Calendly
          <ToolTip
            placement='top-end'
            content={
              <p>
                <CustomLink href='https://calendly.com/' className='text-green'>
                  Calendly
                </CustomLink>
                &nbsp;is your hub for scheduling meetings professionally and
                efficiently, eliminating the hassle of back-and-forth emails so
                you can get back to work.
              </p>
            }
          >
            <sup className='ml-1'>?</sup>
          </ToolTip>
        </TextInput>
        <div className='text-xl col-span-full'>Organization Information</div>
        <TextInput
          className='col-span-full'
          placeholder='Organization'
          {...myRegister('organization', { required: false })}
          error={errors.organization?.message}
        >
          Organization
        </TextInput>
        <div className='col-span-full'>
          <Label htmlFor='organizationType'>
            Is your organization or activism for profit?
          </Label>

          <Controller
            name='organizationType'
            control={control}
            rules={{
              required: 'Please select the best option for your organization',
            }}
            render={({ field: { value: current, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={
                  IS_FOR_PROFIT_ORGANIZATION_OPTIONS.find(
                    (c) => c.value === current,
                  ) || null
                }
                error={errors.organizationType?.message}
                options={IS_FOR_PROFIT_ORGANIZATION_OPTIONS}
                onChange={(option) => {
                  onChange(option?.value || null);
                  setFormData({
                    organizationType:
                      option?.value as PlaygroundRequestOrganizationType,
                  });
                }}
              />
            )}
          />
        </div>
        {!isFirstRender &&
          organizationType === PlaygroundRequestOrganizationType.Profit && (
            <div className='col-span-full'>
              Playground is a platform that primarily supports not-for-profit
              organizations and activism. As a for-profit, we require you to
              offer compensation for your project. Please add this information
              to your post by selecting &ldquo;Paid&rdquo; in the request
              information section. We want to support as many vegan endeavors as
              possible, but also try our best to ensure the equitable
              distribution of limited volunteer labor. Thank you for your
              cooperation!
            </div>
          )}
        <TextArea
          placeholder='Please briefly describe your organization (e.g. your vision and mission, your impact, which countries you operate in, etc). By providing some context, you help the volunteers better understand how they will contribute towards your cause.'
          error={errors.organizationDescription?.message}
          {...myRegister('organizationDescription', {
            required: 'Organization description is required',
          })}
          style={{ resize: 'vertical' }}
          className='col-span-full'
          showRequiredMark
        >
          About your organization
        </TextArea>
        <div className='text-xl col-span-full'>Request Information</div>
        <TextInput
          placeholder='Title of Request'
          {...myRegister('title', {
            required: 'Please enter the title of the request',
          })}
          className='col-span-full'
          error={errors.title?.message}
        >
          Title of Request<span className='text-red'>*</span>&nbsp;
          <span className='font-thin'>
            Make it short and clear e.g. “Looking for developer to update
            Wordpress website” or “Logo design for new nonprofit”
          </span>
        </TextInput>
        <div className='col-span-full'>
          <div className='flex flex-col md:flex-row'>
            <Label htmlFor='category'>
              Category<span className='text-red'>*</span>&nbsp;
            </Label>
            <p className='font-thin mb-2'>
              For translators: check out our free content translation
              service,&nbsp;
              <Link
                href='https://veganlinguists.org/'
                className='font-bold whitespace-nowrap'
              >
                Vegan Linguists
              </Link>
            </p>
          </div>
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Please select a category of the request' }}
            render={({ field: { value: current, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={CATEGORIES.find((c) => c.value === current) || null}
                error={errors.category?.message}
                options={CATEGORIES}
                onChange={(option) => {
                  onChange(option?.value || null);
                  setFormData({
                    category: option?.value,
                  });
                }}
              />
            )}
          />
        </div>
        {!isFirstRender && requestCategory === 'Developer' && (
          <>
            <div className='md:col-span-2 col-span-full'>
              <Label htmlFor='devRequestWebsiteExists'>
                Do you have an existing website?
              </Label>
              <Controller
                name='devRequestWebsiteExists'
                control={control}
                render={({ field: { value: current, onChange, ...field } }) => (
                  <SelectInput
                    {...field}
                    current={
                      DEV_REQUEST_WEBSITE_EXISTS_OPTIONS.find(
                        (c) => c.value === current,
                      ) || null
                    }
                    error={errors.devRequestWebsiteExists?.message}
                    onChange={(option) => {
                      onChange(option?.value ?? null);
                      setFormData({
                        devRequestWebsiteExists: option?.value,
                      });
                    }}
                    options={DEV_REQUEST_WEBSITE_EXISTS_OPTIONS}
                  />
                )}
              />
            </div>
            <TextInput
              className='md:col-span-4 col-span-full'
              placeholder='www.website…'
              {...myRegister('devRequestWebsiteUrl', { required: false })}
              error={errors.devRequestWebsiteUrl?.message}
            >
              What is the URL of the website you need help with?
            </TextInput>
          </>
        )}
        {!isFirstRender && requestCategory === 'Designer' && (
          <>
            <div className='md:col-span-4 col-span-full'>
              <Label htmlFor='designRequestType'>
                What type of design request is this?
              </Label>
              <Controller
                name='designRequestType'
                control={control}
                render={({ field: { value: current, onChange, ...field } }) => (
                  <SelectInput
                    {...field}
                    current={
                      DESIGN_REQUEST_TYPE_OPTIONS.find(
                        (c) => c.value === current,
                      ) || null
                    }
                    error={errors.designRequestType?.message}
                    onChange={(option) => {
                      onChange(option?.value ?? null);
                      setFormData({
                        designRequestType: option?.value,
                      });
                    }}
                    options={DESIGN_REQUEST_TYPE_OPTIONS}
                  />
                )}
              />
            </div>
            <div className='md:col-span-2 col-span-full'>
              <Label htmlFor='designRequestCurrentDesignExists'>
                Do you have a current design?
              </Label>
              <Controller
                name='designRequestCurrentDesignExists'
                control={control}
                render={({ field: { value: current, onChange, ...field } }) => (
                  <SelectInput
                    {...field}
                    current={
                      DESIGN_REQUEST_CURRENT_DESIGN_EXISTS_OPTIONS.find(
                        (c) => c.value === current,
                      ) || null
                    }
                    error={errors.designRequestCurrentDesignExists?.message}
                    onChange={(option) => {
                      onChange(option?.value ?? null);
                      setFormData({
                        designRequestCurrentDesignExists: option?.value,
                      });
                    }}
                    options={DESIGN_REQUEST_CURRENT_DESIGN_EXISTS_OPTIONS}
                  />
                )}
              />
            </div>
          </>
        )}
        <TextInput
          className='lg:col-span-4 w-full col-span-full'
          placeholder='Communication, ...'
          {...myRegister('requiredSkills', {
            required: 'Please select the skills required for the request',
          })}
          error={errors.requiredSkills?.message}
        >
          <div className='flex flex-col md:flex-row'>
            <p>
              Skills Required<span className='text-red'>*</span>&nbsp;
            </p>
            <p className='font-thin'>(separate by comma)</p>
          </div>
        </TextInput>
        <TextInput
          placeholder='Volunteer amount'
          showRequiredMark
          className='lg:col-span-2 col-span-full'
          type='number'
          inputMode='numeric'
          min={1}
          defaultValue={1}
          {...myRegister('neededVolunteers', { valueAsNumber: true })}
          error={errors.neededVolunteers?.message}
        >
          Volunteers required
        </TextInput>
        <div className='lg:col-span-2 col-span-full'>
          <Label htmlFor='isFree' showRequiredMark>
            Volunteer or Paid?
          </Label>
          <SelectInput
            name='isFree'
            current={IS_FREE_OPTIONS.find((c) => c.value === isFree) || null}
            onChange={(option) => {
              const value = (option?.value as boolean) ?? null;
              setIsFree(value);
            }}
            options={IS_FREE_OPTIONS}
            error={isFree ? errors.budget?.message : undefined}
          />
        </div>
        {!isFree && (
          <Controller
            name='budget'
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <div className='lg:col-span-2 col-span-full'>
                    <Label showRequiredMark>Rate?</Label>
                    <SelectInput
                      current={
                        BUDGET_TYPE_OPTIONS.find(
                          (c) => c.value === value?.type,
                        ) || null
                      }
                      error={(errors.budget?.type as FieldError)?.message}
                      options={BUDGET_TYPE_OPTIONS}
                      onChange={(option) => {
                        onChange(
                          option?.value
                            ? { ...value, type: option.value }
                            : null,
                        );
                        setFormData((state) => ({
                          budget: { ...state.budget, type: option?.value },
                        }));
                      }}
                    />
                  </div>
                  {!!value?.type && (
                    <div key='budget.quantity' className='lg:col-span-2'>
                      <TextInput
                        className='col-span-2'
                        placeholder='Budget'
                        type='number'
                        inputMode='numeric'
                        step={50}
                        min={0}
                        showRequiredMark
                        value={value?.quantity}
                        onChange={(e) => {
                          const quantity = e.currentTarget.valueAsNumber;
                          onChange({
                            ...value,
                            quantity,
                          });
                          setFormData({
                            budget: {
                              ...value,
                              quantity,
                            },
                          });
                        }}
                        error={errors.budget?.message}
                      >
                        Enter budget in USD$
                      </TextInput>
                    </div>
                  )}
                </>
              );
            }}
          />
        )}
        <TextArea
          placeholder={
            requestCategoryToRequestDescriptionPlaceholderMap[requestCategory]
          }
          error={errors.description?.message}
          {...myRegister('description', {
            required: 'Issue description is required',
          })}
          style={{ resize: 'vertical' }}
          className='col-span-full'
        >
          Describe the project/task you need help with
          <span className='text-red'>*</span>&nbsp;
          <span className='font-thin'>
            Please be as detailed as possible. The more detail your request has,
            the easier it will be to find a volunteer.
          </span>
        </TextArea>
        <div className='col-span-full'>
          <Label htmlFor='dueDate'>
            Desired due date&nbsp;
            <span className='font-thin'>
              Please be thoughtful about this, keep in mind that Playground
              volunteers often have full-time jobs and they are helping in their
              spare time.
            </span>
          </Label>
          <div>
            <TextInput
              className='w-full lg:w-1/2'
              min={new Date().toISOString().split('T')[0]}
              type='date'
              placeholder='Due date'
              error={errors.dueDate?.message}
              {...myRegister('dueDate', { required: false })}
            >
              {' '}
            </TextInput>
          </div>{' '}
        </div>

        <Checkbox
          labelPosition='right'
          className='col-span-full'
          error={errors.agreeToTerms?.message}
          {...myRegister('agreeToTerms')}
          onChange={(checked) => {
            setFormData({ agreeToTerms: checked });
            setValue('agreeToTerms', checked);
          }}
        >
          I agree to the{' '}
          <span className='text-green'>
            <Link href={`/${intl.locale}/playground/terms-and-conditions`}>
              VH: Playground terms and conditions
            </Link>
          </span>
          .
        </Checkbox>
        <DarkButton
          className='mb-10 text-center w-fit md:w-72'
          disabled={isPending || isSuccess}
          type='submit'
        >
          {isPending ? (
            <Spinner />
          ) : !requestId ? (
            'Submit My Request'
          ) : (
            'Save changes'
          )}
        </DarkButton>
      </form>
      <ConfirmationModal isOpen={isSuccess} type='request' />
      <SignInPrompt
        isOpen={isSignInModalOpen}
        type='request'
        onClose={onModalClose}
        email={watch('providedEmail')}
        submitOnVerify
      />
    </div>
  );
};

export default SubmitRequestForm;

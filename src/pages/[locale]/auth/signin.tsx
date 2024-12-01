import { getProviders, signIn, useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import TextInput from '../../../components/forms/inputs/textInput';
import { DarkButton } from '../../../components/decoration/buttons';
import { NavButton } from '../../../components/decoration/buttons';

import useOnce from 'hooks/useOnce';
import Spinner from 'components/decoration/spinner';

import type { NextPage } from 'next';
import type { SignInResponse } from 'next-auth/react';

interface SignInForm {
  email: string;
  // name: string;
}

const signInSchema = z.object({
  email: z.string().email(),
  // name: Joi.string().required(),
});

const resolver = zodResolver(signInSchema);

const SignIn: NextPage = () => {
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();
  const router = useRouter();

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  const { handleSubmit, register } = useForm<SignInForm>({ resolver });

  useOnce(() => {
    void getProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const onSubmit = useCallback<Parameters<typeof handleSubmit>[0]>(
    async ({ email }) => {
      const callbackUrl = router.query.callbackUrl as string;
      setIsLoading(true);

      const { ok } = (await signIn<'email'>('email', {
        email,
        callbackUrl,
      })) as SignInResponse;
      if (!ok) {
        setIsLoading(false);
      }
    },
    [router.query],
  );

  if (isLoading || status === 'loading') {
    return <Spinner />;
  }

  if (status === 'authenticated') {
    if (
      typeof router.query.callbackUrl === 'string' &&
      router.query.callbackUrl
    ) {
      void router.push(router.query.callbackUrl);
      return null;
    }

    return (
      <div>
        <FormattedMessage
          id='page.sign-in.already-signed-in.content'
          defaultMessage='You are already logged in. No <no-localization>callbackUrl</no-localization> provided. <button>Go to <no-localization>Playground</no-localization></button>'
          values={{
            button: (chunks) => (
              <NavButton href={`/${intl.locale}/playground`}>
                {chunks}
              </NavButton>
            ),
          }}
        />
      </div>
    );
  }

  if (!providers?.email) {
    return null;
  }

  return (
    <div className='p-10 bg-grey-background'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='w-1/2 mx-auto'>
          <TextInput {...register('email')} type='email'>
            <FormattedMessage
              id='page.sign-in.input.email'
              defaultMessage='Email'
            />
          </TextInput>
        </div>
        <DarkButton type='submit' disabled={isLoading}>
          <FormattedMessage
            id='page.sign-in.button.sign-in'
            defaultMessage='Sign in!'
          />
        </DarkButton>
      </form>
    </div>
  );
};

export default SignIn;

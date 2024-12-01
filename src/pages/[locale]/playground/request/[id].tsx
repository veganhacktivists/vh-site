import { useRouter } from 'next/router';
import { z } from 'zod';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import { faLongArrowAltLeft as leftArrow } from '@fortawesome/free-solid-svg-icons';
import { UserRole } from '@prisma/client';
import { useIntl } from 'react-intl';

import { DarkButton } from '../../../../components/decoration/buttons';

import PlaygroundLayout from 'components/layout/playground/layout';
import useOnce from 'hooks/useOnce';
import { api } from 'trpc/react';
import Spinner from 'components/decoration/spinner';
import {
  RequestApplyForm,
  RequestDetails,
} from 'components/layout/playground/applyForm';

import type PageWithLayout from 'types/persistentLayout';

const idSchema = z.string().cuid({ message: 'The request ID is invalid' });

const PlaygroundRequest: PageWithLayout = ({}) => {
  const intl = useIntl();
  const router = useRouter();
  const session = useSession();

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

  const {
    data: request,
    status,
    error,
  } = api.playground.getRequest.useQuery(router.query.id as string, {
    retry: 1,
  });

  useEffect(() => {
    if (error?.message === 'NOT_FOUND') {
      toast.error('The request could not be found', {
        onClose: () =>
          // in development this will fire instantly, due to a bug with "reactStrictMode"
          router.push('/playground', undefined, { shallow: true }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const truncatedDescription = request?.description.slice(0, 300);

  return (
    <>
      <NextSeo
        title={request?.title}
        description={truncatedDescription}
        openGraph={{ title: request?.title }}
      />
      <div className='mt-24'>
        <div className='m-10 mb-5 ml-10 w-fit text-grey md:ml-20'>
          <DarkButton
            href={`/${intl.locale}/playground`}
            className='flex font-mono uppercase place-items-center'
          >
            <FontAwesomeIcon icon={leftArrow} size='xs' />
            <span className='block pl-3'>Go Back</span>
          </DarkButton>
          {session.data?.user?.role === UserRole.Admin && (
            <div className='mt-2 text-left'>
              <DarkButton
                href={'/playground/admin'}
                className='flex font-mono uppercase place-items-center'
              >
                <FontAwesomeIcon icon={leftArrow} size='xs' />
                <span className='block pl-3'>Review requests</span>
              </DarkButton>
            </div>
          )}
        </div>
        {status === 'success' && (
          <>
            <RequestDetails request={request} />
            <RequestApplyForm request={request} />
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className='text-3xl text-red font-bold'>
              This request has been taken
            </h1>
          </>
        )}
        {status === 'pending' && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

PlaygroundRequest.Layout = PlaygroundLayout;

export default PlaygroundRequest;

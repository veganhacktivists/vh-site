import { NextSeo } from 'next-seo';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { RequestStatus } from '@prisma/client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import {
  DenyButton,
  ExternalLinkButton,
  GreenButton,
  LightButton,
  LogoutButton,
  OutlineButton,
  BlueButton,
} from 'components/decoration/buttons';
import { api } from 'trpc/react';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import Spinner from 'components/decoration/spinner';
import useOnce from 'hooks/useOnce';
import ApplicationCard from 'components/layout/playground/applicationCard';

import type { NextPage } from 'next';

const STATES_TO_HIDE: RequestStatus[] = [RequestStatus.Rejected];

const AdminPage: NextPage = () => {
  const intl = useIntl();
  const utils = api.useUtils();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<RequestStatus>(
    RequestStatus.Pending,
  );

  const readFromQuery = useOnce(
    () => {
      const status = router.query.status as RequestStatus;
      if (status) {
        setStatusFilter(status);
      }
    },
    { enabled: router.isReady },
  );

  useOnce(
    () => {
      Object.values(RequestStatus)
        .filter(
          (status) =>
            status !== statusFilter && !STATES_TO_HIDE.includes(status),
        )
        .forEach(async (status) => {
          await utils.playground.admin.getRequests.prefetch({
            status,
          });
        });
    },
    { enabled: readFromQuery },
  );

  const invalidateQuery = useCallback(
    () => utils.playground.admin.getRequests.invalidate(),
    [utils.playground.admin.getRequests],
  );

  const { data, isSuccess, isLoading } =
    api.playground.admin.getRequests.useQuery({
      status: statusFilter,
    });

  const { mutate, isPending: isMutationLoading } =
    api.playground.admin.setRequestStatus.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const { mutate: mutateDelete, isPending: isDeletionLoading } =
    api.playground.admin.deleteRequest.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const { mutate: mutateRepost, isPending: isRepostLoading } =
    api.playground.admin.repostRequest.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  const RequestFilterButton = useCallback(
    ({ status }: { status: RequestStatus }) => {
      return (
        <OutlineButton
          active={status === statusFilter}
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set('status', status);
            window.history.pushState({}, '', url);
            setStatusFilter(status);
          }}
        >
          {status === RequestStatus.Accepted ? 'Live' : status} requests
        </OutlineButton>
      );
    },
    [statusFilter],
  );

  const isActionLoading =
    isMutationLoading || isRepostLoading || isDeletionLoading;

  if (isLoading) {
    return <Spinner />;
  }

  if (!isSuccess) return null;

  return (
    <>
      <NextSeo title={`${statusFilter} Requests - Admin panel`} />
      <div>
        <div className='flex flex-col justify-center gap-10 p-10 mx-auto md:flex-row place-items-center'>
          {Object.values(RequestStatus)
            .filter((status) => !STATES_TO_HIDE.includes(status))
            .map((status) => (
              <RequestFilterButton key={status} status={status} />
            ))}
          <OutlineButton
            href='/playground/admin/applications'
            className='mx-5 w-fit'
          >
            See applications
          </OutlineButton>
          <LogoutButton
            href={`/${intl.locale}/auth/signout`}
            className='mx-5 w-fit'
          >
            Logout
          </LogoutButton>
        </div>
        {data.length === 0 && (
          <div className='text-center'>There are no available requests</div>
        )}
        <div
          className='grid gap-5 mx-auto my-5 md:mb-20 sm:px-10 md:grid-cols-2 lg:px-40'
          ref={animatedRef}
        >
          {data.map((request) => (
            <div key={request.id}>
              <PlaygroundRequestCard
                request={request}
                disabled={isActionLoading}
              >
                <b>This request is {request.status}!</b>
                <div className='grid grid-cols-1 gap-x-5 gap-y-2 md:grid-cols-2'>
                  {request.status === RequestStatus.Pending ? (
                    <>
                      <LightButton
                        className='w-full'
                        disabled={isActionLoading}
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to accept '${request.title}'?`,
                            )
                          ) {
                            mutate({
                              id: request.id,
                              status: RequestStatus.Accepted,
                            });
                          }
                        }}
                      >
                        Accept
                      </LightButton>
                      <DenyButton
                        className='w-full text-xl text-white'
                        disabled={isActionLoading}
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to reject '${request.title}'?`,
                            )
                          ) {
                            mutate({
                              id: request.id,
                              status: RequestStatus.Rejected,
                            });
                          }
                        }}
                      >
                        Deny
                      </DenyButton>
                    </>
                  ) : (
                    <BlueButton
                      className='w-full px-2 text-xl'
                      disabled={isActionLoading}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to repost '${request.title}'?`,
                          )
                        ) {
                          mutateRepost({
                            id: request.id,
                            ...(request.status === RequestStatus.Accepted && {
                              lastManuallyPushed: new Date(),
                            }),
                          });
                        }
                      }}
                    >
                      🔁
                      {request.status === RequestStatus.Accepted
                        ? ' Push again'
                        : ' Repost request'}
                    </BlueButton>
                  )}
                  {request.status !== RequestStatus.Completed ? (
                    <GreenButton
                      className='w-full px-2 text-xl'
                      disabled={isActionLoading}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to complete '${request.title}'?`,
                          )
                        ) {
                          mutate({
                            id: request.id,
                            status: RequestStatus.Completed,
                          });
                        }
                      }}
                    >
                      🎉 Mark as completed
                    </GreenButton>
                  ) : null}
                  <ExternalLinkButton
                    className='w-full px-2 text-xl text-white'
                    disabled={isActionLoading}
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete '${request.title}'?`,
                        )
                      ) {
                        mutateDelete({ id: request.id });
                      }
                    }}
                  >
                    🤫 Delete
                  </ExternalLinkButton>
                </div>
                {(statusFilter === RequestStatus.Completed ||
                  statusFilter === RequestStatus.Accepted) &&
                  request._count.applications > 0 && (
                    <>
                      <b>
                        There are {request._count.applications} accepted
                        applications for this request
                      </b>
                      <div className='pt-5 text-xl font-bold border-b'>
                        Applications
                      </div>
                      <div className='flex flex-col gap-5 divide-y'>
                        {request.applications.map((app) => (
                          <ApplicationCard key={app.id} application={app} />
                        ))}
                      </div>
                    </>
                  )}
              </PlaygroundRequestCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

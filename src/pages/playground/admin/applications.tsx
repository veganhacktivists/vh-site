import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useCallback } from 'react';
import { ApplicationStatus, RequestStatus } from '@prisma/client';
import { NextSeo } from 'next-seo';
import { useIntl } from 'react-intl';

import {
  DarkButton,
  DenyButton,
  ExternalLinkButton,
  LogoutButton,
  OutlineButton,
} from 'components/decoration/buttons';
import { api } from 'trpc/react';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import ApplicationCard from 'components/layout/playground/applicationCard';
import Spinner from 'components/decoration/spinner';

import type { NextPage } from 'next';

const AdminPage: NextPage = ({}) => {
  const intl = useIntl();
  const utils = api.useUtils();
  const {
    data,
    isSuccess,
    isLoading: isQueryLoading,
  } = api.playground.admin.requestsWithPendingApplications.useQuery();
  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  const invalidateQuery = useCallback(
    () => utils.playground.admin.requestsWithPendingApplications.invalidate(),
    [utils.playground.admin.requestsWithPendingApplications],
  );

  const { mutate: mutateDelete, isPending: isDeletionLoading } =
    api.playground.admin.deleteApplication.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const { mutate, isPending: isMutationLoading } =
    api.playground.admin.setApplicationStatus.useMutation({
      onSuccess: async () => {
        await invalidateQuery();
      },
    });

  const isLoading = isMutationLoading || isDeletionLoading;

  if (isQueryLoading) {
    return <Spinner />;
  }
  if (!isSuccess) return null;

  return (
    <>
      <NextSeo title='Applications - Admin Panel' />
      <div>
        <div className='flex flex-col justify-center gap-10 p-10 mx-auto md:flex-row place-items-center'>
          {Object.values(RequestStatus)
            .filter((status) => status !== RequestStatus.Rejected)
            .map((status) => (
              <OutlineButton
                href={{
                  pathname: '/playground/admin',
                  query: { status },
                }}
                key={status}
              >
                {status === RequestStatus.Accepted ? 'Live' : status} requests
              </OutlineButton>
            ))}
          <OutlineButton
            href='/playground/admin/applications'
            className='mx-5 w-fit'
            active
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
        <div
          className='flex flex-row flex-wrap justify-center gap-5'
          ref={animatedRef}
        >
          {data.length === 0 && (
            <div className='text-center'>There are no pending requests</div>
          )}
          {data.map((request) => (
            <div key={request.id}>
              <div className='h-full max-w-xl'>
                <PlaygroundRequestCard request={request}>
                  <b>
                    {request._count.applications > 0 ? (
                      <>
                        There are {request._count.applications} accepted
                        applications for this request
                      </>
                    ) : (
                      <>There are no accepted applications in this request</>
                    )}
                  </b>
                  <div className='pt-5 text-xl font-bold border-b'>
                    Applications
                  </div>
                  <div className='flex flex-col gap-5 divide-y'>
                    {request.applications.map((app) => (
                      <ApplicationCard key={app.id} application={app}>
                        <div className='grid grid-cols-1 gap-x-5 gap-y-2 md:grid-cols-2'>
                          <DarkButton
                            className='w-full'
                            disabled={isLoading}
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to accept ${app.name}'s application?`,
                                )
                              ) {
                                mutate({
                                  id: app.id,
                                  status: ApplicationStatus.Accepted,
                                });
                              }
                            }}
                          >
                            ✔️ Accept
                          </DarkButton>
                          <DenyButton
                            className='w-full'
                            disabled={isLoading}
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to deny ${app.name}'s application?`,
                                )
                              ) {
                                mutate({
                                  id: app.id,
                                  status: ApplicationStatus.Rejected,
                                });
                              }
                            }}
                          >
                            ❌ Deny
                          </DenyButton>
                          <ExternalLinkButton
                            className='w-full'
                            disabled={isLoading}
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to delete ${app.name}'s application?`,
                                )
                              ) {
                                mutateDelete(app.id);
                              }
                            }}
                          >
                            🤫 Delete
                          </ExternalLinkButton>
                          <ExternalLinkButton
                            className='w-full'
                            disabled={isLoading}
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to block ${app.name} from taking on future applications?`,
                                )
                              ) {
                                mutate({
                                  id: app.id,
                                  status: ApplicationStatus.Blocked,
                                });
                              }
                            }}
                          >
                            ⛔ Block
                          </ExternalLinkButton>
                        </div>
                      </ApplicationCard>
                    ))}
                  </div>
                </PlaygroundRequestCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

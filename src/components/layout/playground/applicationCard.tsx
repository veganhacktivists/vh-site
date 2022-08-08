import React from 'react';

import classNames from 'classnames';

import { readableTimeSinceDate } from 'lib/helpers/date';

import type { inferQueryOutput } from 'lib/client/trpc';

interface ApplicationCardProps {
  application: inferQueryOutput<'playground.admin.requestsWithPendingApplications'>[0]['applications'][0];
}

const Data: React.FC<{ name: string; value: React.ReactNode | null }> = ({
  name,
  value,
}) => {
  if (!value) return null;

  return (
    <div>
      <span className="font-bold">{name}:</span> <span>{value}</span>
    </div>
  );
};

const ApplicationCard: React.FC<
  React.PropsWithChildren<ApplicationCardProps>
> = ({ children, application: app }) => {
  return (
    <div className="py-5">
      <div>
        <span className="font-bold">{app.name}</span> ({app.providedEmail})
        {app.providedEmail !== app.applicant.email && (
          <> &rArr; (logs in as {app.applicant.email})</>
        )}
      </div>
      <div>Applied {readableTimeSinceDate(app.createdAt)} ago</div>
      <Data name="Calendly" value={app.calendlyUrl} />
      <Data name="Instagram" value={app.instagramUrl} />
      <Data name="Twitter" value={app.twitterUrl} />
      <Data name="LinkedIn" value={app.linkedinUrl} />
      <Data
        name="Applied in the past"
        value={JSON.stringify(app.hasAppliedInThePast)}
      />
      <div
        className={classNames('font-bold', {
          'text-red': !app.isVegan,
          'text-green': app.isVegan,
        })}
      >
        {app.isVegan ? 'Vegan :D' : 'Not vegan D:'}
      </div>
      <Data
        name="Comments"
        value={
          app.moreInfo ? (
            <>
              {app.moreInfo?.split('\n').map((paragraph, i) => (
                <div className="mb-2" key={i}>
                  {paragraph}
                </div>
              ))}
            </>
          ) : (
            'None'
          )
        }
      />
      {children}
    </div>
  );
};

export default ApplicationCard;
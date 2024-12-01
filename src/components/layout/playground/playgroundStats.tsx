'use client';

import { useIntl } from 'react-intl';

import checkmarkIcon from '../../../../public/images/playground/icons/checkmark.svg';
import heartIcon from '../../../../public/images/playground/icons/heart.svg';
import resumeIcon from '../../../../public/images/playground/icons/resume.svg';
import clockIcon from '../../../../public/images/playground/icons/clock.svg';

import CustomImage from 'components/decoration/customImage';
import Spinner from 'components/decoration/spinner';
import { api } from 'trpc/react';

const PlaygroundStat: React.FC<{
  label: string;
  value?: number;
  icon: typeof clockIcon;
}> = ({ label, icon, value }) => {
  return (
    <div className='flex flex-col justify-center gap-5 mx-auto lg:flex-row place-items-center w-fit'>
      <CustomImage src={icon} alt='' />
      <div className='w-3/4 lg:w-1/2 font-mono text-center lg:text-left'>
        <div className='text-3xl font-bold leading-none'>
          {value ?? <Spinner />}
        </div>
        <div className='text-2xl font-light leading-none capitalize'>
          {label}
        </div>
      </div>
    </div>
  );
};

const PlaygroundStats = ({
  skipOpenRequests = false,
}: {
  skipOpenRequests?: boolean;
}) => {
  const intl = useIntl();

  const { data } = api.playground.getPlaygroundStats.useQuery(undefined, {
    staleTime: 10000,
  });

  return (
    <>
      {!skipOpenRequests && (
        <PlaygroundStat
          label={intl.formatMessage({
            id: 'section.playground-stats.stat.open-requests.label',
            defaultMessage: 'Open requests',
          })}
          icon={resumeIcon}
          value={data?.requestsOpen}
        />
      )}
      <PlaygroundStat
        label={intl.formatMessage({
          id: 'section.playground-stats.stat.requests-supported.label',
          defaultMessage: 'Requests supported',
        })}
        value={data?.requestsSupported}
        icon={checkmarkIcon}
      />
      <PlaygroundStat
        label={intl.formatMessage({
          id: 'section.playground-stats.stat.number-of-volunteers.label',
          defaultMessage: 'Playground volunteers',
        })}
        value={data?.numberOfVolunteers || undefined}
        icon={heartIcon}
      />
      <PlaygroundStat
        label={intl.formatMessage({
          id: 'section.playground-stats.stat.hours-volunteered.label',
          defaultMessage: 'Hours volunteered',
        })}
        value={data?.hoursVolunteered}
        icon={clockIcon}
      />
    </>
  );
};

export default PlaygroundStats;

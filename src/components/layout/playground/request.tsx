import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DateTime, Duration } from 'luxon';

import React, { useMemo } from 'react';

import classNames from 'classnames';

import { DarkButton } from 'components/decoration/buttons';

import getThemeColor from 'lib/helpers/theme';

import type { PlaygroundRequestCategory, Priority } from '@prisma/client';

import type { HTMLAttributes } from 'react';

import type { PlaygroundRequestType } from 'lib/client/api/hooks/playgroundRequests';

interface PlaygroundRequestCardProps {
  request: PlaygroundRequestType;
}

const Li: React.FC<HTMLAttributes<HTMLLIElement>> = ({
  children,
  className,
  ...props
}) => (
  <li
    {...props}
    className={classNames(
      'flex flex-row gap-2 justify-start items-center',
      className
    )}
  >
    <span className="w-1.5 my-auto bg-red aspect-square" />
    <span className="my-auto h-min">{children}</span>
  </li>
);

const PRIORITY_CLASSES: Record<Priority, string> = {
  Low: 'bg-green',
  Medium: 'bg-yellow-orange',
  High: 'bg-orange',
  Urgent: 'bg-red',
};

const CATEGORY_COLORS: Record<PlaygroundRequestCategory, string> = {
  Design: getThemeColor('magenta'),
  Website: getThemeColor('blue'),
  Marketing: getThemeColor('green'),
  SocialMedia: getThemeColor('yellow-orange'),
  VideoProduction: getThemeColor('orange'),
};

const CATEGORY_TEXT: Partial<Record<PlaygroundRequestCategory, string>> = {
  SocialMedia: 'Social Media',
  VideoProduction: 'Video Production',
};

export const PlaygroundRequestCard: React.FC<PlaygroundRequestCardProps> = ({
  request: {
    title,
    priority,
    description,
    requester,
    createdAt,
    category,
    organization,
    free,
  },
}) => {
  const timeSinceCreated = useMemo(() => {
    const timeDiff = DateTime.now()
      .diff(DateTime.fromISO(createdAt), ['years', 'months', 'weeks', 'days'])
      .normalize()
      .toObject();

    const diffWithoutZeroes = Object.fromEntries(
      Object.entries(timeDiff).filter(([, value]) => value >= 0.5)
    );

    if (Object.keys(diffWithoutZeroes).length === 0) {
      return null;
    }

    return Duration.fromObject(diffWithoutZeroes).toHuman({
      maximumFractionDigits: 0,
    });
  }, [createdAt]);

  const categoryColor = useMemo(() => CATEGORY_COLORS[category], [category]);

  return (
    <div className="flex flex-col gap-2 p-4 text-left bg-grey-background">
      <div className="space-y-1">
        <h3
          className="font-mono text-lg font-bold capitalize line-clamp-1"
          title={title}
        >
          {title}
        </h3>
        <div className="flex flex-row justify-start gap-2">
          <div
            style={{
              borderColor: categoryColor,
            }}
            className="px-2 py-0.5 border-[3px] rounded-xl capitalize"
          >
            {CATEGORY_TEXT[category] || category}
          </div>
          <div className="flex flex-row items-center gap-2 my-auto">
            <FontAwesomeIcon icon={faClock} size="sm" />{' '}
            <div>{timeSinceCreated ? `${timeSinceCreated} ago` : 'Today'}</div>
          </div>
        </div>
      </div>

      <div className="line-clamp-5">{description}</div>
      <ul className="grid content-end flex-grow grid-cols-2">
        <Li className="truncate" title={requester.name || undefined}>
          <span className="font-bold">{requester.name}</span>{' '}
          {!!organization && <>({organization})</>}
        </Li>
        <Li>
          <span className="font-bold">Priority:</span>{' '}
          <span
            className={classNames(
              PRIORITY_CLASSES[priority],
              'rounded-lg px-2 py-0.5 bg-opacity-75'
            )}
          >
            {priority}
          </span>
        </Li>
        <Li className="col-span-full">
          <span className="font-bold">
            {free ? 'Volunteer role' : 'Paid role'}
          </span>
        </Li>
      </ul>
      <DarkButton className="text-md">Read more/apply to help</DarkButton>
    </div>
  );
};

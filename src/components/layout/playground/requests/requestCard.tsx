import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { RequestStatus } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { PlaygroundRequestCategory } from '@prisma/client';
import { useIntl } from 'react-intl';

import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
} from '../../../../../prisma/constants';

import { DarkButton, GreyButton } from 'components/decoration/buttons';
import { readableTimeDiff } from 'lib/helpers/date';
import SquareField from 'components/decoration/squares';
import { formatCurrency } from 'lib/helpers/format';

import type { RouterOutputs } from 'trpc/react';
import type { HTMLAttributes } from 'react';

interface PlaygroundRequestCardProps {
  request:
    | RouterOutputs['playground']['getAllRequests'][number]
    | RouterOutputs['playground']['admin']['getRequests'][number];
  disabled?: boolean;
}

const Li: React.FC<
  HTMLAttributes<HTMLLIElement> & {
    category: PlaygroundRequestCategory;
    name: string;
  }
> = ({ name, children, className, category, ...props }) => {
  if (!children) {
    return null;
  }
  return (
    <li
      {...props}
      className={classNames(
        'max-w-fit flex flex-row gap-2 justify-start items-center break-words',
        className,
      )}
    >
      <span
        style={{ backgroundColor: CATEGORY_COLORS[category] }}
        className='w-1.5 h-1.5 my-auto aspect-square'
      />
      <span className='my-auto h-min'>
        <b>{name}:</b> {children}
      </span>
    </li>
  );
};

const PlaygroundRequestCard: React.FC<
  React.PropsWithChildren<PlaygroundRequestCardProps>
> = ({
  request: {
    id,
    title,
    description,
    requester,
    createdAt,
    category,
    organization,
    budget,
    dueDate,
    status,
    neededVolunteers,
    lastManuallyPushed,
    designRequestCurrentDesignExists,
    designRequestType,
    devRequestWebsiteExists,
    devRequestWebsiteUrl,
  },
  disabled = false,
  children,
}) => {
  const intl = useIntl();

  const [timeSinceCreated] = useMemo(
    () => readableTimeDiff(createdAt),
    [createdAt],
  );

  const timeSinceLastManuallyPushed = useMemo(
    () => lastManuallyPushed && readableTimeDiff(lastManuallyPushed)[0],
    [lastManuallyPushed],
  );

  const [timeUntilDue, isDue, hasNoDue] = useMemo(() => {
    return dueDate ? [...readableTimeDiff(dueDate), false] : [null, null, true];
  }, [dueDate]);

  const categoryColor = useMemo(() => CATEGORY_COLORS[category], [category]);

  const formattedBudget = useMemo(
    () => (budget ? formatCurrency(budget.quantity.toNumber()) : null),
    [budget],
  );
  const { data: session } = useSession();
  const canEdit =
    status !== RequestStatus.Completed &&
    (session?.user?.role === 'Admin' || requester?.id === session?.user?.id);

  return (
    <div
      className='bg-grey-background border-l-[10px]'
      style={{
        borderColor: categoryColor,
      }}
    >
      <SquareField
        squares={[{ top: 0, right: 0, color: categoryColor, size: 6 }]}
      />
      <div className='flex flex-col h-full gap-2 p-4 text-left'>
        <div className='space-y-1'>
          <h3
            className='mb-2 mr-12 font-mono text-xl font-bold capitalize break-words md:text-2xl line-clamp-6 md:line-clamp-4'
            title={title}
          >
            {title}
          </h3>
          <div className='flex flex-row justify-start gap-2'>
            <div
              style={{
                borderColor: categoryColor,
              }}
              className='px-2 py-0.5 border-[3px] rounded-xl capitalize my-auto'
            >
              {CATEGORY_LABELS[category]}
            </div>
            <div className='flex flex-row items-center gap-2 my-auto'>
              <FontAwesomeIcon icon={faClock} size='sm' />{' '}
              <div>
                <strong>Posted: </strong>
                {timeSinceCreated ? `${timeSinceCreated} ago` : 'Today'}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 mb-4 line-clamp-5'>{description}</div>
        <ul className='grid content-end flex-grow grid-cols-1 mb-2 lg:grid-cols-2 gap-x-1'>
          <Li
            name='Requestor'
            category={category}
            title={requester.name || undefined}
          >
            {requester.name}
          </Li>
          {'email' in requester && (
            <Li
              className='break-all'
              name='Requestor email'
              category={category}
              title={requester.email || undefined}
            >
              {requester.email}
            </Li>
          )}
          <Li
            title={`${
              hasNoDue
                ? 'Due Date'
                : timeUntilDue
                  ? isDue
                    ? 'Was due'
                    : 'Due in'
                  : 'Due'
            }`}
            name={`${
              hasNoDue
                ? 'Due Date'
                : timeUntilDue
                  ? isDue
                    ? 'Was due'
                    : 'Due in'
                  : 'Due'
            }`}
            category={category}
          >
            {hasNoDue ? 'None' : timeUntilDue}
            {!hasNoDue ? (timeUntilDue ? (isDue ? ' ago' : '') : 'Today') : ''}
          </Li>
          <Li
            name='Organization'
            title={organization || undefined}
            category={category}
          >
            {organization}
          </Li>
          <Li
            name='Compensation'
            title={`${!!budget ? 'Volunteer' : 'Paid'} role`}
            category={category}
          >
            {budget ? `${formattedBudget!} ${budget.type}` : 'Volunteer role'}
          </Li>

          {session?.user?.role === 'Admin' && (
            <>
              {category === PlaygroundRequestCategory.Designer && (
                <>
                  <Li name='Current design exists' category={category}>
                    {designRequestCurrentDesignExists ? 'Yes' : 'No'}
                  </Li>
                  <Li
                    name='Design request type'
                    title={designRequestType ?? ''}
                    category={category}
                  >
                    {designRequestType}
                  </Li>
                </>
              )}
              {category === PlaygroundRequestCategory.Developer && (
                <>
                  <Li name='Website exists' category={category}>
                    {devRequestWebsiteExists ? 'Yes' : 'No'}
                  </Li>
                  <Li
                    name='Concerned website url'
                    title={devRequestWebsiteUrl ?? ''}
                    category={category}
                  >
                    {devRequestWebsiteUrl}
                  </Li>
                </>
              )}
              <Li
                name='Needed volunteers'
                title={`${neededVolunteers ?? '1'}`}
                category={category}
              >
                {`${neededVolunteers ?? '1'}`}
              </Li>
              <Li
                name='Last manually pushed'
                title={timeSinceLastManuallyPushed ?? 'Never'}
                category={category}
              >
                {timeSinceLastManuallyPushed ?? 'Never'}
              </Li>
            </>
          )}
        </ul>
        <div
          className={`${
            canEdit
              ? 'flex flex-row flex-wrap-reverse md:flex-nowrap justify-between gap-5'
              : ''
          }`}
        >
          <DarkButton
            href={{
              pathname: `/${intl.locale}/playground/request/${id}`,
            }}
            className={`text-center text-md flex-grow ${
              canEdit ? 'w-1/2' : ''
            }`}
            disabled={disabled}
          >
            {session?.user?.role === 'Admin' ||
            requester?.id === session?.user?.id
              ? intl.formatMessage({
                  id: 'page.playground.section.requests.request-card.read-more',
                  defaultMessage: 'Read more',
                })
              : intl.formatMessage({
                  id: 'page.playground.section.requests.request-card.read-more-apply',
                  defaultMessage: 'Read more / apply',
                })}
          </DarkButton>
          {canEdit && (
            <GreyButton
              href={{
                pathname: `/${intl.locale}/playground/request/edit/${id}`,
              }}
              className='flex-grow w-1/2 text-md text-center'
              disabled={disabled}
            >
              Edit request
            </GreyButton>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PlaygroundRequestCard;

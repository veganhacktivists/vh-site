import { NextSeo } from 'next-seo';
import React, { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  faLongArrowAltLeft as leftArrow,
  faLongArrowAltRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PlaygroundRequestCategory } from '@prisma/client';
import { FormattedMessage, useIntl } from 'react-intl';

import { useExtendedPagination } from '../../../hooks/useExtendedPagination';

import CustomImage from 'components/decoration/customImage';
import { PlaygroundLandingLayout } from 'components/layout/playground/layout';
import { SectionHeader } from 'components/decoration/textBlocks';
import PlaygroundRequestCard from 'components/layout/playground/requests/requestCard';
import RequestFilters from 'components/layout/playground/requests/filters';
import { DarkButton, LightButton } from 'components/decoration/buttons';
import SquareField from 'components/decoration/squares';
import { pixelHeart } from 'images/separators';
import CustomLink from 'components/decoration/link';
import { api } from 'trpc/react';

import type { RouterInputs } from 'trpc/react';
import type PageWithLayout from 'types/persistentLayout';

const isValidPlaygroundRequestCategoryValue = (
  value: string | string[] | undefined,
): value is PlaygroundRequestCategory[] | PlaygroundRequestCategory => {
  if (value === undefined) {
    return false;
  }
  if (Array.isArray(value)) {
    return value.some((category) => category in PlaygroundRequestCategory);
  }
  return value in PlaygroundRequestCategory;
};

const Playground: PageWithLayout = ({}) => {
  const intl = useIntl();

  const router = useRouter();

  const [filters, setFilters] = useState<
    RouterInputs['playground']['getAllRequests']
  >(() => ({
    categories: isValidPlaygroundRequestCategoryValue(router.query.category)
      ? Array.isArray(router.query.category)
        ? router.query.category
        : [router.query.category]
      : undefined,
    ...(router.query.isPaidRequest && {
      isPaidRequest: router.query.isPaidRequest === 'true',
    }),
    sort: {
      createdAt: 'desc',
    },
  }));
  const params = useMemo(() => {
    const { sort, ...otherFilters } = filters;
    return { sort, ...otherFilters };
  }, [filters]);

  const { data: requests } = api.playground.getAllRequests.useQuery(params);

  const {
    startIndex,
    endIndex,
    setNextPage,
    setPreviousPage,
    increasePageParam,
    decreasePageParam,
    previousEnabled,
    nextEnabled,
  } = useExtendedPagination({
    totalItems: requests?.length,
    initialPageSize: 12,
    initialPage: 0,
  });
  const requestContainer = useRef<HTMLDivElement>(null);
  const scrollUp = () => {
    if (!requestContainer.current) return;

    window.scrollTo({
      top: requestContainer.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const paginatedRequests = useMemo(
    () => requests?.slice(startIndex, endIndex + 1),
    [requests, startIndex, endIndex],
  );

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();

  /**
   * Updates the filters and adds them to the current URL as query strings
   */
  const updateFilterHandler = (
    filters: RouterInputs['playground']['getAllRequests'],
  ) => {
    delete router.query['isPaidRequest'];
    delete router.query['category'];
    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...(filters.categories && {
            category: filters.categories,
          }),
          ...(typeof filters.isPaidRequest === 'boolean' && {
            isPaidRequest: filters.isPaidRequest,
          }),
          ...router.query,
        },
      },
      undefined,
      { shallow: true },
    );
    setFilters(filters);
  };

  return (
    <>
      <NextSeo title='Requests' />
      <div>
        <div className='lg:mx-12 2xl:mx-44 xl:mx-36'>
          <SectionHeader
            header={intl.formatMessage({
              id: 'page.playground.section.open-requests.introduction.headline',
              defaultMessage: 'View pending <b>requests</b>',
            })}
          >
            <FormattedMessage
              id='page.playground.section.open-requests.introduction.content'
              defaultMessage='Check out the requests below to find volunteer or paid opportunities to help the animals. Are you an individual or organization seeking support for your work? <link>Submit a request</link> of your own!'
              values={{
                link: (chunk) => (
                  <CustomLink
                    className='font-bold'
                    href={`/${intl.locale}/playground/submit`}
                  >
                    {chunk}
                  </CustomLink>
                ),
              }}
            />
          </SectionHeader>
        </div>
        <div
          className='mb-20 -mt-10 lg:mx-12 2xl:mx-44 xl:mx-36'
          ref={requestContainer}
        >
          <RequestFilters onChange={updateFilterHandler} filters={filters} />
          <div
            className='grid grid-cols-1 gap-8 mx-5 mt-10 md:grid-cols-2'
            ref={animatedRef}
          >
            {paginatedRequests?.map((request) => (
              <PlaygroundRequestCard key={request.id} request={request} />
            ))}
          </div>
          {requests?.length === 0 ? (
            <div className='mx-auto text-center text-gray-500'>
              <FormattedMessage
                id='page.playground.section.open-requests.no-requests-available'
                defaultMessage='There are no requests matching your criteria'
              />
            </div>
          ) : (
            <div className='flex flex-row justify-center gap-10 p-16 mx-auto'>
              <DarkButton
                className='flex font-mono font-bold uppercase'
                onClick={() => {
                  decreasePageParam();
                  setPreviousPage();
                  setTimeout(() => {
                    scrollUp();
                  }, 1);
                }}
                disabled={!previousEnabled}
              >
                <div>
                  <FontAwesomeIcon icon={leftArrow} size='xs' />
                </div>
                <span className='hidden pl-3 md:block'>
                  <FormattedMessage
                    id='page.playground.section.open-requests.previous-page-button.label'
                    defaultMessage='Previous'
                  />
                </span>
              </DarkButton>
              <DarkButton
                className='font-mono font-bold uppercase'
                onClick={() => {
                  increasePageParam();
                  setNextPage();
                  setTimeout(() => {
                    scrollUp();
                  }, 1);
                }}
                disabled={!nextEnabled}
              >
                <div className='flex'>
                  <span className='hidden pr-3 md:block'>
                    <FormattedMessage
                      id='page.playground.section.open-requests.next-page-button.label'
                      defaultMessage='Next'
                    />
                  </span>
                  <div>
                    <FontAwesomeIcon icon={rightArrow} size='xs' />
                  </div>
                </div>
              </DarkButton>
            </div>
          )}
        </div>
        <SquareField
          className='hidden md:block'
          squares={[
            { bottom: 0, left: 0, color: 'grey', size: 16 },
            { top: 0, right: 0, color: 'white', size: 16 },
            { top: 16, right: 16, color: 'white', size: 16 },
          ]}
        />
        <div className='space-y-5 text-white py-14 bg-grey'>
          <div>
            <div className='w-20 mx-auto'>
              <CustomImage src={pixelHeart} alt='' />
            </div>
            <h2 className='text-2xl font-bold'>
              <FormattedMessage
                id='page.playground.section.get-support.headline'
                defaultMessage='Need support?'
              />
            </h2>
          </div>

          <div className='px-10 pt-4 pb-4 mx-auto text-xl md:w-1/2'>
            <FormattedMessage
              id='page.playground.section.get-support.content'
              defaultMessage='If you are an individual or organization that needs help with your work in helping the animals, you can apply to receive free support from our Playground community.'
            />
          </div>
          <LightButton
            href={`/${intl.locale}/playground/submit`}
            className='mx-auto w-fit'
          >
            <FormattedMessage
              id='page.playground.section.get-support.cta-button.label'
              defaultMessage='Submit your request'
            />
          </LightButton>
        </div>
      </div>
    </>
  );
};

Playground.Layout = PlaygroundLandingLayout;
export default Playground;

import { useCallback, useEffect, useMemo, useState } from 'react';

import { PlaygroundRequestCategory } from '@prisma/client';

import classNames from 'classnames';

import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
} from '../../../../../prisma/constants';

import SelectInput from '../../../forms/inputs/selectInput';

import { isHexDark } from '../../../../lib/helpers/colors';

import { GreyButton } from 'components/decoration/buttons';

import type { trpc } from 'lib/client/trpc';

type Filters = trpc['playground']['getAllRequests']['input'];

type FiltersWithoutSort = Omit<Filters, 'sort'>;
interface RequestFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const FilterBy: React.FC<{
  filters: FiltersWithoutSort;
  onFiltersChange: (filters: Omit<Filters, 'sort'>) => void;
}> = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFilters = useCallback(() => setIsOpen(true), []);

  const [localFilters, setLocalFilters] = useState(filters);

  const numberOfAppliedFilters = useMemo(
    () =>
      (filters.categories?.length || 0) +
      (filters.isFree !== undefined ? 1 : 0),
    [filters.categories?.length, filters.isFree]
  );
  return (
    <div
      onClick={isOpen ? undefined : openFilters}
      className={classNames(
        'px-4 py-2 border border-grey w-fit text-left select-none',
        {
          'cursor-pointer': !isOpen,
        }
      )}
    >
      {!isOpen &&
        (numberOfAppliedFilters === 0
          ? 'All posts'
          : `${numberOfAppliedFilters} filters applied`)}
      {isOpen && (
        <div>
          <div>
            <div className="font-bold mb-2">Category</div>
            <div className="flex flex-row flex-wrap gap-2">
              {Object.keys(PlaygroundRequestCategory).map((category) => {
                const isSelected = localFilters.categories?.includes(
                  category as PlaygroundRequestCategory
                );
                return (
                  <div
                    className={classNames(
                      `px-2 py-1 border cursor-pointer select-none ${
                        isHexDark(
                          CATEGORY_COLORS[category as PlaygroundRequestCategory]
                        ) && isSelected
                          ? 'text-white'
                          : 'text-black'
                      }`
                    )}
                    onClick={() => {
                      if (isSelected) {
                        setLocalFilters((filters) => ({
                          ...filters,
                          categories: filters.categories?.filter(
                            (x) => x !== category
                          ),
                        }));
                      } else {
                        setLocalFilters((filters) => ({
                          ...filters,
                          categories: [
                            ...(filters.categories || []),
                            category as PlaygroundRequestCategory,
                          ],
                        }));
                      }
                    }}
                    style={{
                      borderColor:
                        CATEGORY_COLORS[category as PlaygroundRequestCategory],
                      backgroundColor: `${
                        CATEGORY_COLORS[category as PlaygroundRequestCategory]
                      }${isSelected ? 'cc' : '22'}`,
                    }}
                    key={category}
                  >
                    {CATEGORY_LABELS[category as PlaygroundRequestCategory]}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-bold my-2">Job Type</div>
            <div className="flex flex-row flex-wrap gap-2 ">
              <div
                className={classNames(
                  'px-2 py-1 border cursor-pointer bg-yellow border-yellow',
                  localFilters.isFree === true
                    ? 'bg-opacity-80'
                    : 'bg-opacity-10'
                )}
                onClick={() => {
                  setLocalFilters((filters) => ({
                    ...filters,
                    isFree: filters.isFree !== true ? true : undefined,
                  }));
                }}
              >
                Volunteer
              </div>
              <div
                className={classNames(
                  `px-2 py-1 border cursor-pointer bg-magenta-dark border-magenta-dark ${
                    localFilters.isFree === false ? 'text-white' : 'text-black'
                  }`,
                  localFilters.isFree === false
                    ? 'bg-opacity-80'
                    : 'bg-opacity-10'
                )}
                onClick={() => {
                  setLocalFilters((filters) => ({
                    ...filters,
                    isFree: filters.isFree !== false ? false : undefined,
                  }));
                }}
              >
                Paid
              </div>
            </div>
            <div className="flex flex-col justify-end gap-2 mt-5 sm:flex-row place-items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setLocalFilters({});
                }}
              >
                Clear all
              </div>
              <GreyButton
                onClick={() => {
                  onFiltersChange(localFilters);
                  setIsOpen(false);
                }}
                className="text-lg"
              >
                Apply
              </GreyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface OptionType {
  label: string;
  value: string | number | boolean;
}

const RequestFilters: React.FC<RequestFiltersProps> = ({
  filters,
  onChange,
}) => {
  const onChangeSort = useCallback(
    (name: keyof Required<Filters>['sort'], value: 'asc' | 'desc') => {
      onChange({
        ...filters,
        sort: {
          [name]: value,
        },
      });
    },
    [filters, onChange]
  );
  const [sortOption, setSortOption] = useState({} as OptionType | null);

  const { sort, ...otherFilters } = filters;
  let currentOption;

  const sortNewest = {
    label: 'Newest',
    value: 'newest',
  };
  const sortOldest = {
    label: 'Oldest',
    value: 'oldest',
  };
  const sortHighestPrio = {
    label: 'Highest priority',
    value: 'highest',
  };
  const sortLowestPrio = {
    label: 'Lowest priority',
    value: 'lowest',
  };
  const sortOptions = [sortNewest, sortOldest, sortHighestPrio, sortLowestPrio];
  useEffect(() => {
    if (sort?.createdAt === 'asc' && sort?.dueDate === undefined) {
      setSortOption(sortOldest);
    } else if (sort?.createdAt === 'desc' && sort?.dueDate === undefined) {
      setSortOption(sortNewest);
    } else if (sort?.dueDate === 'asc') {
      setSortOption(sortHighestPrio);
    } else if (sort?.dueDate === 'desc') {
      setSortOption(sortLowestPrio);
    } else {
      setSortOption(sortNewest);
    }
  }, []);

  const changeSortOption = (option: OptionType | null) => {
    let sort:
      | {
          createdAt?: 'asc' | 'desc' | undefined;
          dueDate?: 'asc' | 'desc' | undefined;
        }
      | undefined;
    switch (option?.value) {
      case 'newest':
        sort = { createdAt: 'desc' };
        break;
      case 'oldest':
        sort = { createdAt: 'asc' };
        break;
      case 'highest':
        sort = { dueDate: 'asc' };
        break;
      case 'lowest':
        sort = { dueDate: 'desc' };
        break;
      default:
        sort = { createdAt: 'desc' };
        break;
    }
    onChange({ sort: sort, ...otherFilters });
    setSortOption(option);
  };

  return (
    <div
      className={classNames(
        'flex p-6 justify-between flex-wrap-reverse sm:flex-nowrap gap-3'
      )}
    >
      <div
        className={classNames(
          'flex sm:mb-10 flex-col sm:flex-row w-auto sm:max-w-[70%]'
        )}
      >
        <span
          className={classNames('flex uppercase mr-2 mt-2 whitespace-nowrap')}
        >
          Filter by:
        </span>
        <FilterBy
          filters={otherFilters}
          onFiltersChange={(newFilters) =>
            onChange({ sort: filters.sort, ...newFilters })
          }
        />
      </div>
      <div className={classNames('flex w-[200px] min-w-[200px] sm:flex-row')}>
        <span
          className={classNames('flex uppercase mr-2 mt-2 whitespace-nowrap')}
        >
          Sort by:
        </span>
        <SelectInput
          current={sortOption}
          options={sortOptions}
          onChange={(option) => {
            changeSortOption(option);
          }}
        />
      </div>
    </div>
  );
};

export default RequestFilters;

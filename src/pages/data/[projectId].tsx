import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Label from '../../components/forms/inputs/label';
import SelectInput from '../../components/forms/inputs/selectInput';
import SquareField from '../../components/decoration/squares';
import { trpc } from '../../lib/client/trpc';
import prisma from '../../lib/db/prisma';

import type { OptionType } from '../../components/forms/inputs/selectInput';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type {
  DataDashboardProject,
  DataDashboardData,
  DataDashboardValue,
} from '@prisma/client';
import type { TimeSeriesData } from './charts/timeSeriesLineChart';

const TimeSeriesLineChart = dynamic(
  () => import('./charts/timeSeriesLineChart'),
  {
    ssr: false,
  }
);

/** Type representing a DataDashboardProject filled with data recursively filled with values. */
type FilledDataDashboardProject = DataDashboardProject & {
  data: (DataDashboardData & { values: DataDashboardValue[] })[];
};

/** Interface representing a Range object. */
interface Range {
  begin: Date;
  end: Date;
}

const getRangeLabel = (range: Range) =>
  `${range.begin.toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
  })}-${range.end.toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
  })}`;

// TODO: filter by category
/**
 * Function to get a time series for a line chart
 * @param data {FilledDataDashboardProject} The project from which the data is fetched
 * @param value {string}: The value to consider to build the time series (e.g.: comments; clicks)
 * @param id {string}: The ID of the time series which will even function as the label
 * @param color {string}: The color to represent the time series as a line in the chart
 * @param range {Range}: The range to display the data
 *
 * @return {TimeSeriesData} A complete time series
 */
const getLineChartData = (
  data: FilledDataDashboardProject | undefined,
  value: string,
  id: string,
  color: string,
  range?: Range
): TimeSeriesData => ({
  id,
  color,
  data:
    data?.data
      // Filter out data which has a different category than the given one
      // .filter((d) => d.category === category)
      // Filter out data with no timestamp
      ?.filter((d) => d.timestamp)
      .map((d) => {
        {
          return {
            x: d.timestamp,
            // Set value as 0 if it is missing
            y: d.values.find((d) => d.key === value)?.value ?? '0',
          };
        }
      })
      // Filter the data just in the provided range
      .filter((d) => (range ? d.x >= range.begin && d.x <= range.end : true)) ??
    [],
});

const dataSquares = {
  data: {
    overview: {
      top: [
        { color: 'gray-background', size: 4, right: 0, top: 0 },
        { color: 'gray-background', size: 4, right: 4, top: 4 },
      ],
      bottom: [
        { color: 'gray-background', size: 4, left: 0, bottom: 0 },
        { color: 'gray-background', size: 3, right: 0, bottom: 0 },
      ],
    },
    bottom: [{ color: 'gray-darker', size: 16, left: 0, bottom: 0 }],
  },
};

const DataProject: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projectId,
}) => {
  const router = useRouter();

  const { data: projects } = trpc.data.getDataDashboardProjects.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data } = trpc.data.getDataDashboardProject.useQuery(
    projectId as string,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  // Sort the data by timestamp in an increasing order
  data?.data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

  const [range, setRange] = useState<Range>();
  const [rangeOptions, setRangeOptions] = useState<OptionType<Range>[]>([]);

  const [clicks, setClicks] = useState<TimeSeriesData>(
    getLineChartData(data, 'clicks', 'Clicks', '#DD3E2B', range)
  );
  const [comments, setComments] = useState<TimeSeriesData>(
    getLineChartData(data, 'comments', 'Comments', '#7F3C97', range)
  );

  useEffect(() => {
    setClicks(getLineChartData(data, 'clicks', 'Clicks', '#DD3E2B', range));
    setComments(
      getLineChartData(data, 'comments', 'Comments', '#7F3C97', range)
    );
  }, [range]);

  useEffect(() => {
    if (!data) return;

    const sortedTimestamps = data.data.map((d) => d.timestamp);
    const r = {
      begin: sortedTimestamps[0],
      end: sortedTimestamps[sortedTimestamps.length - 1],
    };
    const r1 = {
      begin: sortedTimestamps[Math.round(sortedTimestamps.length / 4)],
      end: sortedTimestamps[Math.round((sortedTimestamps.length * 3) / 4)],
    };
    const rangeOptions = [
      { value: r, label: getRangeLabel(r) },
      { value: r1, label: getRangeLabel(r1) },
    ];
    setRange(r);
    setRangeOptions(rangeOptions);
  }, [data]);

  const selectProject = async (selectedProject: OptionType<string> | null) => {
    if (selectedProject) {
      await router.replace(`/data/${selectedProject.value}`);
    }
  };

  return (
    <div>
      <div className="flex mx-auto flex-wrap md:flex-nowrap">
        <div
          id="data-options"
          className="flex flex-col w-full md:w-72 lg:w-80 bg-gray-dark p-5 relative"
        >
          <div className="w-full mb-4">
            <Label className="text-white" name="project" />
            <SelectInput
              theme="data"
              name="project"
              current={data ? { label: data.label, value: data.id } : null}
              options={
                projects?.map((p) => ({
                  value: p.id,
                  label: p.label,
                })) ?? []
              }
              onChange={selectProject}
            />
          </div>
          <div className="w-full mb-4">
            <Label className="text-white" name="date-range">
              Date range
            </Label>
            <SelectInput
              theme="data"
              name="date-range"
              optionsEditable
              current={
                range ? { value: range, label: getRangeLabel(range) } : null
              }
              options={rangeOptions ?? []}
              onChange={(option) => {
                if (option) {
                  setRange(option?.value);
                }
              }}
            />
          </div>
          <div className="w-full mb-4">
            <Label className="text-white" name="bot">
              Select bot
            </Label>
            <SelectInput theme="data" name="bot" current={null} options={[]} />
          </div>
          <div className="w-full">
            <p className="mb-2 text-white font-bold text-left block">
              Show / Hide
            </p>
            <div className="checkbox-container mb-3 flex items-center">
              <input
                className={
                  'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
                }
                type="checkbox"
                name="engagement"
              />
              <Label className="text-white mb-0 ml-3" name="engagement">
                User engagement
              </Label>
            </div>
            <div className="checkbox-container mb-3 flex items-center">
              <input
                className={
                  'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
                }
                type="checkbox"
                name="replies"
              />
              <Label className="text-white mb-0 ml-3" name="replies">
                Nº of replies
              </Label>
            </div>
            <div className="checkbox-container flex items-center">
              <input
                className={
                  'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
                }
                type="checkbox"
                name="retweets"
              />
              <Label className="text-white mb-0 ml-3" name="retweets">
                Nº of retweets
              </Label>
            </div>
          </div>
        </div>
        <div id="data" className=" w-full p-5">
          <div id="data-overview" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-blue-dark"
                icon={faChartSimple}
                fixedWidth
              />
              <h1 className="text-left ml-3">Data overview</h1>
            </div>
            <SquareField squares={dataSquares.data.overview.top} />
            <div className="relative bg-white flex-wrap w-full flex p-4">
              <div className="pr-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    125
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">Total replies</p>
              </div>
              <div className="px-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    85
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">Total retweets</p>
              </div>
              <div className="px-4 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    78
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">
                  Average <span className="hidden lg:inline">number of</span>
                  <span className="lg:hidden inline">#</span>&nbsp;likes
                </p>
              </div>
              <div className="pl-4 lg:w-1/4 w-1/2">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    14
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-red-dark rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">New followers</p>
              </div>
            </div>
            <SquareField squares={dataSquares.data.overview.bottom} />
          </div>
          <div id="number-of-retweets" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-orange"
                fixedWidth
              />
              <h1 className="text-left ml-3">Number of Retweets</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-orange h-full w-10" />
              </div>
              <div className="h-[28rem] bg-white">
                <TimeSeriesLineChart
                  data={[clicks, comments]}
                  yLabel="Number of clicks"
                />
              </div>
            </div>
          </div>
          <div id="number-of-replies" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-purple"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">Number of Replies</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-purple h-full w-10" />
              </div>
              <div className="h-[28rem] bg-white">
                <TimeSeriesLineChart
                  data={[clicks]}
                  yLabel="Number of comments"
                />
              </div>
            </div>
          </div>
          <div id="user-engagement-replies" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-yellow"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">User engagement - User replies</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-yellow h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
          <div id="user-engagement-likes" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-green"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">User engagement - Likes</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-green h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
        </div>
      </div>
      <SquareField
        squares={dataSquares.data.bottom}
        className="hidden md:block z-20"
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await prisma.dataDashboardProject.findMany({
    select: {
      id: true,
      label: true,
    },
  });
  return {
    paths: projects.map((project) => ({
      params: {
        projectId: project.id,
        label: project.label,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projectId = context.params?.projectId as string;

  // Prefetch
  await prisma.dataDashboardProject.findMany({
    select: {
      id: true,
      label: true,
    },
  });
  await prisma.dataDashboardProject.findFirst({
    where: {
      id: projectId,
    },
    include: {
      data: {
        include: {
          values: true,
        },
      },
    },
  });

  return {
    props: {
      projectId: projectId,
    },
    revalidate: 10,
  };
};

export default DataProject;

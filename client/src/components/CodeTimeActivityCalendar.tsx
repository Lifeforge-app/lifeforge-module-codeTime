import forgeAPI from '@/utils/forgeAPI'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import {
  EmptyStateScreen,
  Listbox,
  ListboxOption,
  Widget,
  WithQuery
} from 'lifeforge-ui'
import { cloneElement, useState } from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import { Tooltip } from 'react-tooltip'
import { usePersonalization } from 'shared'

const target = forgeAPI['codeTime'].getActivities

function CodeTimeActivityCalendar() {
  const { derivedTheme, derivedThemeColor: themeColor } = usePersonalization()

  const [year, setYear] = useState(new Date().getFullYear())

  const dataQuery = useQuery(
    target
      .input({
        year: year.toString()
      })
      .queryOptions({
        refetchInterval: 60 * 1000
      })
  )

  return (
    <Widget
      className="col-span-full h-min"
      icon="tabler:activity"
      namespace="apps.codeTime"
      title="activitiesCalendar"
    >
      <WithQuery query={dataQuery}>
        {({ data: activities, firstYear }) =>
          activities.length > 0 ? (
            <>
              <Listbox
                buttonContent={<span>{year}</span>}
                className="md:hidden"
                value={year}
                onChange={setYear}
              >
                {Array(new Date().getFullYear() - firstYear + 1)
                  .fill(0)
                  .map((_, index) => (
                    <ListboxOption
                      key={index}
                      label={`${firstYear + index}`}
                      value={firstYear + index}
                    />
                  ))}
              </Listbox>
              <div className="mt-4 flex w-full gap-8">
                <div className="h-60 w-full min-w-0">
                  <ActivityCalendar
                    showWeekdayLabels
                    blockMargin={5}
                    blockSize={16}
                    data={activities}
                    labels={{
                      totalCount: `${
                        Math.floor(
                          activities.reduce((a, b) => a + b.count, 0) / 60
                        ) > 0
                          ? `${Math.floor(
                              activities.reduce((a, b) => a + b.count, 0) / 60
                            )} hours`
                          : ''
                      } ${
                        Math.floor(
                          activities.reduce((a, b) => a + b.count, 0) % 60
                        ) > 0
                          ? `${Math.floor(
                              activities.reduce((a, b) => a + b.count, 0) % 60
                            )} minutes`
                          : ''
                      } ${
                        activities.reduce((a, b) => a + b.count, 0) === 0
                          ? 'no time'
                          : ''
                      } spent on {{year}}`
                    }}
                    maxLevel={6}
                    renderBlock={(block, activity) =>
                      cloneElement(block, {
                        'data-tooltip-id': 'react-tooltip',
                        'data-tooltip-html': `${
                          Math.floor(activity.count / 60) > 0
                            ? `${Math.floor(activity.count / 60)} hours`
                            : ''
                        } ${
                          Math.floor(activity.count % 60) > 0
                            ? `${Math.floor(activity.count % 60)} minutes`
                            : ''
                        } ${activity.count === 0 ? 'no time' : ''} spent on ${
                          activity.date
                        }`.trim()
                      })
                    }
                    theme={{
                      dark: [
                        derivedTheme === 'dark'
                          ? 'rgb(38, 38, 38)'
                          : 'rgb(229, 229, 229)',
                        themeColor
                      ]
                    }}
                  />
                </div>
                <div className="hidden space-y-2 md:block">
                  {Array(new Date().getFullYear() - firstYear + 1)
                    .fill(0)
                    .map((_, index) => (
                      <button
                        key={index}
                        className={clsx(
                          'flex items-start gap-2 rounded-lg p-4 px-8 font-medium sm:px-12',
                          year === firstYear + index
                            ? 'bg-bg-200 text-bg-800 dark:bg-bg-700/50 dark:text-bg-50 font-semibold'
                            : 'text-bg-500 hover:bg-bg-100 dark:hover:bg-bg-700/50'
                        )}
                        onClick={() => {
                          setYear(firstYear + index)
                        }}
                      >
                        <span>{firstYear + index}</span>
                      </button>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <EmptyStateScreen
              icon="tabler:calendar-off"
              message={{
                id: 'activities',
                namespace: 'apps.codeTime'
              }}
            />
          )
        }
      </WithQuery>
      <Tooltip className="z-9999" id="react-tooltip" />
    </Widget>
  )
}

export default CodeTimeActivityCalendar

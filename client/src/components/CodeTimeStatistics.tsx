import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { WithQueryData } from 'lifeforge-ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import HoursAndMinutesFromSeconds from './HoursAndMinutesFromSeconds'

function CodeTimeStatistics() {
  const { t } = useTranslation('apps.codeTime')

  return (
    <WithQueryData controller={forgeAPI['codeTime'].getStatistics}>
      {stats => (
        <div className="space-y-3">
          <div className="flex-between component-bg shadow-custom w-full flex-col gap-6 rounded-lg p-3 pb-6 sm:flex-row sm:p-6">
            <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
              <div className="shadow-custom component-bg-lighter bg-bg-100 flex rounded-lg p-2 sm:p-4">
                <Icon
                  className="text-bg-500 dark:text-bg-50 text-2xl sm:text-3xl"
                  icon="tabler:calendar"
                />
              </div>
              <div className="text-bg-500 whitespace-nowrap text-lg font-medium sm:text-xl">
                {t('statisticType.timeSpentToday')}
              </div>
            </div>
            <div className="text-4xl font-semibold">
              <HoursAndMinutesFromSeconds seconds={stats['Time spent today']} />
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3">
            {Object.entries(stats)
              .slice(0, -1)
              .map(([key, value], index) => (
                <div
                  key={key}
                  className="flex-between shadow-custom component-bg flex w-full flex-col gap-2 rounded-lg p-3 pb-6 sm:items-start sm:p-6"
                >
                  <div className="flex w-full flex-row items-center gap-2 sm:flex-col sm:items-start">
                    <div className="shadow-custom component-bg-lighter bg-bg-100 flex rounded-lg p-2 sm:p-4">
                      <Icon
                        className={clsx(
                          'text-2xl sm:text-3xl',
                          index === 3
                            ? 'text-orange-300'
                            : 'text-bg-500 dark:text-bg-50'
                        )}
                        icon={
                          {
                            'Most time spent': 'tabler:coffee',
                            'Total time spent': 'tabler:clock',
                            'Average time spent': 'tabler:wave-saw-tool',
                            'Longest streak': 'tabler:flame',
                            'Current streak': 'tabler:flame'
                          }[key]!
                        }
                      />
                    </div>
                    <div className="text-bg-500 whitespace-nowrap text-lg">
                      {t(`statisticType.${_.camelCase(key)}`)}
                    </div>
                  </div>
                  <div className="mt-2 whitespace-nowrap text-4xl font-semibold">
                    {index < 3 ? (
                      <HoursAndMinutesFromSeconds seconds={value} />
                    ) : (
                      <>
                        {value}
                        <span className="text-bg-500 pl-1 text-3xl font-normal">
                          {t('units.days')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </WithQueryData>
  )
}

export default CodeTimeStatistics

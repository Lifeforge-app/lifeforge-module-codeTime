import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Card, EmptyStateScreen, Widget, WithQuery } from 'lifeforge-ui'
import { useMemo, useState } from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { usePersonalization } from 'shared'
import tinycolor from 'tinycolor2'

import forgeAPI from '@/utils/forgeAPI'

import IntervalSelector from './IntervalSelector'

dayjs.extend(duration)

function CodeTimeTimeChart({ type }: { type: 'projects' | 'languages' }) {
  const { bgTempPalette, derivedTheme } = usePersonalization()

  const [lastFor, setLastFor] = useState<'7 days' | '30 days'>('7 days')

  const dataQuery = useQuery(
    forgeAPI.getLastXDays
      .input({
        days: lastFor.toString()
      })
      .queryOptions({
        refetchInterval: 60 * 1000
      })
  )

  const chartData = useMemo(() => {
    if (!dataQuery.data || !dataQuery.isSuccess) return []

    const days = dataQuery.data.map(e => dayjs(e.date).format('DD MMM'))

    const allItems = [
      ...new Set(dataQuery.data.flatMap(e => Object.keys(e[type])))
    ].sort()

    return days.map((day, dayIndex) => {
      const dayData: Record<string, any> = { date: day }

      allItems.forEach(item => {
        dayData[item] = dataQuery.data[dayIndex]?.[type]?.[item] || 0
      })

      dayData.total = dataQuery.data[dayIndex]?.total_minutes || 0

      return dayData
    })
  }, [dataQuery.data, dataQuery.isSuccess, type])

  const allItems = useMemo(() => {
    if (!dataQuery.data || !dataQuery.isSuccess) return []

    return [
      ...new Set(dataQuery.data.flatMap(e => Object.keys(e[type])))
    ].sort()
  }, [dataQuery.data, dataQuery.isSuccess, type])

  const CustomTooltip = ({
    active,
    payload,
    label
  }: {
    active?: boolean
    payload?: Array<{
      value: number
      name: string
      dataKey: string
      stroke: string
    }>
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-bg-200 dark:border-bg-700/50 border p-0!">
          <div className="component-bg-lighter p-4">
            <p className="mb-2 font-medium">{label}</p>
            <div className="space-y-1">
              {payload
                .filter(entry => entry.value > 0 && entry.dataKey !== 'total')
                .map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2.5 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: entry.stroke }}
                      />
                      <span className="text-bg-500">{entry.name}</span>
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: entry.stroke }}
                    >
                      {dayjs.duration(entry.value, 'minutes').humanize()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      )
    }

    return null
  }

  return (
    <Widget
      actionComponent={
        <IntervalSelector
          className="hidden md:flex"
          lastFor={lastFor}
          options={['7 days', '30 days']}
          setLastFor={setLastFor}
        />
      }
      icon={
        {
          languages: 'tabler:code',
          projects: 'tabler:clipboard'
        }[type]
      }
      namespace="apps.codeTime"
      title={`${type}TimeGraph`}
    >
      <IntervalSelector
        className="mb-4 flex md:hidden"
        lastFor={lastFor}
        options={['7 days', '30 days']}
        setLastFor={setLastFor}
      />
      <div className="size-full min-h-96">
        <WithQuery query={dataQuery}>
          {data =>
            data.length > 0 ? (
              <ResponsiveContainer height="100%" width="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid
                    stroke={
                      bgTempPalette[derivedTheme === 'dark' ? '800' : '200']
                    }
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="date"
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                    tickFormatter={(value: number) =>
                      `${Math.round(value / 60)}h`
                    }
                    tickLine={false}
                    width={50}
                  />

                  {allItems.map((item, index) => (
                    <Bar
                      key={item}
                      dataKey={item}
                      fill={tinycolor({
                        h: (index * 360) / allItems.length,
                        s: 100,
                        v: 100,
                        a: 0.4
                      }).toRgbString()}
                      name={item}
                      stackId="stack"
                      stroke={tinycolor({
                        h: (index * 360) / allItems.length,
                        s: 100,
                        v: 100,
                        a: 1
                      }).toRgbString()}
                      strokeWidth={1}
                    />
                  ))}
                  <Line
                    dataKey="total"
                    dot={false}
                    legendType="none"
                    name="Total minutes"
                    stroke={
                      derivedTheme === 'dark'
                        ? bgTempPalette[100]
                        : bgTempPalette[500]
                    }
                    strokeWidth={3}
                    type="monotone"
                  />
                  <Legend />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
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
      </div>
    </Widget>
  )
}

export default CodeTimeTimeChart

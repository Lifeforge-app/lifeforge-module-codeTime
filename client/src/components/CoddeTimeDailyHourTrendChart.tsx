import forgeAPI from '@/utils/forgeAPI'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { DashboardItem } from 'lifeforge-ui'
import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { usePersonalization } from 'shared'

function CoddeTimeDailyHourTrendChart() {
  const { derivedThemeColor, bgTempPalette, derivedTheme } =
    usePersonalization()

  const hourlyTrendDataQuery = useQuery(
    forgeAPI.codeTime.getTimeDistribution.queryOptions()
  )

  const currentHour = dayjs().hour()

  const currentTimePlugin = useMemo(
    () => ({
      id: 'currentTimeLine',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      afterDatasetsDraw(chart: any) {
        const { ctx, chartArea, scales } = chart

        if (!chartArea || !scales.x) return

        const xPosition = scales.x.getPixelForValue(currentHour)

        ctx.save()
        ctx.strokeStyle =
          derivedTheme === 'dark' ? bgTempPalette[100] : bgTempPalette[800]
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(xPosition, chartArea.top + 8)
        ctx.lineTo(xPosition, chartArea.bottom)
        ctx.stroke()
        ctx.restore()

        // Draw label
        ctx.save()
        ctx.fillStyle =
          derivedTheme === 'dark' ? bgTempPalette[100] : bgTempPalette[800]
        ctx.font = 'bold 11px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Current Time', xPosition, chartArea.top)
        ctx.restore()
      }
    }),
    [currentHour, derivedThemeColor]
  )

  return (
    <DashboardItem
      className="col-span-full row-span-1"
      icon="tabler:hourglass"
      namespace="apps.codeTime"
      title="Daily Hour Trend"
    >
      {hourlyTrendDataQuery.data && (
        <div className="min-h-96">
          <Chart
            data={{
              labels: Array.from({ length: 24 }, (_, i) => i.toString()),
              datasets: [
                {
                  label: 'Time Spent',
                  data: hourlyTrendDataQuery.data,
                  borderColor: derivedThemeColor,
                  backgroundColor: derivedThemeColor
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: context => {
                      const minutes = context.parsed.y as number

                      return `Time Spent: ${minutes} minutes`
                    },
                    title: tooltipItems => {
                      const hour = +tooltipItems[0].parsed.x!

                      return dayjs()
                        .startOf('day')
                        .add(hour, 'hours')
                        .format('hh:mm A')
                    }
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    stepSize: 1,
                    callback(tickValue) {
                      return `${tickValue}:00`
                    }
                  },
                  title: {
                    display: true,
                    text: 'Hour of the Day'
                  },
                  grid: { drawOnChartArea: false },
                  border: {
                    color:
                      derivedTheme === 'dark'
                        ? bgTempPalette[700]
                        : bgTempPalette[300]
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Time Spent (seconds)'
                  },
                  beginAtZero: true,
                  grid: {
                    color:
                      derivedTheme === 'dark'
                        ? bgTempPalette[700]
                        : bgTempPalette[300]
                  },
                  border: {
                    color:
                      derivedTheme === 'dark'
                        ? bgTempPalette[700]
                        : bgTempPalette[300]
                  }
                }
              }
            }}
            plugins={[currentTimePlugin]}
            type="line"
          />
        </div>
      )}
    </DashboardItem>
  )
}

export default CoddeTimeDailyHourTrendChart

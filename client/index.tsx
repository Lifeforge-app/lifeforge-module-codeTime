import { ContextMenuItem, ModuleHeader } from 'lifeforge-ui'

import CoddeTimeDailyHourTrendChart from './components/CoddeTimeDailyHourTrendChart'
import CodeTimeActivityCalendar from './components/CodeTimeActivityCalendar'
import CodeTimeStatistics from './components/CodeTimeStatistics'
import CodeTimeTimeChart from './components/CodeTimeTimeChart'
import CodeTimeTopEntries from './components/CodeTimeTopEntries'

export default function CodeTime() {
  return (
    <>
      <ModuleHeader
        contextMenuProps={{
          children: (
            <>
              <ContextMenuItem
                icon="tabler:clock"
                label="Manage Schedule"
                onClick={() => {}}
              />
            </>
          )
        }}
      />
      <div className="mb-12 grid min-h-0 w-full grid-cols-1 gap-3 lg:grid-cols-2">
        <CodeTimeStatistics />
        <CodeTimeActivityCalendar />
        {['projects', 'languages'].map(type => (
          <>
            <CodeTimeTimeChart
              key={`${type}-time-chart`}
              type={type as 'projects' | 'languages'}
            />
            <CodeTimeTopEntries
              key={`${type}-top-entries`}
              type={type as 'projects' | 'languages'}
            />
          </>
        ))}
        <CoddeTimeDailyHourTrendChart />
      </div>
    </>
  )
}

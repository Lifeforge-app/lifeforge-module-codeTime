import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Code Time',
  icon: 'tabler:code',
  routes: {
    '/': lazy(() => import('.'))
  },
  category: 'Productivity'
} satisfies ModuleConfig

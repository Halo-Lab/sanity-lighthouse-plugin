import {definePlugin} from 'sanity'
import {ApiIcon} from '@sanity/icons'
import {route} from 'sanity/router'
import {lazy} from 'react'

export const performancePlugin = definePlugin((options) => {
  return {
    name: 'sanity-performance-plugin',
    tools: [
      {
        name: 'performance',
        title: 'Performance',
        icon: ApiIcon,
        component: lazy(() => import('./PerformancePlugin')),
        // options: config,
        router: route.create('/*'),
      },
    ],
  }
})

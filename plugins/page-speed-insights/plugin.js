import {definePlugin} from 'sanity'
import {ApiIcon} from '@sanity/icons'
import {route} from 'sanity/router'
import PageSpeedPlugin from './PageSpeedPlugin'

export const pageSpeedPlugin = definePlugin((options) => {
  return {
    name: 'page-speed-insights',
    tools: [
      {
        name: 'page-speed',
        title: 'Sanity PageSpeed Monitoring',
        icon: ApiIcon,
        component: PageSpeedPlugin,
        route: route.create('/*'),
        options,
      },
    ],
  }
})

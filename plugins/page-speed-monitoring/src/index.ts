import { definePlugin } from 'sanity'
import { ApiIcon } from '@sanity/icons'
import { route } from 'sanity/router'
import PageSpeedPlugin from './PageSpeedPlugin'

interface MyPluginConfig {
  /* nothing here yet */
}

export const pageSpeedMonitoringPlugin = definePlugin<MyPluginConfig | void>((options) => {

  return {
    name: 'sanity-plugin-page-speed-monitoring',
    tools: [
      {
        name: 'sanity-plugin-page-speed-monitoring',
        title: 'Sanity PageSpeed Monitoring',
        icon: ApiIcon,
        component: PageSpeedPlugin,
        route: route.create('/*'),
        options,
      },
    ],
  }
})

import { definePlugin } from 'sanity'
import { ApiIcon } from '@sanity/icons'
import { route } from 'sanity/router'
import PageSpeedPlugin from './PageSpeedPlugin'

interface MyPluginConfig {
  /* nothing here yet */
}

export const pageSpeedPlugin = definePlugin<MyPluginConfig | void>((options) => {
  console.log('hello from sanity-plugin-page-speed-monitoring', options)

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

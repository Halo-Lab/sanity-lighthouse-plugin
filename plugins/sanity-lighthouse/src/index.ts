import { definePlugin } from 'sanity'
import { ApiIcon } from '@sanity/icons'
import { route } from 'sanity/router'
import LighthousePlugin from './LighthousePlugin'

interface MyPluginConfig {
  API_KEY: string
}

export const lighthousePlugin = definePlugin<MyPluginConfig | void>((options) => {

  return {
    name: 'sanity-lighthouse',
    tools: [
      {
        name: 'sanity-lighthouse',
        title: 'Sanity Lighthouse',
        icon: ApiIcon,
        component: LighthousePlugin,
        route: route.create('/*'),
        options,
      },
    ],
  }
})

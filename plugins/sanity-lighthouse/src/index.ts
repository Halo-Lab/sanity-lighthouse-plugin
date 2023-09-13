import {definePlugin} from 'sanity'
import {ApiIcon} from '@sanity/icons'
import {route} from 'sanity/router'
import LighthousePlugin from './LighthousePlugin'

export const lighthousePlugin = definePlugin(() => {
  return {
    name: 'sanity-lighthouse',
    tools: [
      {
        name: 'sanity-lighthouse',
        title: 'Sanity Lighthouse',
        icon: ApiIcon,
        component: LighthousePlugin,
        route: route.create('/*'),
      },
    ],
  }
})

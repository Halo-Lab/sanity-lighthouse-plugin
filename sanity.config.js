import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {theme} from './theme'
import {structure, singletonPlugin} from './plugins/desk'
import {SINGLETON_TYPES_LIST} from './helpers/constants'
import Logo from './components/Logo'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'
import {pageSpeedPlugin} from './plugins/page-speed-insights'

export const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID
export const dataset = import.meta.env.SANITY_STUDIO_DATASET
const API_KEY = import.meta.env.SANITY_STUDIO_PAGE_SPEED_INSIGHTS_API_KEY
export default defineConfig({
  name: 'default',

  title: 'Sanity Performance plugin',
  projectId: projectId,
  dataset: dataset,
  theme,

  plugins: [
    deskTool(structure),
    visionTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
    singletonPlugin(SINGLETON_TYPES_LIST),
    pageSpeedPlugin({API_KEY}),
  ],

  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
})

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure, singletonPlugin} from './plugins/desk'
import {SINGLETON_TYPES_LIST} from './helpers/constants'
import Logo from './components/Logo'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'
import {pageSpeedMonitoringPlugin} from 'sanity-plugin-page-speed-monitoring-test'
// import {pageSpeedMonitoringPlugin} from './plugins/page-speed-monitoring/src'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET
const API_KEY = process.env.SANITY_STUDIO_PAGE_SPEED_INSIGHTS_API_KEY

export default defineConfig({
  name: 'default',

  title: 'Sanity Performance plugin',
  projectId: projectId,
  dataset: dataset,

  plugins: [
    deskTool(structure),
    visionTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
    singletonPlugin(SINGLETON_TYPES_LIST),
    pageSpeedMonitoringPlugin({API_KEY}),
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

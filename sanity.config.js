import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {lighthousePlugin} from 'sanity-lighthouse-plugin'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'

import Logo from './components/Logo'
import {schemaTypes} from './schemas'
import {SINGLETON_TYPES_LIST} from './helpers/constants'
import {structure, singletonPlugin} from './plugins/desk'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

export default defineConfig({
  name: 'default',
  title: 'Sanity Lighthouse plugin',
  projectId: projectId,
  dataset: dataset,

  plugins: [
    deskTool(structure),
    visionTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
    singletonPlugin(SINGLETON_TYPES_LIST),
    lighthousePlugin(),
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

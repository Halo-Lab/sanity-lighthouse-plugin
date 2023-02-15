import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {theme} from './theme'
import {structure, singletonPlugin} from './plugins/desk'
import {SINGLETON_TYPES_LIST} from './helpers/constants'
import Logo from './components/Logo'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'

export default defineConfig({
  name: 'default',

  title: 'Sanity Performance plugin',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  theme,

  plugins: [
    deskTool(structure),
    visionTool(),
    dashboardTool(projectInfoWidget(), projectUsersWidget()),
    singletonPlugin(SINGLETON_TYPES_LIST),
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

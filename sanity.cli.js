import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './sanity.config.js'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})

import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './sanity.config.js'
import {loadEnv} from 'vite'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite: ({mode}) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    console.log(env.APP_ENV)
    return {
      define: {
        __APP_ENV__: env.APP_ENV,
      },
    }
  },
})

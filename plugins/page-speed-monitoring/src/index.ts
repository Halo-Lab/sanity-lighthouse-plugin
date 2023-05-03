import { definePlugin } from 'sanity'

interface MyPluginConfig {
  /* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-page-speed-monitoring'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */
export const pageSpeedMonitoringPlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-page-speed-monitoring')
  return {
    name: 'sanity-plugin-page-speed-monitoring',
  }
})

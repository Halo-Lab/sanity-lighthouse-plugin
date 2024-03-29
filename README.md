# Sanity Lighthouse Plugin (for Sanity Studio v3)

<br />
<img width="350" alt="Sanity Lighthouse logo" src="https://github.com/Halo-Lab/sanity-lighthouse-plugin/assets/342951/fbaf0ace-7553-42af-9735-1226ffd869d3">
<br />
<br />

> This plugin is for Sanity Studio v3 and uses the [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/about) to provide insights into the speed and performance of your website. To use this plugin, you will need to have an API key for the PageSpeed Insights API.

<img width="1295" alt="Sanity Lighthouse in use" src="https://github.com/Halo-Lab/sanity-lighthouse-plugin/assets/342951/4fa7137b-0e35-4370-9f5f-68de77cd99bc">

## Get your credentials here

To use the PageSpeed Insights API, you will need to obtain an API key. You can get your API key by following the instructions provided in the [PageSpeed API documentation](https://developers.google.com/speed/docs/insights/v5/get-started#APIKey).

Additionally, if you use Gmail for your Google account, you may need to generate an app password to use as your API key. Instructions for generating app passwords can be found in [Google's support documentation](https://support.google.com/accounts/answer/185833).

API key allow the Sanity Page Speed plugin to access the PageSpeed Insights API and provide speed and performance insights for your website.

## Installation

> To install this plugin, use the following command:

```sh
npm install sanity-lighthouse-plugin
```

## Usage

> To use this plugin, add it as a plugin in your `sanity.config.ts` (or .js) file, as shown in the example below:

```ts
import {defineConfig} from 'sanity'
import {lighthousePlugin} from 'sanity-lighthouse-plugin'

export default defineConfig({
  // ...
  plugins: [lighthousePlugin()],
})
```

After adding the plugin, you can access it by opening the "Page Speed" tab in the Sanity Studio.
On this page, you'll need to enter the API key you generated (as described above) within the modal window.
After that, you can enter the URL of the page you want to analyze and click "Run Analysis" to get insights into the speed and performance of your website.

## Acknowledgments

This plugin uses the [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/about) by Google to provide insights into website speed and performance.

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

<a href="https://www.halo-lab.com/?utm_source=github">
  <img
    src="https://dgestran.sirv.com/Images/supported-by-halolab.png"
    alt="Supported by Halo lab"
    height="60"
  >
</a>

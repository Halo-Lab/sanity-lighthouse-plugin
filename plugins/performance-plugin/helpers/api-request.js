import axios from 'axios'

const endpoint = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'
// API Key (https://developers.google.com/speed/docs/insights/v5/get-started)
const key = import.meta.env.SANITY_STUDIO_PAGE_SPEED_INSIGHTS_API_KEY ?? ''

export const apiRequest = async (url, device = 'desktop') => {
  const {data} = await axios(`${endpoint}?url=${url}&strategy=${device}&key=${key}`)

  return data
}

import axios from 'axios'
import {formatData} from './formatData'

const endpoint = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'
// API Key (https://developers.google.com/speed/docs/insights/v5/get-started)
const key = import.meta.env.SANITY_STUDIO_PAGE_SPEED_INSIGHTS_API_KEY ?? ''

export const apiRequest = async (url, device = 'desktop', category = 'PERFORMANCE') => {
  const {data} = await axios(
    `${endpoint}?url=${url}&strategy=${device}&key=${key}&category=${category}`
  )

  return data
}

export const apiRequestByDevice = async (url, device = 'desktop', category = 'PERFORMANCE') => {
  const {data} = await axios(
    `${endpoint}?url=${url}&strategy=${device}&key=${key}&category=${category}`
  )
  const formattedData = formatData(data)
  return device === 'desktop' ? formattedData.desktop : formattedData.mobile
}

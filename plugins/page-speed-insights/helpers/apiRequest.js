import axios from 'axios'
import {CATEGORIES, LIST_DEVICES} from './constants'

const endpoint = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'
// API Key (https://developers.google.com/speed/docs/insights/v5/get-started)
const key = process.env.SANITY_STUDIO_PAGE_SPEED_INSIGHTS_API_KEY ?? ''

export const apiRequestByDeviceAllCategories = async (url, device = 'desktop', API_KEY) => {
  const req = CATEGORIES.map((category) => {
    return axios(
      `${endpoint}?url=${url}&strategy=${device}&key=${
        API_KEY ? API_KEY : key
      }&category=${category}`
    )
  })
  return Promise.all(req)
}

export const apiReqByAllDevice = async (url, forDesktop, forMobile, API_KEY) => {
  let reqDesktop = [],
    reqMobile = []
  if (forMobile) {
    reqMobile = await apiRequestByDeviceAllCategories(url, LIST_DEVICES.mobile, API_KEY)
  }
  if (forDesktop) {
    reqDesktop = await apiRequestByDeviceAllCategories(url, LIST_DEVICES.desktop, API_KEY)
  }

  return [...reqDesktop, ...reqMobile]
}

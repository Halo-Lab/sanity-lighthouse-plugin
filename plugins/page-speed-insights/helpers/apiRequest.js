import axios from 'axios'
import {CATEGORIES, LIST_DEVICES} from './constants'

const endpoint = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'
// API Key (https://developers.google.com/speed/docs/insights/v5/get-started)
const key = import.meta.env.SANITY_STUDIO_PAGE_SPEED_INSIGHTS_API_KEY ?? ''

export const apiRequestByDeviceAllCategories = async (url, device = 'desktop') => {
  const req = CATEGORIES.map((category) => {
    return axios(`${endpoint}?url=${url}&strategy=${device}&key=${key}&category=${category}`)
  })
  return Promise.all(req)
}

export const apiReqByAllDevice = async (url, forDesktop, forMobile) => {
  let reqDesktop = [],
    reqMobile = []
  if (forMobile) {
    reqMobile = await apiRequestByDeviceAllCategories(url, LIST_DEVICES.mobile)
  }
  if (forDesktop) {
    reqDesktop = await apiRequestByDeviceAllCategories(url, LIST_DEVICES.desktop)
  }

  return [...reqDesktop, ...reqMobile]
}

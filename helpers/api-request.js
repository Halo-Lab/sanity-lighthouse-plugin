import axios from 'axios'

const endpoint = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'
const key = import.meta.env.PAGE_SPEED_INSIGHTS_API_KEY ?? '' // API Key (https://developers.google.com/speed/docs/insights/v5/get-started)

export const apiRequest = async (url, device = 'desktop') => {
  const {data} = await axios(`${endpoint}?url=${url}&strategy=${device}&key=${key}`)

  return data
}

function showLighthouseContent(lighthouseMetrics) {
  const lighthouseHeader = document.createElement('h2')
  lighthouseHeader.textContent = 'Lighthouse Results'
  document.body.appendChild(lighthouseHeader)
  for (let key in lighthouseMetrics) {
    const p = document.createElement('p')
    p.textContent = `${key}: ${lighthouseMetrics[key]}`
    document.body.appendChild(p)
  }
}

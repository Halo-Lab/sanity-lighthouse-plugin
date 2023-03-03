import {METRICS_LINK_LIST, METRICS_LIST, METRICS_TITLE_LIST} from './constants'

export const formatData = (data) => {
  const {
    id,
    loadingExperience: {metrics},
    lighthouseResult: {
      categories,
      audits,
      configSettings: {formFactor},
    },
    analysisUTCTimestamp,
  } = data
  let mobile = [],
    desktop = []

  const mainInfo = {
    linkReq: id,
    date: formatDate(analysisUTCTimestamp),
    device: formFactor,
  }

  const performanceMetricsId = categories?.performance?.auditRefs.reduce((acc, {id, weight}) => {
    if (weight > 0) {
      acc.push(id)
    }
    return acc
  }, [])

  const performance = {
    title: categories?.performance.title ?? '',
    score: categories?.performance.score * 100 ?? '',
    categories: Object.entries(audits).reduce((acc, item) => {
      if (performanceMetricsId.includes(item[0])) {
        acc.push({
          name: item[1].title,
          value: item[1].displayValue ? item[1].displayValue : item[1].score,
        })
      }
      return acc
    }, []),
  }
  if (formFactor === 'mobile') {
    mobile.unshift({core: createObjMetrics(metrics), performance})
  } else {
    desktop.unshift({core: createObjMetrics(metrics), performance})
  }
  return {mainInfo: mainInfo, desktop, mobile}
}

const formatDate = (data) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const newDate = new Date(data).toLocaleDateString('en-EN', options)
  return newDate
}

const createObjMetrics = (metrics) => {
  const newMetrics = Object.entries(metrics).filter((item) => METRICS_LIST.includes(item[0]))
  const result = newMetrics.map((item, idx) => {
    const indexMetric = METRICS_LIST.indexOf(item[0])
    let formattedValue

    if (item[0] === METRICS_LIST[5] || item[0] === METRICS_LIST[3] || item[0] === METRICS_LIST[2]) {
      formattedValue = `${roundNumber(item[1].percentile / 1000)} s`
    } else if (item[0] === METRICS_LIST[0]) {
      formattedValue = `${item[1].percentile / 100}`
    } else if (item[0] === METRICS_LIST[1] || item[0] === METRICS_LIST[4]) {
      formattedValue = `${item[1].percentile} ms`
    }

    return {
      name: METRICS_TITLE_LIST[indexMetric],
      value: formattedValue,
      link: METRICS_LINK_LIST[indexMetric],
      distributions: [
        {
          value: roundNumberToInt(item[1].distributions[0].proportion),
          name: 'Good',
        },
        {
          value: roundNumberToInt(item[1].distributions[1].proportion),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(item[1].distributions[2].proportion),
          name: 'Poor',
        },
      ],
    }
  })
  return result
}

const roundNumber = (num) => Math.round(num * 10) / 10

const roundNumberToInt = (num) => Math.round(num * 100)

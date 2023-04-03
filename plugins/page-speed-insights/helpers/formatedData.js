import {getMonthByIdx} from './functions'

export const formatData = (data) => {
  const {
    id,
    lighthouseResult: {
      configSettings: {formFactor},
    },
    analysisUTCTimestamp,
  } = data

  const mainInfo = {
    linkReq: id,
    date: formatDate(analysisUTCTimestamp),
    device: formFactor,
  }

  return {mainInfo}
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

export const formatDataList = (dataList) => {
  const mainInfo = formatData(dataList[0].data).mainInfo
  const result = dataList.map((value) => formatMetrics(value.data))
  let mob = []
  let desk = []
  if (result[0]?.mobile?.length) {
    mob.push([
      mainInfo.date,
      ...result.map((it) => it.mobile[0].score),
      getMonthByIdx(new Date(mainInfo.date).getMonth()),
    ])
  } else {
    desk.push([
      mainInfo.date,
      ...result.map((it) => it.desktop[0].score),
      getMonthByIdx(new Date(mainInfo.date).getMonth()),
    ])
  }

  const history = {mobile: mob, desktop: desk}
  return {mainInfo, categoryList: result, history}
}

const formatMetrics = (data) => {
  const {
    lighthouseResult: {
      categories,
      audits,
      configSettings: {formFactor},
    },
  } = data

  let mobile = [],
    desktop = []
  const typeCategory = Object.keys(categories)[0]

  const performanceMetricsId = categories[`${typeCategory}`].auditRefs.reduce(
    (acc, {id, weight}) => {
      if (weight > 0) {
        acc.push(id)
      }
      return acc
    },
    []
  )

  const performance = {
    title: categories[`${typeCategory}`].title ?? '',
    score: categories[`${typeCategory}`].score * 100 ?? '',
    categories: Object.entries(audits).reduce((acc, item) => {
      if (performanceMetricsId.includes(item[0])) {
        acc.push({
          name: item[1].title,
          value: item[1].displayValue ? item[1].displayValue : item[1].score,
          description: item[1].description,
        })
      }
      return acc
    }, []),
  }
  if (formFactor === 'mobile') {
    mobile.unshift({...performance})
  } else {
    desktop.unshift({...performance})
  }
  return {desktop, mobile}
}

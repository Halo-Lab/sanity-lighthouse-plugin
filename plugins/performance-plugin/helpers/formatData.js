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
  console.log(data)
  const mainInfo = {
    linkReq: id,
    date: formatDate(analysisUTCTimestamp),
    device: formFactor,
  }

  const coreWebVitalsAssessment = [
    {
      name: 'Largest Contentful Paint (LCP)',
      value: `${roundNumber(metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000)} s`,
      link: 'https://web.dev/lcp/',
      distributions: [
        {
          value: roundNumberToInt(metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[0].proportion),
          name: 'Good',
        },
        {
          value: roundNumberToInt(metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[1].proportion),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[2].proportion),
          name: 'Poor',
        },
      ],
    },
    {
      name: 'First Input Delay (FID)',
      value: `${metrics.FIRST_INPUT_DELAY_MS.percentile} ms`,
      link: 'https://web.dev/fid/',
      distributions: [
        {
          value: roundNumberToInt(metrics.FIRST_INPUT_DELAY_MS.distributions[0].proportion),
          name: 'Good',
        },
        {
          value: roundNumberToInt(metrics.FIRST_INPUT_DELAY_MS.distributions[1].proportion),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(metrics.FIRST_INPUT_DELAY_MS.distributions[2].proportion),
          name: 'Poor',
        },
      ],
    },
    {
      name: 'Cumulative Layout Shift (CLS)',
      value: `${metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100}`,
      link: 'https://web.dev/cls/',
      distributions: [
        {
          value: roundNumberToInt(
            metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[0].proportion
          ),
          name: 'Good',
        },
        {
          value: roundNumberToInt(
            metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[1].proportion
          ),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(
            metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[2].proportion
          ),
          name: 'Poor',
        },
      ],
    },
    {
      name: 'First Contentful Paint (FCP)',
      value: `${roundNumber(metrics.FIRST_CONTENTFUL_PAINT_MS.percentile / 1000)} s`,
      link: 'https://web.dev/fcp/',
      distributions: [
        {
          value: roundNumberToInt(metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[0].proportion),
          name: 'Good',
        },
        {
          value: roundNumberToInt(metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[1].proportion),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[2].proportion),
          name: 'Poor',
        },
      ],
    },
    {
      name: 'Interaction to Next Paint (INP)',
      value: `${metrics.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.percentile} ms`,
      link: 'https://web.dev/inp/',
      distributions: [
        {
          value: roundNumberToInt(
            metrics.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.distributions[0].proportion
          ),
          name: 'Good',
        },
        {
          value: roundNumberToInt(
            metrics.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.distributions[1].proportion
          ),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(
            metrics.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.distributions[2].proportion
          ),
          name: 'Poor',
        },
      ],
    },
    {
      name: 'Time to First Byte (TTFB)',
      value: `${roundNumber(metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile / 1000)} s`,
      link: 'https://web.dev/ttfb/',
      distributions: [
        {
          value: roundNumberToInt(
            metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[0].proportion
          ),
          name: 'Good',
        },
        {
          value: roundNumberToInt(
            metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[1].proportion
          ),
          name: 'Needs Improvement',
        },
        {
          value: roundNumberToInt(
            metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[2].proportion
          ),
          name: 'Poor',
        },
      ],
    },
  ]
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
  return {core: coreWebVitalsAssessment, mainInfo: mainInfo, performance}
}

const roundNumber = (num) => Math.round(num * 10) / 10
const roundNumberToInt = (num) => Math.round(num * 100)
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

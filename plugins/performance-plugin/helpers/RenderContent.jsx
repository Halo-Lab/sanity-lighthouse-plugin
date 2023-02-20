import React from 'react'

export const showInitialContent = (id) => {
  return (
    <div>
      <h2>
        Page tested:{' '}
        <a href={`${{id}}`} target="_blank" rel="noreferrer">
          {id}
        </a>
      </h2>
    </div>
  )
}

export const showLighthouseContent = (lighthouseMetrics) => {
  const resultList = []
  for (let key in lighthouseMetrics) {
    resultList.push(
      <p>
        {key}: {lighthouseMetrics[key]}
      </p>
    )
  }
  return (
    <>
      <h2>Lighthouse Results</h2>
      <div>{...resultList}</div>
    </>
  )
}

export const parseDate = (data) => {
  const {lighthouseResult, id} = data
  // console.log(lighthouseResult.audits)
  const lighthouseMetrics = {
    'First Contentful Paint': lighthouseResult.audits['first-contentful-paint'].displayValue,
    'Speed Index': lighthouseResult.audits['speed-index'].displayValue,
    'Time To Interactive': lighthouseResult.audits['interactive'].displayValue,
    'First Meaningful Paint':
      lighthouseResult?.audits['first-meaningful-paint']?.displayValue ?? '',
    'First CPU Idle': lighthouseResult?.audits['first-cpu-idle']?.displayValue ?? '',
    'Estimated Input Latency':
      lighthouseResult?.audits['estimated-input-latency']?.displayValue ?? '',
  }
  return (
    <div>
      {showInitialContent(id)}
      {showLighthouseContent(lighthouseMetrics)}
    </div>
  )
}

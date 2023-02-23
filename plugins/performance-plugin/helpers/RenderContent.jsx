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

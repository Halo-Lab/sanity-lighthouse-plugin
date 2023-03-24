import React from 'react'
import {Chart} from 'react-google-charts'
import {CATEGORIES} from '../../helpers/constants'

const ComboChartComponent = ({history}) => {
  const options = {
    title: 'History Requests',
    vAxis: {title: 'Score'},
    hAxis: {title: 'Date'},
    seriesType: 'bars',
    series: {5: {type: 'line'}},
  }
  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={[['Month', ...CATEGORIES], ...history]}
      options={options}
    />
  )
}

export default ComboChartComponent

import React from 'react'
import {Chart} from 'react-google-charts'
import {CATEGORIES} from '../../helpers/constants'
import {CustomSpinner} from './CustomSpinner'

const ComboChartComponent = ({history}) => {
  const options = {
    title: 'History Requests',
    vAxis: {title: 'Score'},
    hAxis: {title: 'Date'},
    textPosition: 'in',
    seriesType: 'bars',
    minValue: 0,
    height: '100%',
    width: '100%',
    chartArea: {left: 50, top: 60, bottom: 30, width: '100%', height: '100%'},
    legend: {position: 'top', textStyle: {color: 'gray', fontSize: 16}},
    // series: {5: {type: 'line'}},
    backgroundColor: 'transparent',
  }
  return (
    <Chart
      chartType="ComboChart"
      data={[['Date', ...CATEGORIES], ...history]}
      options={options}
      loader={<CustomSpinner />}
    />
  )
}

export default ComboChartComponent

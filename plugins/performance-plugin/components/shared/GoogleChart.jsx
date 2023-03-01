import React from 'react'
import {Chart} from 'react-google-charts'

export const GoogleChart = ({
  data = [],
  options = {},
  width = '100%',
  height = '200px',
  chartType = 'PieChart',
}) => {
  return <Chart chartType={chartType} data={data} options={options} width={width} height={height} />
}

import React from 'react'
import {PieChart} from 'react-minimal-pie-chart'

export const COLORS = ['#0cce6a', '#ffa400', '#ff4e43']

const PieChartComponent = ({title, score}) => {
  const colorChart =
    score <= 100 ? (score < 90 ? (score >= 50 ? COLORS[1] : COLORS[2]) : COLORS[0]) : COLORS[0]
  return (
    <div style={{width: '150px'}}>
      <PieChart
        data={[{title: title, value: score, color: `${colorChart}`}]}
        lineWidth={40}
        totalValue={100}
        labelPosition={0}
        // label={({dataEntry}) => `${Math.round(dataEntry.percentage)}%`}
        label={({dataEntry}) => `${Math.round(dataEntry.percentage)}`}
        labelStyle={{
          fontSize: '25px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          fill: `${colorChart}`,
        }}
      />
    </div>
  )
}

export default PieChartComponent

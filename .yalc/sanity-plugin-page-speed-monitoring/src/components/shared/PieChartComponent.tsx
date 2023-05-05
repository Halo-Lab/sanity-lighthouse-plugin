import React from 'react'
import {PieChart} from 'react-minimal-pie-chart'
import {COLORS, BG_COLORS} from '../../helpers/constants'

const PieChartComponent = ({title, score}: any) => {
  const colorChart =
    score <= 100 ? (score < 90 ? (score >= 50 ? COLORS[1] : COLORS[2]) : COLORS[0]) : COLORS[0]
  const colorChartBg =
    score <= 100
      ? score < 90
        ? score >= 50
          ? BG_COLORS[1]
          : BG_COLORS[2]
        : BG_COLORS[0]
      : BG_COLORS[0]

  return (
    <div style={{width: '140px'}}>
      <PieChart
        data={[{title: title, value: score, color: `${colorChart}`}]}
        lineWidth={10}
        totalValue={100}
        labelPosition={0}
        label={({dataEntry}) => `${Math.round(dataEntry.percentage)}`}
        labelStyle={{
          fontSize: '25px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          fill: `${colorChart}`,
        }}
        rounded
        style={{borderRadius: '50%', backgroundColor: `${colorChartBg}`}}
      />
    </div>
  )
}

export default PieChartComponent

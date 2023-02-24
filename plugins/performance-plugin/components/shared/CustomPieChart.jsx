import React from 'react'
import {PieChart, Pie, Cell} from 'recharts'

export const COLORS = ['#0cce6a', '#ffa400', '#ff4e43']

export const CustomPieChart = ({data = [], width = 150, height = 150, value = false}) => (
  <PieChart width={width} height={height}>
    <Pie
      data={data}
      cx={75}
      cy={75}
      innerRadius={40}
      outerRadius={70}
      fill="#8884d8"
      paddingAngle={2}
      dataKey="value"
      isAnimationActive={false}
      focusable={false}
      value={value}
    >
      {data.map((entry, index) => (
        <Cell focusable={false} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
)

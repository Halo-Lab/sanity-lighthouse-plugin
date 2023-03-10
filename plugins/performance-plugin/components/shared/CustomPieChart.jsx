import React, {useCallback, useState} from 'react'
import {PieChart, Pie, Cell} from 'recharts'

export const COLORS = ['#0cce6a', '#ffa400', '#ff4e43']

export const CustomPieChart = ({data = [], width = 150, height = 150, value = false}) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={150}
        cy={100}
        innerRadius={50}
        outerRadius={90}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
        value={value}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

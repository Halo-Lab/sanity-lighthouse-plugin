import React, {useCallback, useState} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import {CATEGORIES} from '../../helpers/constants'
import {filterDates, random_rgba} from '../../helpers/functions'
import {DatePickerComponentMemo} from './DatePickerComponent'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ChartComponent = ({history}) => {
  const [value, onChange] = useState(null)
  const labelList = Boolean(history?.length) ? [...history.map((dateReq) => dateReq[0])] : []
  const dataSetList = Boolean(history?.length)
    ? [
        ...CATEGORIES.map((category, idx) => {
          return {
            label: category,
            data: [...history.map((it) => it[idx + 1])],
            backgroundColor: random_rgba(),
          }
        }),
      ]
    : []

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Request History',
      },
    },
  }
  const renderDatePickerComponent = useCallback(() => {
    return <DatePickerComponentMemo value={value} onChange={onChange} />
  }, [value])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        he: '100%',
      }}
    >
      {renderDatePickerComponent()}
      <Bar
        options={options}
        data={{
          labels: value ? filterDates(labelList, value[0], value[1]) : labelList,
          datasets: dataSetList,
        }}
      />
    </div>
  )
}

export const ChartComponentMemo = React.memo(ChartComponent)

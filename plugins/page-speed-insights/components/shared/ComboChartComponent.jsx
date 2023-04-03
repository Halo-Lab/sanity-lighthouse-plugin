import React from 'react'
import {Chart} from 'react-google-charts'
import {CATEGORIES} from '../../helpers/constants'
// const testHistory = [
//   [new Date('4/3/2023, 11:52 AM'), 56.00000000000001, 88, 92, 83, 70, 'April'],
//   [new Date(2023, 3, 13), 55.00000000000001, 88, 92, 83, 70, 'April'],
//   [new Date(2022, 3, 13), 57.99999999999999, 88, 92, 83, 70, 'April'],
//   [new Date(2021, 3, 13), 56.00000000000001, 88, 92, 83, 70, 'May'],
//   [new Date(2023, 3, 13), 55.00000000000001, 88, 92, 83, 70, 'May'],
//   [new Date(2023, 3, 13), 57.99999999999999, 88, 92, 83, 70, 'May'],
//   [new Date(2023, 3, 13), 56.00000000000001, 88, 92, 83, 70, 'March'],
//   [new Date(2023, 3, 13), 55.00000000000001, 88, 92, 83, 70, 'March'],
//   [new Date(2023, 3, 13), 57.99999999999999, 88, 92, 83, 70, 'March'],
// ]
const ComboChartComponent = ({history}) => {
  const options = {
    title: 'History Requests',
    vAxis: {title: 'Score', minValue: 0, maxValue: 100},
    hAxis: {title: 'Date'},
    animation: {
      duration: 1000,
      easing: 'in',
    },
    // textPosition: 'in',
    seriesType: 'bars',
    minValue: 0,
    height: '90%',
    width: '100%',
    chartArea: {left: 50, top: 60, bottom: 50, width: '100%', height: '100%'},
    // legend: {position: 'bottom', textStyle: {color: 'gray', fontSize: 16}},
    // legend: 'none',
    series: {5: {type: 'line'}},
    backgroundColor: 'transparent',
    selectionMode: 'multiple',
  }

  const columns = [
    {type: 'date', id: 'Date'},
    ...CATEGORIES.map((item) => ({type: 'number', id: item})),
    {type: 'number', id: 'month'},
  ]

  const data = [
    columns,
    ...history.map((item) => {
      item[0] = new Date(item[0])
      return item
    }),
    // ...testHistory,
  ]

  const showControls = new Set(history.map((item) => item[6])).size

  return (
    <>
      <Chart
        chartType="ComboChart"
        data={data}
        options={options}
        chartPackages={['corechart', 'controls']}
        controls={
          showControls > 1
            ? [
                // {
                //   controlEvents: [
                //     {
                //       eventName: 'statechange',
                //       callback: ({chartWrapper, controlWrapper}) => {
                //         // console.log('State changed to', controlWrapper?.getState())
                //       },
                //     },
                //   ],
                //   controlType: 'CategoryFilter',
                //   options: {
                //     filterColumnIndex: 6,
                //     ui: {
                //       labelStacking: 'vertical',
                //       // label: 'Filter by date',
                //       allowTyping: false,
                //       allowMultiple: true,
                //       caption: 'Choose a month',
                //     },
                //   },
                // },
                {
                  controlType: 'DateRangeFilter',
                  options: {
                    // filterColumnLabel: 'Date',
                    filterColumnIndex: 0,
                    ui: {labelStacking: 'vertical'},
                  },
                },
              ]
            : undefined
        }
      />
    </>
  )
}

export default ComboChartComponent

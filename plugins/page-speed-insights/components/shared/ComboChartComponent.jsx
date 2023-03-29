import React from 'react'
import {Chart} from 'react-google-charts'
import {CATEGORIES} from '../../helpers/constants'

const ComboChartComponent = ({history}) => {
  const options = {
    title: 'History Requests',
    vAxis: {title: 'Score', minValue: 0, maxValue: 100},
    hAxis: {title: 'Date'},
    // animation: {
    //   duration: 1000,
    //   easing: 'in',
    // },
    // textPosition: 'in',
    seriesType: 'bars',
    minValue: 0,
    height: '90%',
    width: '100%',
    chartArea: {left: 50, top: 60, bottom: 50, width: '100%', height: '100%'},
    // legend: {position: 'bottom', textStyle: {color: 'gray', fontSize: 16}},
    // legend: 'none',
    // series: {5: {type: 'line'}},
    backgroundColor: 'transparent',
  }

  // const newHistory = [...history, ...history, ...history]

  return (
    <>
      <Chart
        chartType="ComboChart"
        data={[['Date', ...CATEGORIES], ...history]}
        options={options}
        chartPackages={['corechart', 'controls']}
        controls={[
          {
            controlEvents: [
              {
                eventName: 'statechange',
                callback: ({chartWrapper, controlWrapper}) => {
                  console.log('State changed to', controlWrapper?.getState())
                },
              },
            ],
            controlType: 'CategoryFilter',
            options: {
              filterColumnIndex: 0,
              ui: {
                labelStacking: 'vertical',
                label: 'Filter by date',
                allowTyping: false,
                allowMultiple: false,
              },
            },
          },
        ]}
      />
    </>
  )
}

export default ComboChartComponent

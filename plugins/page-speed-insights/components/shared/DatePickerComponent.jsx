import React from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'
import {formatDate} from '../../helpers/formatedData'

const Container = styled.div`
  display: flex;
  margin: 0px 0px auto;
`

export const DatePickerComponent = ({value, onChange, markDateList}) => {
  return (
    <Container>
      <DateRangePicker
        onChange={onChange}
        value={value}
        tileClassName={({date, view}) => {
          if (markDateList.find((x) => x === formatDate(date).split(',')[0])) {
            return 'highlight'
          }
        }}
        clearIcon={value ? undefined : null}
      />
    </Container>
  )
}

export const DatePickerComponentMemo = React.memo(DatePickerComponent)

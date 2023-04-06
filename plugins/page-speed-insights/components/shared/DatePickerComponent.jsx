import React from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: 20px 20px 0px auto;
`
export const DatePickerComponent = ({value, onChange}) => {
  return (
    <Container>
      <DateRangePicker onChange={onChange} value={value} />
    </Container>
  )
}

export const DatePickerComponentMemo = React.memo(DatePickerComponent)

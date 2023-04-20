import React from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'
import {formatDate} from '../../helpers/formatedData'
import {CalendarIcon} from '../../asset/CalendarIcon'

const Container = styled.div`
  display: flex;
  margin: 0px 0px auto;
`

const modifiersStyles = {
  active: {
    backgroundColor: 'red',
  },
};

export const DatePickerComponent = ({value, onChange, markDateList}) => {
  return (
    <Container>
      <DateRangePicker
        onChange={onChange}
        value={value}
        tileClassName={({date, view}) => {
          const classesList = []
          if(Boolean(value?.length) && value.find(x=> formatDate(x).split(',')[0] === formatDate(date).split(',')[0])){
            classesList.push('highlightFirstAndLast')
          }
          if (markDateList.find((x) => x === formatDate(date).split(',')[0])) {
            classesList.push('highlight')
          }
          
          return classesList.push('titleStyle')
        }}
        calendarClassName={'calendar'}
        clearIcon={value ? undefined : null}
        calendarIcon={CalendarIcon}
        className={'calendarContainer'}
        modifiersStyles={modifiersStyles}
      />
    </Container>
  )
}

export const DatePickerComponentMemo = React.memo(DatePickerComponent)

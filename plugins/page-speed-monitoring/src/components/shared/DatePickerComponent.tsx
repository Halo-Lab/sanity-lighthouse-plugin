import {memo} from 'react'
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

export const DatePickerComponent = ({value, onChange, markDateList}: any) => {
  return (
    <Container>
      <DateRangePicker
        onChange={onChange}
        value={value}
        tileClassName={({date, view}: any) => {
          const classesList = []

          if (markDateList.find((x: any) => x === formatDate(date).split(',')[0])) {
            classesList.push('doted')
          }
          classesList.push('titleStyle')
          return classesList
        }}
        calendarClassName={'calendar'}
        clearIcon={value ? undefined : null}
        calendarIcon={CalendarIcon}
        className={'calendarContainer'}
      />
    </Container>
  )
}

export const DatePickerComponentMemo = memo(DatePickerComponent)

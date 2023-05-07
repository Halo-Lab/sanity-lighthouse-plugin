import {memo} from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {formatDate} from '../../helpers/formatedData'
import {CalendarIcon} from '../../asset/CalendarIcon'
import DatePickerContainer from '../../styles/DatePickerContainer'

export const DatePickerComponent = ({value, onChange, markDateList}: any) => {
  return (
    <DatePickerContainer>
      <DateRangePicker
        onChange={onChange}
        value={value}
        tileClassName={({date}: any) => {
          const classesList: any = []

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
    </DatePickerContainer>
  )
}

export const DatePickerComponentMemo = memo(DatePickerComponent)

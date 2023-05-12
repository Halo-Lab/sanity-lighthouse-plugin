import {memo, Dispatch, SetStateAction} from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {formatDate} from '../../helpers/formatedData'
import {CalendarIcon} from '../../assets/icons/CalendarIcon'
import DatePickerContainer from '../../styles/DatePickerContainer'

type DatePickerPropsType = {
  value: Date | null
  onChange: Dispatch<SetStateAction<Date | null>> | any
  markDateList: string[]
}

export const DatePickerComponent = ({value, onChange, markDateList}: DatePickerPropsType) => {
  return (
    <DatePickerContainer>
      <DateRangePicker
        onChange={onChange}
        value={value}
        tileClassName={({date}: {date: Date}) => {
          const classesList: string[] = []

          if (markDateList.find((x: string) => x === formatDate(date).split(',')[0])) {
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

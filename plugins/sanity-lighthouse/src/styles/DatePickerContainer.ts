import styled from 'styled-components'

const DatePickerContainer = styled.div`
  display: flex;
  margin: 0px 0px auto;

  .react-daterange-picker {
    display: inline-flex;
    position: relative;
  }

  .react-daterange-picker,
  .react-daterange-picker *,
  .react-daterange-picker *:before,
  .react-daterange-picker *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-daterange-picker--disabled {
    background-color: #f0f0f0;
    color: #6d6d6d;
  }

  .react-daterange-picker__wrapper {
    padding: 10px;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-start;

    border-radius: 4px;
    outline: unset;
    border: 1px solid #c9c9c9;
    color: #888888;
    cursor: pointer;

    &:active,
    :hover,
    :focus {
      border: 1px solid #3f3f3f;
    }
  }

  .react-daterange-picker__inputGroup {
    width: fit-content;
    height: 100%;
    flex-grow: 1;
    padding: 0 2px;
    box-sizing: content-box;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #3f3f3f;
  }

  .react-daterange-picker__inputGroup__divider {
    padding: 2px 0;
    white-space: pre;
  }

  .react-daterange-picker__inputGroup__divider,
  .react-daterange-picker__inputGroup__leadingZero {
    display: inline-block;
  }

  .react-daterange-picker__inputGroup__input {
    height: 100%;
    position: relative;
    border: 0;
    background: none;
    box-sizing: content-box;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .react-daterange-picker__inputGroup__input::-webkit-outer-spin-button,
  .react-daterange-picker__inputGroup__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  .react-daterange-picker__inputGroup__input:invalid {
    background: rgba(255, 0, 0, 0.1);
  }

  .react-daterange-picker__inputGroup__input--hasLeadingZero {
    margin-left: -0.54em;
    padding-left: calc(1px + 0.54em);
  }

  .react-daterange-picker__button {
    border: 0;
    background: transparent;
    padding: 0px;
    margin-left: 5px;
  }

  .react-daterange-picker__button:enabled {
    cursor: pointer;
  }

  .react-daterange-picker__button:enabled:hover .react-daterange-picker__button__icon,
  .react-daterange-picker__button:enabled:focus .react-daterange-picker__button__icon {
    stroke: #0078d7;
  }

  .react-daterange-picker__button:disabled .react-daterange-picker__button__icon {
    stroke: #6d6d6d;
  }

  .react-daterange-picker__button svg {
    display: inherit;
  }

  .react-daterange-picker__calendar {
    width: 350px;
    max-width: 100vw;
    z-index: 1;
  }

  .react-daterange-picker__calendar--closed {
    display: none;
  }

  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 8px;
    background: none;
    text-align: center;
    line-height: 125%;
    transition: background-color 0.1s, color 0.1s, border-radius 0.1s;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__tile:not(.react-calendar__tile--active):hover,
  .react-calendar__tile:not(.react-calendar__tile--active):focus {
    background-color: #1087ff;
    color: #ffffff;
    border-radius: 8px;
  }

  .react-calendar__tile--hover {
    background-color: #f5f5fa;
    color: #232323;
  }

  .react-calendar__tile--active {
    background-color: #f5f5fa;
    color: #232323;
  }

  .react-calendar {
    border: none;
    font-family: inherit;
  }

  .calendar {
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 2px 40px rgba(96, 93, 97, 0.15);
    border-radius: 8px;
  }

  .react-calendar__month-view__weekdays__weekday {
    display: none;
  }

  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--rangeStart {
    background-color: #3719ca !important;
    color: #fff;
  }

  .react-calendar__tile--rangeStart {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .react-calendar__tile--rangeEnd {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .doted {
    width: inherit;
    position: relative;

    &:after {
      display: block;
      content: '•';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0%);
      color: #3719ca;
      margin-top: 2px;
    }
  }
`

export default DatePickerContainer

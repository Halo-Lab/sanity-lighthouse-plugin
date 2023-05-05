import {createGlobalStyle} from 'styled-components'
// import Inter from '../asset/fonts/Inter.ttf'
// import Poppins from '../asset/fonts/Poppins.ttf'
// @font-face{
//   font-family : 'Inter';
//   src: local('Inter'),
//   url(${Inter}) format('truetype');
// }

// @font-face{
//   font-family : 'Poppins';
//   src: local('Poppins'),
//   url(${Poppins}) format('truetype');
// }

const GlobalStyle = createGlobalStyle`  

body {
  height: 100%;

  *{
    font-family: 'Inter', sans-serif;
    font-size: 14px;
  }
}

.titleStyle{
  font-weight: 400;
  line-height: 1.25;
  color: #232323;
}  

.doted {
  width: inherit;
  position: relative;
  color: #232323 !important;

    &:after{
      content: '•';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,0%);
      color:#3719CA;
      margin: 4px 0 0 0;
    }
}

  .customInput{
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 12px;
  }

  .react-calendar{
    border : none;
    font-family: inherit;
  }

  .calendar{
    padding: 24px;
    background: #FFFFFF;
    box-shadow: 0px 2px 40px rgba(96, 93, 97, 0.15);
    border-radius: 8px;
  }

.react-calendar__month-view__weekdays__weekday{
  display: none;
}

.react-daterange-picker__wrapper{ 
  border-radius: 4px;
  outline: unset;
  border: 1px solid #C9C9C9;
  color: #C9C9C9;

  &:active,:hover,:focus{
    border: 1px solid #3F3F3F;
  }
}
  .react-calendar__tile--active{
    background-color: #F5F5FA;
    color: #232323 !important;
  }

  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--rangeStart{
    background-color: #006edc;
    color: white !important;
  }

  .react-calendar__tile--rangeStart{
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .react-calendar__tile--rangeEnd{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

export default GlobalStyle

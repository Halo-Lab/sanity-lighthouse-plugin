import {createGlobalStyle} from 'styled-components'
import Inter from '../asset/fonts/Inter.ttf'
import Poppins from '../asset/fonts/Poppins.ttf'

const GlobalStyle = createGlobalStyle`  
@font-face{
  font-family : 'Inter';
  src: local('Inter'),
  url(${Inter}) format('truetype');
}

@font-face{
  font-family : 'Poppins';
  src: local('Poppins'),
  url(${Poppins}) format('truetype');
}

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

.highlight {
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
 .highlightFirstAndLast > .react-calendar__tile--active{
   background-color: red !important;

  color: #fff !important;
}
  .customInput{
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 12px;
    
  }
  .calendar{
    border: 1px solid #C9C9C9;
    border-radius: 4px;
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
`

export default GlobalStyle

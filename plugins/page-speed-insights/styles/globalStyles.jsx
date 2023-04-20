import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`  
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins&display=swap');
body {
  font-family: Inter,Poppins, sans-serif;
  font-weight: 400;
  font-size: 16px;
  height: 100%;
}

.titleStyle{
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
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

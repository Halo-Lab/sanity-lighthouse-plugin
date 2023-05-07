import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`  
  body {
    height: 100%;
  }

  .test{
    border: 5px solid red;
  
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

  .customInput{
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 12px;
  }
`

export default GlobalStyle

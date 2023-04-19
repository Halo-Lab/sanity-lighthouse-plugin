import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`  
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins&display=swap');
  body {
  font-family: Inter,Poppins, sans-serif;
  font-weight: 400;
  font-size: 16px;
  height: 100%;
}
h2{
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 1.21;


color: #02021E;
}
  
  .highlight {
    width: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    &:after{
      content: '•';
      color:#3719CA;
    }

             }
  .customInput{
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 12px;
    
  }
`

export default GlobalStyle

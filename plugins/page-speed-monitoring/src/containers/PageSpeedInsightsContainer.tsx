import styled from 'styled-components'
import {ThemeProvider as SanityThemeProvider, studioTheme} from '@sanity/ui'
import PageSpeedInsightsGui from '../components/PageSpeedInsightsGui'
import GlobalStyle from '../styles/globalStyles'
import {Helmet} from 'react-helmet'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  * {
    font-family: 'Inter', sans-serif;
  }
`
// const theme = {
//   colors: {
//     mB: '#E4E6E8', //main border color
//     accent: '#3719CA',
//     textBlack: '#2B2B2B',
//     green: '#4BBD7E',
//     yellow: '#F4BE5E',
//     chGreen: '#5CC971',
//     chOrange: '#F3AE4E',
//     chRed: '#EB483F',
//     lineGray: '#4E809F',
//     lineOrange: 'D1684D',
//   },
// }

const PageSpeedInsightsContainer = (props: any) => {
  return (
    <SanityThemeProvider theme={studioTheme}>
      <GlobalStyle />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Container>
        <PageSpeedInsightsGui {...props} />
      </Container>
    </SanityThemeProvider>
  )
}

export default PageSpeedInsightsContainer

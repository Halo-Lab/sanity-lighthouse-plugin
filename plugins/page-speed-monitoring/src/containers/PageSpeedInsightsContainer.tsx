import styled from 'styled-components'
import {ThemeProvider as SanityThemeProvider, studioTheme} from '@sanity/ui'
import PageSpeedInsightsGui from '../components/PageSpeedInsightsGui'
import {Helmet} from 'react-helmet'

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  * {
    font-family: 'Inter', sans-serif;
  }
`

const PageSpeedInsightsContainer = (props: any) => {
  return (
    <SanityThemeProvider theme={studioTheme}>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MainContainer>
        <PageSpeedInsightsGui {...props} />
      </MainContainer>
    </SanityThemeProvider>
  )
}

export default PageSpeedInsightsContainer

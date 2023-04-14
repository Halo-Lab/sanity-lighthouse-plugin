import React from 'react'
import styled from 'styled-components'
import PageSpeedInsightsGui from '../components/PageSpeedInsightsGui'
import GlobalStyle from '../styles/globalStyles'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const PageSpeedInsightsContainer = (props) => {
  return (
    <Container>
      <GlobalStyle />
      <PageSpeedInsightsGui {...props} />
    </Container>
  )
}

export default PageSpeedInsightsContainer

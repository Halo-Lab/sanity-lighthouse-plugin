import React from 'react'
import styled from 'styled-components'
import PageSpeedInsightsGui from '../components/PageSpeedInsightsGui'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const PageSpeedInsightsContainer = (props) => {
  return (
    <Container>
      <PageSpeedInsightsGui {...props} />
    </Container>
  )
}

export default PageSpeedInsightsContainer

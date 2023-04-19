import React from 'react'
import {Card, Text, Flex, Spinner} from '@sanity/ui'

export const CustomSpinner = ({text = 'Loading some content…'}) => {
  return (
    <Card padding={4}>
      <Flex align="center" direction="row" gap={3} height="fill" justify="center">
        <Spinner muted />
        <Text muted size={1}>
          {text}
        </Text>
      </Flex>
    </Card>
  )
}

import styled from 'styled-components'

const SpinnerComponent = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
)

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 16px;
  height: 16px;

  & .path {
    stroke: #c9c9c9;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

export default SpinnerComponent

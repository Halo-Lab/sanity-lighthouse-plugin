import React from 'react'
import styled, {keyframes} from 'styled-components'

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: ${(props) => (props.active ? '12px' : '0')};
  overflow: hidden;
  animation: ${(props) => (props.active ? 'height 0.25s ease-in' : 'height 0.15s ease-out')};
`

export const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 0.5rem;
  }

  100% { 
    margin-bottom: 0;
  }
`

export const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 0.2rem;
  height: 0.2rem;
  margin: 0 0.25rem;
  /*Animation*/
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`

export default function Loading({active}) {
  return (
    <LoadingWrapper active={active}>
      <Dot delay="0s" />
      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
    </LoadingWrapper>
  )
}

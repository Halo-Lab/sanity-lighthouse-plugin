import styled, {keyframes} from 'styled-components'
import {ButtonResetAll} from './PageSpeedInsightsGuiStyles'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 24px;
  line-height: 1.21;
  color: #121212;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0 24px;
  overflow: scroll;
  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: #ebebeb;
  }
`

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 40px;
  animation: ${fadeIn} 0.5s ease-in-out;
  border-bottom: 1px solid #e4e6e8;
`

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({active}: {active: boolean}) => (active ? '#3719CA' : 'rgba(18, 18, 18, 0.4)')};
  background-color: unset;
  border: unset;

  font-weight: 500;
  font-size: 16px;
  line-height: 1.19;
  text-align: center;
  text-transform: capitalize;

  padding: 0px 9px 16px;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  svg > path {
    stroke: ${({active}: {active: boolean}) => (active ? '#3719CA' : 'rgba(18, 18, 18, 0.4)')};
    transition: stroke 0.3s ease-in-out;
  }
`

export const TabLine = styled.span`
  height: 3px;
  background-color: #3719ca;
  border-radius: 5px 5px 0 0;
  width: 100%;
`
export const TabContent = styled.div`
  display: ${({active}: {active: boolean}) => (active ? 'flex' : 'none')};
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-direction: column;
  padding: 32px 40px 24px;
`
export const FirstSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 1px solid #e4e6e8;
  border-radius: 4px;
  padding: 32px;
  overflow: hidden;
`

export const RenderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
`

export const RetestButton = styled(ButtonResetAll)`
  padding: 12px 32px;
`
export const Link = styled.a`
  text-decoration: underline;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.21;
  color: #121212;

  :hover {
    color: #3719ca;
  }
`
export const LinkDetails = styled(Link)`
  font-size: 14px;
  line-height: 1.21;
  text-decoration: unset;
  display: flex;
  align-items: center;
  white-space: nowrap;
  :hover {
    svg > path {
      stroke: #3719ca;
    }
  }
`
export const DescriptContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: flex-start;
`

export const DescriptItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #121212;
`

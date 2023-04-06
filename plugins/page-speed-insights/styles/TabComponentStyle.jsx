import styled, {keyframes} from 'styled-components'

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
export const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s ease-in-out;
  border-bottom: 2px solid gray;
`

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${({active}) => (active ? 'gray' : '#dddddd')};
  color: ${({active}) => (active ? '#fff' : '#666666')};
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({active}) => (active ? '#ffffff' : '#bbbbbb')};
    color: ${({active}) => (active ? '#333333' : '#555555')};
  }
`

export const TabContent = styled.div`
  height: 100%;
  width: 100%;
  display: ${({active}) => (active ? 'flex' : 'none')};
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-direction: column;
`

export const RenderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 1.5 rem;
`

export const RefreshContainer = styled.div`
  display: flex;
  align-items: center;
`
export const Link = styled.a`
  text-decoration: underline;
  color: #3c4043;
  font-size: 21px;
  :hover {
    color: #1a73e8;
  }
`
export const DescriptContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: flex-start;
`

export const DescriptItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  white-space: nowrap;
  color: #616161;
`

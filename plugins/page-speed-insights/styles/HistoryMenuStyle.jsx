import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  overflow-y: scroll;
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
export const CustomButton = styled.button`
  display: flex;

  align-items: center;
  padding: 4px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: transparent;
  cursor: 'pointer',
  :hover {
    background-color: ${(props) => (props.disabled ? 'transparent' : 'red')};
    svg {
      color: white;
    }
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: lightgrey;
  }
  background-color: ${(props) => (props.active ? 'lightgrey' : 'white')};
`

export const Flex = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`
export const DateText = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
`

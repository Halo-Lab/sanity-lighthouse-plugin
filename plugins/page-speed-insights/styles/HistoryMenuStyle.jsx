import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  gap: 20px;
`
export const CustomButton = styled.div`
  display: flex;

  align-items: center;
  padding: 4px;
  border: 1px solid red;
  border-radius: 5px;
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
  box-shadow: lightgrey 0px 0px 0px 3px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: lightgrey;
    box-shadow: gray 0px 0px 0px 3px;
  }
  background: ${(props) => (props.active ? 'gray' : 'white')};
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

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin: 32px 0 16px;
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
  width: 24px;
  height: 24px;

  align-items: center;

  border: 1px solid ${({disabled}: {disabled: boolean}) => (disabled ? '#DFDFE3' : '#c1c1c1')};
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;

  svg > path {
    stroke: ${({disabled}: {disabled: boolean}) => disabled && '#DFDFE3'};
  }

  &:hover,
  :focus {
    border: 1px solid ${({disabled}: {disabled: boolean}) => (disabled ? '#DFDFE3' : '#EB483F')};
    svg > path {
      stroke: ${({disabled}: {disabled: boolean}) => (disabled ? '#DFDFE3' : '#EB483F')};
    }
  }
  &:active {
    border: 1px solid ${({disabled}: {disabled: boolean}) => (disabled ? '#DFDFE3' : '#d23229')};
    svg > path {
      stroke: ${({disabled}: {disabled: boolean}) => (disabled ? '#DFDFE3' : '#d23229')};
    }
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  padding: 16px;
  border: 1px solid ${({active}: {active: boolean}) => (active ? '#3719CA' : '#e4e6e8')};
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
`

export const Flex = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`
export const DateText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;

  color: #2b2b2b;
  margin: 0;
`
export const LinkText = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;

  color: #2b2b2b;
  margin: 0;
`

export const BadgeComponent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({tone}: {tone: any}) => tone};
  color: ${({tone}) => tone};
  border-radius: 58px;
  padding: 3px 12px;

  font-family: 'Poppins' !important;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;

  text-align: center;
  text-transform: capitalize;
`

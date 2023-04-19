import styled from 'styled-components'

export const ButtonAddPage = styled.button`
  width: 100%;
  max-width: 92px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  color: #ffffff;
  background: ${({disabled}) => (disabled ? '#DFDFE3' : '#3719ca')};
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 11.5px 0;

  &:hover,
  :focus {
    background: ${({disabled}) => (disabled ? '#DFDFE3' : '#5f44e6')};
  }
  &:active {
    background: ${({disabled}) => (disabled ? '#DFDFE3' : '#250ba3')};
  }
`
export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(0%, -50%);
  margin: auto 0;
  display: flex;
  align-items: center;
  svg > path {
    stroke: ${({error}) => (error ? '#EF3340' : '#888')};
  }
`

export const ErorrMessage = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  min-height: 24px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.67;

  color: #ef3340;
`

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
`
export const CheckboxLabel = styled.label`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  color: #3e3e3e;
`
export const CheckboxIconContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;

  cursor: pointer;
  border: 1px solid #c9c9c9;
  border-radius: 2px;

  svg {
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);
  }
  &:hover,
  :focus {
    border: 1px solid #3f3f3f;
  }

  background-color: ${(props) => (props.checked ? '#3719ca' : '#fff')};
  ${({checked}) =>
    checked &&
    `
  &:hover {
    background-color: #5F44E5;
  }
  `}
`

export const CustomInput = styled.input`
  width: 100%;
  border: 1px solid ${({error}) => (error ? '#EF3340' : '#c9c9c9')};
  border-radius: 4px;
  padding: 12px 32px 12px 38px;
  outline: unset;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: ${({error}) => (error ? '#EF3340' : '#3f3f3f')};

  &::placeholder {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: #888888;
  }
  &:hover,
  :focus,
  :active {
    border: 1px solid ${({error}) => (error ? '#EF3340' : '#3f3f3f')};
  }

  &:disabled {
    background: #f5f5f7;
    color: #c9c9c9;
    border: 1px solid #dadada;
    border-radius: 4px;
  }
`
export const InputSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 98%;
  transform: translate(0%, -50%);
  padding: auto 0;
`

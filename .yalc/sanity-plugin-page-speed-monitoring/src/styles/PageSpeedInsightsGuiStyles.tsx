import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 364px 1fr;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`
export const ButtonResetAll = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 11.5px 0;
  gap: 9px;
  background-color: ${({disabled}) => (disabled ? '#DFDFE3' : 'transparent')};

  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;

  color: ${({disabled}) => (disabled ? '#fff' : '#121212')};

  border: 1px solid ${({disabled}) => (disabled ? '#dfdfe3' : '#c9c9c9')};
  border-radius: 4px;
  svg > path {
    stroke: ${({disabled}) => (disabled ? '#fff' : '#121212')};
  }
  &:hover,
  :focus {
    background: ${({disabled}) => (disabled ? '#DFDFE3' : '#efefff')};
    border: 1px solid ${({disabled}) => (disabled ? 'inherit' : '#3719ca')};
    border-radius: 4px;
    color: ${({theme, disabled}) => (disabled ? '#fff' : theme.colors.accent)};
    svg > path {
      stroke: ${({theme, disabled}) => (disabled ? '#fff' : theme.colors.accent)};
    }
  }
  &:active {
    background: ${({disabled}) => (disabled ? '#DFDFE3' : '#efefff')};
    border: 1px solid ${({disabled}) => (disabled ? 'inherit' : '#3719ca')};
    border-radius: 4px;
    color: ${({theme, disabled}) => (disabled ? '#fff' : theme.colors.accent)};
    svg > path {
      stroke: ${({theme, disabled}) => (disabled ? '#fff' : theme.colors.accent)};
    }
  }
`

import {CheckboxContainer, CheckboxIconContainer, CheckboxLabel} from '../../styles/InputStyle'
import {TickIcon} from '../../asset/TickIcon'

export const CustomCheckBox = ({checked, isDisable = false, handleChange, label = '', id}: any) => {
  return (
    <CheckboxContainer>
      <CheckboxIconContainer
        checked={checked}
        id={id}
        data-disabled={isDisable}
        onClick={handleChange}
      >
        <TickIcon />
      </CheckboxIconContainer>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  )
}

import {CheckboxContainer, CheckboxIconContainer, CheckboxLabel} from '../../styles/InputStyle'
import {TickIcon} from '../../assets/icons/TickIcon'

type CheckboxPropsType = {
  checked: boolean
  isDisable?: boolean
  label?: string
  id: string
  handleChange: () => void
}

export const CustomCheckBox = ({
  checked,
  isDisable = false,
  handleChange,
  label = '',
  id,
}: CheckboxPropsType) => {
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

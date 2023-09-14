import {useState, useCallback, ChangeEvent} from 'react'
import {Flex, Box} from '@sanity/ui'
import validator from 'validator'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants.js'
import {
  ButtonAddPage,
  CheckboxContainer,
  CheckboxIconContainer,
  CheckboxLabel,
  CustomInput,
  ErorrMessage,
  InputIcon,
  InputSpinner,
} from '../styles/InputStyle'
import {TickIcon} from '../assets/icons/TickIcon.js'
import {LinkIcon} from '../assets/icons/LinkIcon.js'
import SpinnerComponent from './shared/CustomSpinner.jsx'
import {IPluginData} from '../types'

type InputPropsType = {
  device: string[]
  data: IPluginData[]
  state: string
  url: string
  setUrl: Function
  setDevice: Function
  handleRequest: () => {}
}

export const InputComponent = ({
  setUrl,
  device,
  setDevice,
  state,
  url,
  data,
  handleRequest,
}: InputPropsType) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | any) => {
      if (event.currentTarget.dataset.disabled === 'true') return
      const check = event.currentTarget.id

      if (device.includes(check)) {
        setDevice([...device.filter((dev: string) => dev !== check)])
      } else {
        setDevice([...device, check])
      }
    },
    [device, setDevice]
  )

  const validate = (value: string) => {
    if (validator.isURL(value)) {
      setErrorMessage('')
    } else {
      setErrorMessage('Is not valid URL.')
    }
    if (data.length) {
      data.map((item: IPluginData) => {
        return item.mainInfo.linkReq == value ? setErrorMessage('This link already exist') : null
      })
    }
    setUrl(value)
  }
  const isDisable = state === STATE_TYPE.loading

  return (
    <Box>
      <Flex justify={'space-between'} direction={'column'}>
        <Flex direction={'column'}>
          <Flex gap={2}>
            <Flex style={{position: 'relative'}}>
              <InputIcon error={Boolean(errorMessage)}>
                <LinkIcon />
              </InputIcon>
              <CustomInput
                onChange={({target}) => validate(target.value)}
                onBlur={({target}) =>
                  target.value === '' ? setErrorMessage('') : validate(target.value)
                }
                value={url}
                placeholder="Specify page URL"
                disabled={isDisable}
                error={Boolean(errorMessage)}
              />
              {state === STATE_TYPE.loading && (
                <InputSpinner>
                  <SpinnerComponent />
                </InputSpinner>
              )}
            </Flex>
            <ButtonAddPage
              type="button"
              onClick={handleRequest}
              disabled={isDisable || !device.length}
            >
              Add page
            </ButtonAddPage>
          </Flex>
          <ErorrMessage>{url !== '' && errorMessage}</ErorrMessage>
        </Flex>

        <Flex style={{gap: '16px'}}>
          <CheckboxContainer>
            <CheckboxIconContainer
              checked={device.includes(LIST_DEVICES.desktop)}
              id="desktop"
              data-disabled={isDisable}
              onClick={handleChange}
            >
              <TickIcon />
            </CheckboxIconContainer>
            <CheckboxLabel>{LIST_DEVICES.desktop}</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer>
            <CheckboxIconContainer
              checked={device.includes(LIST_DEVICES.mobile)}
              id="mobile"
              data-disabled={isDisable}
              onClick={handleChange}
            >
              <TickIcon />
            </CheckboxIconContainer>
            <CheckboxLabel>{LIST_DEVICES.mobile}</CheckboxLabel>
          </CheckboxContainer>
        </Flex>
      </Flex>
    </Box>
  )
}

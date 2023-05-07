import {useState, useCallback} from 'react'
import {Stack, Flex, Box} from '@sanity/ui'
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
import {TickIcon} from '../asset/TickIcon.js'
import {LinkIcon} from '../asset/LinkIcon.js'
import SpinnerComponent from './shared/CustomSpinner.jsx'

export const InputComponent = ({
  setUrl,
  device,
  setDevice,
  state,
  url,
  data,
  handelRequest,
}: any) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = useCallback(
    (event: any) => {
      if (event.currentTarget.dataset.disabled === 'true') return
      const check = event.currentTarget.id

      if (device.includes(check)) {
        setDevice([...device.filter((dev: any) => dev !== check)])
      } else {
        setDevice([...device, check])
      }
    },
    [device, setDevice]
  )

  const validate = (value: any) => {
    if (validator.isURL(value)) {
      setErrorMessage('')
    } else {
      setErrorMessage('Is not valid URL.')
    }
    if (data.length) {
      data.map((item: any) => {
        return item.mainInfo.linkReq == value ? setErrorMessage('This link already exist') : null
      })
    }
    setUrl(value)
  }
  const isDisable = state === STATE_TYPE.loading

  return (
    <Box>
      {/* <Stack> */}
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
              onClick={handelRequest}
              disabled={isDisable || !Boolean(device.length)}
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
      {/* </Stack> */}
    </Box>
  )
}

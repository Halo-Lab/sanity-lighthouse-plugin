import React, {useState, useCallback} from 'react'
import {Checkbox, Stack, Radio, TextInput, Button, Inline, Flex, Text, Box} from '@sanity/ui'
import {LinkIcon} from '@sanity/icons'
import validator from 'validator'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants.js'

export const InputComponent = ({setUrl, device, setDevice, state, url, data, handelRequest}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const handleChange = useCallback(
    (event) => {
      const check = event.currentTarget.value
      if (device.includes(check)) {
        setDevice([...device.filter((dev) => dev !== check)])
      } else {
        setDevice([...device, check])
      }
    },
    [device, setDevice]
  )

  const validate = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage('Is Valid URL')
    } else {
      setErrorMessage('Is Not Valid URL')
    }
    if (data.length) {
      data.map((item) => {
        return item.mainInfo.linkReq == value ? setErrorMessage('This link already exist') : null
      })
    }
    setUrl(value)
  }
  const isDisable = state === STATE_TYPE.loading

  return (
    <Box style={{borderBottom: '1px solid gray', padding: '1rem 0'}}>
      <Stack>
        <Flex gap={1} justify={'space-between'} direction={'column'}>
          <Flex direction={'column'}>
            <TextInput
              onChange={({target}) => validate(target.value)}
              onBlur={({target}) =>
                target.value === '' ? setErrorMessage('') : validate(target.value)
              }
              icon={LinkIcon}
              value={url}
              disabled={isDisable}
              radius={2}
            />

            <span
              style={{
                fontWeight: 'bold',
                color: errorMessage === 'Is Valid URL' ? 'green' : 'red',
                minHeight: '22px',
              }}
            >
              {url !== '' && errorMessage}
            </span>
          </Flex>
          <Flex justify={'space-between'} align={'center'} gap={2}>
            <Flex>
              <Inline space={2}>
                {/* <Radio
                  checked={device.includes(LIST_DEVICES.desktop)}
                  onChange={handleChange}
                  value="desktop"
                  disabled={isDisable}
                /> */}
                <Checkbox
                  checked={device.includes(LIST_DEVICES.desktop)}
                  onChange={handleChange}
                  value="desktop"
                  disabled={isDisable}
                />
                <Text>Desktop</Text>
                {/* <Radio
                  checked={device.includes(LIST_DEVICES.mobile)}
                  onChange={handleChange}
                  value="mobile"
                  disabled={isDisable}
                /> */}
                <Checkbox
                  checked={device.includes(LIST_DEVICES.mobile)}
                  onChange={handleChange}
                  value="mobile"
                  disabled={isDisable}
                />
                <Text>Mobile</Text>
              </Inline>
            </Flex>
            <Button
              fontSize={[2, 2, 3]}
              padding={[1, 1, 3]}
              text="Analyze"
              tone="primary"
              onClick={handelRequest}
              disabled={
                errorMessage !== 'Is Valid URL' ||
                errorMessage === '' ||
                isDisable ||
                !Boolean(device.length)
              }
            />
          </Flex>
        </Flex>
      </Stack>
    </Box>
  )
}

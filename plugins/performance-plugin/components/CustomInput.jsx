import React, {useState, useCallback} from 'react'
import {Stack, Radio, TextInput, Button, Inline, Flex, Text, Box} from '@sanity/ui'
import {LinkIcon} from '@sanity/icons'
import validator from 'validator'

export const CustomInput = ({handleSubmit, setUrl, device, setDevice, state, url, data}) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = useCallback(
    (event) => {
      setDevice(event.currentTarget.value)
    },
    [setDevice]
  )

  const validate = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage('Is Valid URL')
    } else {
      setErrorMessage('Is Not Valid URL')
    }
    if (data.length) {
      data.map((item) => {
        console.log(item)
        return item.mainInfo.linkReq.includes(value)
          ? setErrorMessage('This link already exist')
          : null
      })
    }
    setUrl(value)
  }

  return (
    <Box style={{outline: '2px solid gray'}} padding={[2, 3]}>
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
              disabled={state === 'loading'}
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
          <Flex justify={'flex-end'} align={'center'} gap={6}>
            <Flex>
              <Inline space={3}>
                <Radio
                  checked={device === 'Desktop'}
                  name="foo"
                  onChange={handleChange}
                  value="Desktop"
                  disabled={state === 'loading'}
                />
                <Text>Desktop</Text>
                <Radio
                  checked={device === 'Mobile'}
                  name="foo"
                  onChange={handleChange}
                  value="Mobile"
                  disabled={state === 'loading'}
                />
                <Text>Mobile</Text>
              </Inline>
            </Flex>
            <Button
              fontSize={[2, 2, 3]}
              padding={[1, 1, 3]}
              text="Analyze"
              tone="primary"
              onClick={handleSubmit}
              disabled={
                errorMessage !== 'Is Valid URL' || errorMessage === '' || state === 'loading'
              }
            />
          </Flex>
        </Flex>
      </Stack>
    </Box>
  )
}

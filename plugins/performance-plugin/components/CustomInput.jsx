import React, {useState} from 'react'
import {Stack, Grid, TextInput, Button, Inline, Flex} from '@sanity/ui'
import {PublishIcon} from '@sanity/icons'
import validator from 'validator'

export const CustomInput = ({handleSubmit, setUrl}) => {
  const [errorMessage, setErrorMessage] = useState('')

  const validate = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage('Is Valid URL')

      setUrl(value)
    } else {
      setErrorMessage('Is Not Valid URL')
    }
  }

  return (
    <Stack>
      <Flex gap={1} justify={'space-between'} direction={'column'}>
        <Flex direction={'column'}>
          <TextInput
            onChange={({target}) => validate(target.value)}
            onBlur={({target}) =>
              target.value === '' ? setErrorMessage('') : validate(target.value)
            }
          />
          <span
            style={{
              fontWeight: 'bold',
              color: errorMessage === 'Is Valid URL' ? 'green' : 'red',
              minHeight: '22px',
            }}
          >
            {errorMessage}
          </span>
        </Flex>
        <Flex justify={'flex-end'}>
          <Button
            fontSize={[2, 2, 3]}
            icon={PublishIcon}
            padding={[1, 1, 3]}
            text="Analyze"
            tone="primary"
            onClick={handleSubmit}
            disabled={errorMessage === 'Is Not Valid URL' || errorMessage === ''}
          />
        </Flex>
      </Flex>
    </Stack>
  )
}

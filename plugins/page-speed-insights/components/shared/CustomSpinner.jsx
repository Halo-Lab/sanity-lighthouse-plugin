import React from 'react'
import {Card, Text, Flex, Spinner} from '@sanity/ui'

export const CustomSpinner = ({text = 'Loading some content…'}) => {
  return (
    <Card padding={4}>
      <Flex align="center" direction="row" gap={3} height="fill" justify="center">
        <Spinner muted />
        <Text muted size={1}>
          {text}
        </Text>
      </Flex>
    </Card>
  )
}

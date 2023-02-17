import React from 'react'
import {Card, Text, Flex, Spinner} from '@sanity/ui'

export const CustomSpinner = () => {
  return (
    <Card padding={4}>
      <Flex
        align="center"
        direction="row" // <-
        gap={3}
        height="fill"
        justify="center"
      >
        <Spinner muted />
        <Text muted size={1}>
          Loading some content…
        </Text>
      </Flex>
    </Card>
  )
}

import React from 'react'
import {Menu, Card, Text, Stack, MenuItem, Box, MenuDivider, Badge, Flex} from '@sanity/ui'
import {CustomSpinner} from './CustomSpinner'

export const SearchMenu = ({items, setActiveResult, state}) => {
  const renderCards = (items) =>
    items.map(({mainInfo}, i) => {
      return (
        <div key={`${mainInfo.linkReq.slice(0, 10)}`}>
          <MenuItem
            onClick={(e) => {
              console.dir(e)
              setActiveResult(i)
            }}
          >
            <Box padding={3}>
              <Stack space={3}>
                <Text weight="semibold">{mainInfo.linkReq.substring(0, 30)}</Text>
                <Flex gap={2} justify="space-between" align={'center'}>
                  <Text muted size={1}>
                    {mainInfo.date}
                  </Text>
                  <Badge tone={mainInfo.device === 'desktop' ? 'positive' : 'caution'}>
                    {mainInfo.device}
                  </Badge>
                </Flex>
              </Stack>
            </Box>
          </MenuItem>
          <MenuDivider />
        </div>
      )
    })
  return (
    <Box padding={4}>
      <Card radius={5} shadow={1}>
        <Menu>{renderCards(items)}</Menu>
      </Card>
    </Box>
  )
}

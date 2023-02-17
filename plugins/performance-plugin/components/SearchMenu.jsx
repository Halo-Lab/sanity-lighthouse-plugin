import React from 'react'
import {Menu, Card, Text, Stack, MenuItem, Box, MenuDivider} from '@sanity/ui'

export const SearchMenu = ({items, setActiveResult}) => {
  const renderCards = (items) =>
    items.map((item, i) => (
      <div key={`${item.slice(0, 10)}`}>
        <MenuItem
          onClick={(e) => {
            console.dir(e)
            setActiveResult(i)
          }}
        >
          <Box padding={3}>
            <Stack space={3}>
              <Text weight="semibold">{item}</Text>
              <Text muted size={1}>
                Description
              </Text>
            </Stack>
          </Box>
        </MenuItem>
        <MenuDivider />
      </div>
    ))
  return (
    <Box padding={4}>
      <Card radius={5} shadow={4}>
        <Menu>{renderCards(items)}</Menu>
      </Card>
    </Box>
  )
}

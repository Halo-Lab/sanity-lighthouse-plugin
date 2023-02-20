import React, {useState} from 'react'
import {Menu, Card, Text, Stack, MenuItem, Box, MenuDivider} from '@sanity/ui'
import {CustomSpinner} from './CustomSpinner'

export const SearchMenu = ({items, setActiveResult, state}) => {
  const renderCards = (items) =>
    items.map((item, i) => {
      return (
        <div key={`${item.slice(0, 10)}`}>
          <MenuItem
            onClick={(e) => {
              console.dir(e)
              setActiveResult(i)
            }}
          >
            {state === 'loading' ? (
              <CustomSpinner />
            ) : (
              <Box padding={3}>
                <Stack space={3}>
                  <Text weight="semibold">{item}</Text>
                  <Text muted size={1}>
                    Description
                  </Text>
                </Stack>
              </Box>
            )}
          </MenuItem>
          <MenuDivider />
        </div>
      )
    })
  return (
    <Box padding={4}>
      <Card radius={5} shadow={4}>
        <Menu>{renderCards(items)}</Menu>
      </Card>
    </Box>
  )
}

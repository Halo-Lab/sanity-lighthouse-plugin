import React from 'react'
import {Menu, Card, Text, Stack, MenuItem, Box, MenuDivider, Badge, Flex, Button} from '@sanity/ui'
import {TrashIcon} from '@sanity/icons'
import styled from 'styled-components'

const CustomButton = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border: 1px solid red;
  border-radius: 5px;
`
export const SearchMenu = ({items, setActiveResult, state, deleteCardByID, stateTabs}) => {
  const isDisable = state === 'loading' || stateTabs === 'loading'
  const renderCards = (items) =>
    items.map(({mainInfo}, i) => {
      return (
        <div key={`${mainInfo.linkReq.slice(0, 10)}`}>
          <MenuItem onClick={(e) => setActiveResult(i)} disabled={isDisable && true}>
            <Box padding={3}>
              <Stack space={3}>
                <Flex gap={2} justify="space-between" align={'center'}>
                  <Text weight="semibold">{mainInfo.linkReq.substring(0, 30)}</Text>

                  <CustomButton
                    onClick={() => (isDisable ? null : deleteCardByID(mainInfo.linkReq))}
                    id="deleteButton"
                    style={{borderColor: isDisable && 'grey'}}
                  >
                    <TrashIcon color="red" style={{color: isDisable && 'grey'}} />
                  </CustomButton>
                </Flex>
                <Flex gap={2} justify="space-between" align={'center'}>
                  <Text muted size={1}>
                    {mainInfo.date}
                  </Text>
                  <Badge
                    tone={mainInfo.device === 'desktop' ? 'positive' : 'caution'}
                    style={{
                      backgroundColor: isDisable && 'grey',
                      borderColor: isDisable && 'grey',
                      boxShadow: isDisable && 'inset 0 0 0 1px grey',
                    }}
                  >
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

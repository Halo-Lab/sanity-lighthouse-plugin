import React from 'react'
import {Menu, Card, Text, Stack, MenuItem, Box, MenuDivider, Badge, Flex} from '@sanity/ui'
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
    items.map(({mainInfo, mobile, desktop}, i) => {
      const showSecondTag = Boolean(mobile?.length) && Boolean(desktop?.length)

      return (
        <div key={`${mainInfo.linkReq.slice(0, 10)}-${Math.random()}`}>
          <MenuItem
            onClick={({target}) =>
              target.id === 'deleteButton'
                ? deleteCardByID(mainInfo.linkReq, i)
                : setActiveResult(i)
            }
            disabled={isDisable}
          >
            <Box padding={3}>
              <Stack space={3}>
                <Flex gap={2} justify="space-between" align={'center'}>
                  <Text weight="semibold">
                    {mainInfo.linkReq.slice(0, 22)}
                    {mainInfo.linkReq.length > 22 && '...'}
                  </Text>

                  <CustomButton
                    disabled={isDisable}
                    id="deleteButton"
                    style={{borderColor: isDisable && 'grey'}}
                  >
                    <TrashIcon id="deleteButton" color="red" style={{color: isDisable && 'grey'}} />
                  </CustomButton>
                </Flex>
                <Flex gap={2} justify="space-between" align={'center'}>
                  <Text muted size={1}>
                    {mainInfo.date}
                  </Text>
                  <Flex gap={1}>
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
                    {showSecondTag && (
                      <Badge
                        tone={mainInfo.device === 'desktop' ? 'caution' : 'positive'}
                        style={{
                          backgroundColor: isDisable && 'grey',
                          borderColor: isDisable && 'grey',
                          boxShadow: isDisable && 'inset 0 0 0 1px grey',
                        }}
                      >
                        {mainInfo.device === 'desktop' ? 'mobile' : 'desktop'}
                      </Badge>
                    )}
                  </Flex>
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

import React from 'react'
import {LinkIcon} from '@sanity/icons'
import {Container, CustomButton, Item, Flex, DateText} from '../styles/HistoryMenuStyle'
import {TrashIcon} from '@sanity/icons'
import {Text, Badge} from '@sanity/ui'
import Loading from './shared/LoadingComponent'
import {STATE_TYPE} from '../helpers/constants.js'

const HistoryMenu = ({data, activeItem, setActiveItem, state, deleteCardByID}) => {
  const isDisable = state === STATE_TYPE.loading

  const handelItem = ({target}, i) => {
    if (target.id === 'deleteButton' && state !== STATE_TYPE.loading) {
      return
    }
    setActiveItem(i)
  }

  const renderItems = (items) =>
    items.map(({mainInfo, categoryList}, i) => {
      const showSecondTag =
        Boolean(categoryList[0]?.mobile?.length) && Boolean(categoryList[0]?.desktop?.length)

      return (
        <Item
          key={`${mainInfo.linkReq.slice(0, 10)}-${Math.random()}`}
          onClick={(e) => handelItem(e, i)}
          active={i === activeItem && true}
        >
          <Flex>
            <Flex gap="2" align={'center'}>
              <LinkIcon />
              <Text>
                {mainInfo.linkReq.slice(0, 22)}
                {mainInfo.linkReq.length > 22 && '...'}
              </Text>
            </Flex>
            <CustomButton
              disabled={isDisable}
              id="deleteButton"
              style={{borderColor: isDisable && 'grey'}}
              type="button"
              onClick={(e) => deleteCardByID(mainInfo.linkReq, i)}
            >
              <TrashIcon id="deleteButton" color="red" style={{color: isDisable && 'gray'}} />
            </CustomButton>
          </Flex>
          <Flex align="center">
            <DateText>{mainInfo.date}</DateText>
            <Flex gap={2}>
              <Badge tone={mainInfo.device === 'desktop' ? 'positive' : 'caution'} padding={2}>
                {mainInfo.device}
              </Badge>
              {showSecondTag && (
                <Badge tone={mainInfo.device === 'desktop' ? 'caution' : 'positive'} padding={2}>
                  {mainInfo.device === 'desktop' ? 'mobile' : 'desktop'}
                </Badge>
              )}
            </Flex>
          </Flex>
        </Item>
      )
    })
  return (
    <Container>
      {<Loading active={state === STATE_TYPE.loading && true} />}
      {renderItems(data)}
    </Container>
  )
}

export default HistoryMenu

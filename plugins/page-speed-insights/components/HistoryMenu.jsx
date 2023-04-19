import React from 'react'
import {
  Container,
  CustomButton,
  Item,
  Flex,
  DateText,
  LinkText,
  BadgeComponent,
} from '../styles/HistoryMenuStyle'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants.js'
import {TrashIcon} from '../asset/TrashIcon'

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
              <LinkText>
                {mainInfo.linkReq.slice(0, 22)}
                {mainInfo.linkReq.length > 22 && '...'}
              </LinkText>
            </Flex>
            <CustomButton
              disabled={isDisable}
              id="deleteButton"
              type="button"
              onClick={(e) => deleteCardByID(mainInfo.linkReq, i)}
            >
              <TrashIcon />
            </CustomButton>
          </Flex>
          <Flex align="center">
            <Flex gap={2}>
              <BadgeComponent
                tone={mainInfo.device === LIST_DEVICES.desktop ? '#4BBD7E' : '#F4BE5E'}
              >
                {mainInfo.device}
              </BadgeComponent>
              {showSecondTag && (
                <BadgeComponent
                  tone={mainInfo.device === LIST_DEVICES.desktop ? '#F4BE5E' : '#4BBD7E'}
                >
                  {mainInfo.device === LIST_DEVICES.desktop
                    ? LIST_DEVICES.mobile
                    : LIST_DEVICES.desktop}
                </BadgeComponent>
              )}
            </Flex>
            <DateText>{mainInfo.date.split(',')[0]}</DateText>
          </Flex>
        </Item>
      )
    })
  return (
    <Container>
      {/* {<Loading active={state === STATE_TYPE.loading && true} />} */}
      {renderItems(data)}
    </Container>
  )
}

export default HistoryMenu

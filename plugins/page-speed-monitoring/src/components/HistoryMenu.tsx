import {
  Container,
  CustomButton,
  Item,
  DateText,
  LinkText,
  BadgeComponent,
  Flex,
} from '../styles/HistoryMenuStyle'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants.js'
import {TrashIcon} from '../assets/icons/TrashIcon'
import {IPluginData} from '../types'

type HistoryPropsType = {
  activeItem: number
  data: IPluginData[]
  state: string
  setActiveItem: Function
  deleteCardByID: (link: string, idx: number) => void
}

const HistoryMenu = ({
  data,
  activeItem,
  setActiveItem,
  state,
  deleteCardByID,
}: HistoryPropsType) => {
  const isDisable = state === STATE_TYPE.loading

  const handelItem = (target: any, i: number) => {
    if (target.id === 'deleteButton' && state !== STATE_TYPE.loading) {
      return
    }
    setActiveItem(i)
  }

  const renderItems = (items: IPluginData[]) =>
    items.map((item: IPluginData, i: number) => {
      const showSecondTag =
        Boolean(item.categoryList[0]?.mobile?.length) &&
        Boolean(item.categoryList[0]?.desktop?.length)

      return (
        <Item
          key={`${item.mainInfo.linkReq.slice(0, 10)}-${Math.random()}`}
          onClick={(e) => handelItem(e, i)}
          active={i === activeItem && true}
        >
          <Flex>
            <Flex>
              <LinkText>
                {item.mainInfo.linkReq.slice(0, 22)}
                {item.mainInfo.linkReq.length > 22 && '...'}
              </LinkText>
            </Flex>
            <CustomButton
              disabled={isDisable}
              id="deleteButton"
              type="button"
              onClick={() => deleteCardByID(item.mainInfo.linkReq, i)}
            >
              <TrashIcon />
            </CustomButton>
          </Flex>
          <Flex>
            <Flex>
              <BadgeComponent
                tone={item.mainInfo.device === LIST_DEVICES.desktop ? '#4BBD7E' : '#F4BE5E'}
              >
                {item.mainInfo.device}
              </BadgeComponent>
              {showSecondTag && (
                <BadgeComponent
                  tone={item.mainInfo.device === LIST_DEVICES.desktop ? '#F4BE5E' : '#4BBD7E'}
                >
                  {item.mainInfo.device === LIST_DEVICES.desktop
                    ? LIST_DEVICES.mobile
                    : LIST_DEVICES.desktop}
                </BadgeComponent>
              )}
            </Flex>
            <DateText>{item.mainInfo.date.split(',')[0]}</DateText>
          </Flex>
        </Item>
      )
    })
  return <Container>{renderItems(data)}</Container>
}

export default HistoryMenu

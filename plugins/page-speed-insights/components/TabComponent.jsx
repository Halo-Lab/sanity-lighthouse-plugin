import React, {useCallback} from 'react'
import {
  DescriptItem,
  DescriptContainer,
  Link,
  RefreshContainer,
  RenderContainer,
  TabButton,
  TabContent,
  TabContainer,
  Container,
} from '../styles/TabComponentStyle'
import {Flex, Heading, Button} from '@sanity/ui'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants'
import RenderCategories from './RenderCategories'
import {SyncIcon, PlayIcon, StopIcon, CircleIcon} from '@sanity/icons'
import {MobileDeviceIcon, DesktopIcon} from '@sanity/icons'
import ComboChartComponent from './shared/ComboChartComponent'
import {CustomSpinner} from './shared/CustomSpinner'

const tabs = [
  {id: LIST_DEVICES.desktop, label: LIST_DEVICES.desktop.toUpperCase()},
  {id: LIST_DEVICES.mobile, label: LIST_DEVICES.mobile.toUpperCase()},
]

const Tab = ({
  data,
  handleRefresh,
  setActiveTab,
  activeTab,
  state,
  activeRefreshID,
  activeRefreshDevice,
}) => {
  const isRefreshCurrent = activeRefreshID === data.mainInfo.linkReq && state === STATE_TYPE.loading

  const renderDataByDevice = useCallback(
    (data) => {
      if (!Boolean(data.categoryList[0][activeTab]?.length)) {
        return (
          <div style={{padding: '20px'}}>
            {' '}
            <Button
              fontSize={[2, 2, 3]}
              padding={[1, 1, 3]}
              text="Request data"
              tone="primary"
              onClick={(e) => handleRefresh(e)}
              disabled={state === STATE_TYPE.loading}
            />
          </div>
        )
      }
      return data.categoryList.map((item, i) => {
        return (
          <div key={`${item[activeTab].score}-${Math.random()}`}>
            <RenderCategories item={item[activeTab][0]} />
          </div>
        )
      })
    },
    [activeTab, handleRefresh, state]
  )
  const renderHistoryComponent = useCallback(() => {
    if (activeTab === LIST_DEVICES.desktop) {
      return (
        Boolean(data?.history?.desktop.length) && (
          <ComboChartComponent history={data.history.desktop} />
        )
      )
    } else {
      return (
        Boolean(data?.history?.mobile?.length) && (
          <ComboChartComponent history={data.history.mobile} />
        )
      )
    }
  }, [activeTab, data.history.desktop, data.history.mobile])

  return (
    <Container>
      <TabContainer>
        <Flex>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label === 'DESKTOP' ? <DesktopIcon /> : <MobileDeviceIcon />} {tab.label}
            </TabButton>
          ))}
        </Flex>
        <Flex align={'center'} gap={1}>
          <Heading>Page tested:</Heading>
          <Link href={data.mainInfo.linkReq} target="_blank" rel="noreferrer">
            {data.mainInfo.linkReq}
          </Link>
        </Flex>

        <RefreshContainer>
          <Button
            fontSize={[2]}
            icon={SyncIcon}
            padding={[3]}
            text="Refresh"
            tone="caution"
            onClick={handleRefresh}
            disabled={state === 'loading'}
          />
        </RefreshContainer>
      </TabContainer>

      {isRefreshCurrent && activeRefreshDevice === activeTab ? (
        <CustomSpinner />
      ) : (
        tabs.map((tab) => (
          <TabContent key={tab.id} active={activeTab === tab.id}>
            {Boolean(data?.categoryList?.length) && (
              <RenderContainer>{renderDataByDevice(data)}</RenderContainer>
            )}

            {Boolean(data?.categoryList[0][activeTab]?.length) && (
              <DescriptContainer>
                <DescriptItem>
                  <PlayIcon
                    style={{rotate: '-90deg', color: 'red', width: '20px', height: '20px'}}
                  />
                  0–49
                </DescriptItem>{' '}
                <DescriptItem>
                  <StopIcon style={{color: 'orange', width: '20px', height: '20px'}} />
                  50–89
                </DescriptItem>{' '}
                <DescriptItem>
                  <CircleIcon
                    style={{
                      color: 'green',
                      width: '20px',
                      height: '20px',
                      fill: 'green',
                    }}
                  />
                  90–100
                </DescriptItem>{' '}
              </DescriptContainer>
            )}
            {renderHistoryComponent()}
          </TabContent>
        ))
      )}
    </Container>
  )
}

export default Tab

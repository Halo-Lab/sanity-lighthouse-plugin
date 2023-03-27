import React, {useCallback} from 'react'
import styled, {keyframes} from 'styled-components'
import {Flex, Heading, Button} from '@sanity/ui'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants'
import RenderCategories from './RenderCategories'
import {SyncIcon} from '@sanity/icons'
import {MobileDeviceIcon, DesktopIcon} from '@sanity/icons'
import ComboChartComponent from './shared/ComboChartComponent'
import {CustomSpinner} from './shared/CustomSpinner'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s ease-in-out;
  border-bottom: 2px solid gray;
`

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${({active}) => (active ? 'gray' : '#dddddd')};
  color: ${({active}) => (active ? '#fff' : '#666666')};
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({active}) => (active ? '#ffffff' : '#bbbbbb')};
    color: ${({active}) => (active ? '#333333' : '#555555')};
  }
`

const TabContent = styled.div`
  height: 100%;
  width: 100%;
  display: ${({active}) => (active ? 'flex' : 'none')};
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-direction: column;
`

const RenderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 1.5 rem;
`

const RefreshContainer = styled.div`
  display: flex;
  align-items: center;
`
const Link = styled.a`
  text-decoration: underline;
  color: #3c4043;
  font-size: 21px;
  :hover {
    color: #1a73e8;
  }
`

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
        return isRefreshCurrent ? (
          <CustomSpinner />
        ) : (
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
    [activeTab, state]
  )

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
            {Boolean(data?.history[activeTab]?.length) && (
              <ComboChartComponent history={data.history[activeTab]} />
            )}
          </TabContent>
        ))
      )}
    </Container>
  )
}

export default Tab

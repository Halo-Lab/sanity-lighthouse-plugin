import React, {useCallback} from 'react'
import {
  DescriptItem,
  DescriptContainer,
  Link,
  RenderContainer,
  TabButton,
  TabContent,
  TabContainer,
  Container,
  TitleContainer,
  TabLine,
  LinkDetails,
  RetestButton,
  FirstSectionContainer,
} from '../styles/TabComponentStyle'
import {Flex} from '@sanity/ui'
import {LIST_DEVICES, STATE_TYPE, TABS} from '../helpers/constants'
import RenderCategories from './RenderCategories'
import {CustomSpinner} from './shared/CustomSpinner'
import {ChartComponentMemo} from './shared/ChartComponent'
import {DesktopIcon} from '../asset/DesktopIcon'
import {MobileIcon} from '../asset/MobileIcon'
import {ArrowUpRightIcon} from '../asset/ArrowUpRightIcon'
import {RefreshIcon} from '../asset/RefreshIcon'
import {TriangleIcon} from '../asset/TriangleIcon'
import {SquareIcon} from '../asset/SquareIcon'
import {CircleIcon} from '../asset/CircleIcon'

const Tab = ({
  data,
  handleRefresh,
  setActiveTab,
  activeTab,
  state,
  activeRefreshID,
  activeRefreshDevice,
}) => {
  const renderDataByDevice = useCallback(
    (data) => {
      if (!Boolean(data.categoryList[0][activeTab]?.length)) {
        return (
          <div style={{padding: '20px'}}>
            <RetestButton
              type="button"
              onClick={(e) => handleRefresh(e)}
              disabled={state === STATE_TYPE.loading}
            >
              <RefreshIcon />
              Request data
            </RetestButton>
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
          <ChartComponentMemo
            history={data.history[activeTab]}
            markDatesList={[...data.history[activeTab].map((item) => item[0].split(',')[0])]}
          />
        )
      )
    } else {
      return (
        Boolean(data?.history?.mobile?.length) && (
          <ChartComponentMemo
            history={data.history[activeTab]}
            markDatesList={[...data.history[activeTab].map((item) => item[0].split(',')[0])]}
          />
        )
      )
    }
  }, [activeTab, data.history])

  return (
    <Container>
      <TabContainer>
        <TitleContainer>
          Page tested:
          <Link href={data.mainInfo.linkReq} target="_blank" rel="noreferrer">
            {data.mainInfo.linkReq}
          </Link>
        </TitleContainer>
        <Flex justify={'space-between'}>
          <Flex style={{margin: 'auto 0 0 0'}}>
            {TABS.map((tab) => (
              <Flex key={tab.id} direction={'column'}>
                <TabButton active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
                  {tab.label === LIST_DEVICES.desktop ? <DesktopIcon /> : <MobileIcon />}{' '}
                  {tab.label}
                </TabButton>
                {activeTab === tab.id && <TabLine />}
              </Flex>
            ))}
          </Flex>
          <Flex style={{paddingBottom: '16px', gap: '24px'}}>
            <LinkDetails
              href={`https://developers.google.com/speed/pagespeed/insights/?url=${data.mainInfo.linkReq
                .replace(':', '%3A')
                .replaceAll('/', '%2F')}`}
              target="_blank"
              rel="noreferrer"
            >
              Open PageSpeed details <ArrowUpRightIcon />
            </LinkDetails>
            <RetestButton
              type="button"
              onClick={handleRefresh}
              disabled={state === STATE_TYPE.loading}
            >
              <RefreshIcon />
              Retest
            </RetestButton>
          </Flex>
        </Flex>
      </TabContainer>

      {activeRefreshID === data.mainInfo.linkReq &&
      state === STATE_TYPE.loading &&
      activeRefreshDevice === activeTab ? (
        <CustomSpinner />
      ) : (
        TABS.map((tab) => (
          <TabContent key={tab.id} active={activeTab === tab.id}>
            {Boolean(data?.categoryList?.length) && (
              <FirstSectionContainer>
                <Flex align={'center'} justify={'flex-end'} gap={5}>
                  {Boolean(data?.categoryList[0][activeTab]?.length) && (
                    <DescriptContainer>
                      <DescriptItem>
                        <TriangleIcon />
                        0–49
                      </DescriptItem>{' '}
                      <DescriptItem>
                        <SquareIcon />
                        50–89
                      </DescriptItem>{' '}
                      <DescriptItem>
                        <CircleIcon />
                        90–100
                      </DescriptItem>{' '}
                    </DescriptContainer>
                  )}
                </Flex>
                <RenderContainer>{renderDataByDevice(data)}</RenderContainer>
              </FirstSectionContainer>
            )}
            {renderHistoryComponent()}
          </TabContent>
        ))
      )}
    </Container>
  )
}

export default Tab

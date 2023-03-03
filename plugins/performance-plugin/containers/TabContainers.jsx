import React from 'react'
import {TabList, Card, Tab, TabPanel, Button} from '@sanity/ui'
import {MobileDeviceIcon, DesktopIcon} from '@sanity/icons'
import {RenderCoreData} from '../components/RenderCoreData'
import {RenderCategoriesData} from '../components/RenderCategoriesData'
import {apiRequestByDevice} from '../helpers/api-request'
import {STATE_TYPE, LIST_DEVICES} from '../helpers/constants'
import {CustomSpinner} from '../components/CustomSpinner'
import styled from 'styled-components'

const DivContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`
export const TabContainers = ({
  data,
  activeResult,
  setData,
  isRefreshForDevice,
  id,
  setId,
  setStateTabs,
  stateTabs,
}) => {
  const mobileData = data[activeResult]?.mobile[0]
  const desktopData = data[activeResult]?.desktop[0]

  const handelData = async (e) => {
    try {
      setStateTabs(STATE_TYPE.loading)
      const result = await apiRequestByDevice(data[activeResult]?.mainInfo?.linkReq, id)

      const newData = [...data].map((item, i) => {
        if (i === activeResult) {
          item[`${id}`] = result
        }
        return item
      })

      setData(newData)
      setStateTabs(STATE_TYPE.success)
    } catch (error) {
      setStateTabs(STATE_TYPE.error)
    }
  }

  const renderContainerForRequest = (device) =>
    stateTabs === STATE_TYPE.loading && device === isRefreshForDevice ? (
      <CustomSpinner />
    ) : (
      <Button
        fontSize={[2, 2, 3]}
        padding={[1, 1, 3]}
        text="Request data"
        tone="primary"
        onClick={handelData}
        disabled={stateTabs === STATE_TYPE.loading}
      />
    )

  const renderTabPanelData = (data, device) =>
    Boolean(data[activeResult][`${device}`]?.length) ? (
      <DivContainer>
        <RenderCoreData
          data={device === LIST_DEVICES.desktop ? desktopData.core : mobileData.core}
        />
        <RenderCategoriesData
          data={device === LIST_DEVICES.desktop ? desktopData.performance : mobileData.performance}
        />
      </DivContainer>
    ) : (
      renderContainerForRequest(device)
    )

  return (
    <Card padding={4}>
      <TabList space={2}>
        <Tab
          icon={DesktopIcon}
          id="desktop-tab"
          label="Desktop"
          onClick={() => setId(LIST_DEVICES.desktop)}
          selected={id === LIST_DEVICES.desktop}
          space={2}
        />
        <Tab
          icon={MobileDeviceIcon}
          id="mobile-tab"
          label="Mobile"
          onClick={() => setId(LIST_DEVICES.mobile)}
          selected={id === LIST_DEVICES.mobile}
          space={2}
        />
      </TabList>

      <TabPanel hidden={id !== LIST_DEVICES.desktop} id="desktop-panel">
        <Card border marginTop={2} padding={4} radius={2}>
          {isRefreshForDevice === LIST_DEVICES.desktop ? (
            <CustomSpinner />
          ) : (
            renderTabPanelData(data, LIST_DEVICES.desktop)
          )}
        </Card>
      </TabPanel>

      <TabPanel hidden={id !== LIST_DEVICES.mobile} id="mobile-panel">
        <Card border marginTop={2} padding={4}>
          {isRefreshForDevice === LIST_DEVICES.mobile ? (
            <CustomSpinner />
          ) : (
            renderTabPanelData(data, LIST_DEVICES.mobile)
          )}
        </Card>
      </TabPanel>
    </Card>
  )
}

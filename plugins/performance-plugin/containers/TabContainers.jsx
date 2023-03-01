import React, {useState} from 'react'
import {TabList, Card, Tab, TabPanel, Button} from '@sanity/ui'
import {MobileDeviceIcon, DesktopIcon} from '@sanity/icons'
import {RenderCoreData} from '../components/RenderCoreData'
import {RenderCategoriesData} from '../components/RenderCategoriesData'
import {apiRequestByDevice} from '../helpers/api-request'
import {STATE_TYPE} from '../helpers/constants'
import {CustomSpinner} from '../components/CustomSpinner'

export const TabContainers = ({data, activeResult, setData, isRefresh, id, setId}) => {
  const [state, setState] = useState(STATE_TYPE.idle)

  const handelData = async (e) => {
    try {
      setState(STATE_TYPE.loading)
      const result = await apiRequestByDevice(data[activeResult]?.mainInfo?.linkReq, id)

      const newData = [...data].map((item, i) => {
        if (i === activeResult) {
          item[`${id}`] = result
        }
        return item
      })

      setData(newData)
      setState(STATE_TYPE.success)
    } catch (error) {
      setState(STATE_TYPE.error)
    }
  }

  const renderContainerForRequest = () => {
    return state === STATE_TYPE.loading ? (
      <CustomSpinner />
    ) : (
      <div>
        <Button
          fontSize={[2, 2, 3]}
          padding={[1, 1, 3]}
          text="Request data"
          tone="primary"
          onClick={handelData}
          // disabled={errorMessage !== 'Is Valid URL' || errorMessage === '' || state === 'loading'}
        />
      </div>
    )
  }
  return (
    <Card padding={4}>
      <TabList space={2}>
        <Tab
          icon={DesktopIcon}
          id="desktop-tab"
          label="Desktop"
          onClick={() => setId('desktop')}
          selected={id === 'desktop'}
          space={2}
        />
        <Tab
          icon={MobileDeviceIcon}
          id="mobile-tab"
          label="Mobile"
          onClick={() => setId('mobile')}
          selected={id === 'mobile'}
          space={2}
        />
      </TabList>

      <TabPanel hidden={id !== 'desktop'} id="desktop-panel">
        <Card border marginTop={2} padding={4} radius={2}>
          {isRefresh && id === 'desktop' ? (
            <CustomSpinner />
          ) : Boolean(data[activeResult]?.desktop?.length) ? (
            <div style={{display: 'flex', gap: '24px', flexDirection: 'column'}}>
              <RenderCoreData data={data[activeResult]?.desktop[0]?.core} />
              <RenderCategoriesData data={data[activeResult]?.desktop[0]?.performance} />
            </div>
          ) : (
            renderContainerForRequest()
          )}
        </Card>
      </TabPanel>

      <TabPanel hidden={id !== 'mobile'} id="mobile-panel">
        <Card border marginTop={2} padding={4}>
          {isRefresh && id !== 'mobile' ? (
            <CustomSpinner />
          ) : Boolean(data[activeResult]?.mobile?.length) ? (
            <div style={{display: 'flex', gap: '24px', flexDirection: 'column'}}>
              <RenderCoreData data={data[activeResult]?.mobile[0]?.core} />
              <RenderCategoriesData data={data[activeResult]?.mobile[0]?.performance} />
            </div>
          ) : (
            renderContainerForRequest()
          )}
        </Card>
      </TabPanel>
    </Card>
  )
}

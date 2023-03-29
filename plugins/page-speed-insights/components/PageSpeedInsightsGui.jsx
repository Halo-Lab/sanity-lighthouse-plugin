import React, {useState, useEffect} from 'react'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants'
import {Container} from '../styles/PageSpeedInsightsGuiStyles'
import {InputComponent} from './InputComponent'
import HistoryMenu from './HistoryMenu'
import {Flex, Text} from '@sanity/ui'
import {apiRequestByDeviceAllCategories} from '../helpers/apiRequest'
import {formatDataList} from '../helpers/formatedData'
import Tab from './TabComponent'
import Loading from './shared/LoadingComponent'
import {CustomSpinner} from './shared/CustomSpinner'

const PageSpeedInsightsGui = (props) => {
  const [state, setState] = useState(STATE_TYPE.idle)
  const [url, setUrl] = useState('')
  const [device, setDevice] = useState('Desktop')
  const [data, setData] = useState([])
  const [activeItem, setActiveItem] = useState(0)
  const [activeTab, setActiveTab] = useState(LIST_DEVICES.desktop)
  const [activeRefreshID, setActiveRefreshID] = useState('')
  const [activeRefreshDevice, setActiveRefreshDevice] = useState('')

  useEffect(() => {
    const getDocumentById = async () => {
      const doc = await props.client.getDocument('performance')
      if (Boolean(doc.data.length)) {
        setData(doc.data)
      }
    }
    getDocumentById()
  }, [])

  const handelRequest = async () => {
    try {
      setState(STATE_TYPE.loading)
      const result = await apiRequestByDeviceAllCategories(url, device)
      const newData = [formatDataList(result), ...data]
      setData(newData)
      setActiveTab(device.toLowerCase())
      setActiveItem(0)
      patchSanityDocument(newData)
      setUrl('')
      setState(STATE_TYPE.success)
    } catch (error) {
      console.log(error)
      setState(STATE_TYPE.error)
    }
  }

  const handleRefresh = async (e) => {
    try {
      setState(STATE_TYPE.loading)
      setActiveRefreshID(data[activeItem].mainInfo.linkReq)
      setActiveRefreshDevice(activeTab)
      const result = await apiRequestByDeviceAllCategories(
        data[activeItem]?.mainInfo?.linkReq,
        activeTab
      )
      const newResult = [formatDataList(result)]

      const newData = [...data].map((item, i) => {
        if (i === activeItem) {
          item.mainInfo.date = newResult[0].mainInfo.date
          item.categoryList.map((category, idx) => {
            category[activeTab] = newResult[0].categoryList[idx][activeTab]
          })
          item.history[activeTab].push([
            newResult[0].mainInfo.date,
            ...newResult[0].categoryList.map((it) => it[activeTab][0].score),
          ])
        }
        return item
      })

      setData(newData)
      patchSanityDocument(newData)
      setState(STATE_TYPE.success)
      setActiveRefreshID('')
      setActiveRefreshDevice('')
    } catch (error) {
      console.log(error)
      setState(STATE_TYPE.error)
    }
  }

  const patchSanityDocument = (newData) => {
    if (!Boolean(newData.length)) return
    props.client
      .patch('performance')
      .set({data: newData})
      .commit()
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message)
      })
  }

  const deleteCardByID = (link, idx) => {
    setState(STATE_TYPE.loading)
    console.log(1)
    setData([...data].filter((item) => item.mainInfo.linkReq !== link))
    props.client
      .patch('performance')
      .unset([`data[${idx}]`])
      .commit()

    setState(STATE_TYPE.success)
  }

  return (
    <Container>
      <Flex
        direction={'column'}
        style={{
          outline: '2px solid gray',
        }}
      >
        <InputComponent
          device={device}
          setDevice={setDevice}
          state={state}
          url={url}
          setUrl={setUrl}
          data={data}
          handelRequest={handelRequest}
        />
        {Boolean(data.length) ? (
          <HistoryMenu
            data={data}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
            state={state}
            deleteCardByID={deleteCardByID}
          />
        ) : state === STATE_TYPE.loading ? (
          <div style={{minHeight: '16px', padding: '20px 0 0 0'}}>
            <Loading active={state === STATE_TYPE.loading} />
          </div>
        ) : (
          <Flex justify="center" padding={4}>
            <Text>Your history will show up here.</Text>
          </Flex>
        )}
      </Flex>
      {Boolean(data.length) && (
        <Tab
          data={data[activeItem]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleRefresh={handleRefresh}
          state={state}
          activeRefreshID={activeRefreshID}
          activeRefreshDevice={activeRefreshDevice}
        />
      )}
      {state === STATE_TYPE.loading && !Boolean(data.length) && <CustomSpinner />}
    </Container>
  )
}

export default PageSpeedInsightsGui

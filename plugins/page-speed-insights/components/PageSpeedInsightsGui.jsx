import React, {useState, useEffect} from 'react'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants'
import {Container} from '../styles/PageSpeedInsightsGuiStyles'
import {InputComponent} from './InputComponent'
import HistoryMenu from './HistoryMenu'
import {Flex, Text, Button} from '@sanity/ui'
import {apiReqByAllDevice, apiRequestByDeviceAllCategories} from '../helpers/apiRequest'
import {formatDataList} from '../helpers/formatedData'
import Tab from './TabComponent'
import Loading from './shared/LoadingComponent'
import {CustomSpinner} from './shared/CustomSpinner'
import {getMonthByIdx} from '../helpers/functions'

const PageSpeedInsightsGui = (props) => {
  const [state, setState] = useState(STATE_TYPE.idle)
  const [url, setUrl] = useState('')
  const [device, setDevice] = useState([])
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
      let result, newData
      if (device.length > 1) {
        result = await apiReqByAllDevice(url, true, true)

        const newResult1 = [formatDataList(result.slice(0, 5))]

        const newResult2 = [formatDataList(result.slice(5))]

        newResult1[0].categoryList.map((category, idx) => {
          category.mobile = newResult2[0].categoryList[idx].mobile
        })
        newResult1[0].history.mobile.push([
          newResult2[0].mainInfo.date,
          ...newResult2[0].categoryList.map((sc) => sc.mobile[0].score),
          getMonthByIdx(new Date(newResult2[0].mainInfo.date).getMonth()),
        ])
        newData = [...newResult1, ...data]
      } else {
        result = await apiRequestByDeviceAllCategories(url, device[0])
        newData = [formatDataList(result), ...data]
      }
      console.log(newData)
      setData(newData)
      setActiveTab([])
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
            getMonthByIdx(new Date(newResult[0].mainInfo.date).getMonth()),
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

  const handelRefreshAll = async () => {
    try {
      setState(STATE_TYPE.loading)
      let numberOfReq = 0,
        newDataArr = []

      while (numberOfReq < data.length) {
        try {
          let newData = [...data][numberOfReq]
          const reqFor = data[numberOfReq].categoryList[0]
          const result = await apiReqByAllDevice(
            data[numberOfReq].mainInfo.linkReq,
            Boolean(reqFor.desktop.length),
            Boolean(reqFor.mobile.length)
          )

          if (Boolean(result.length > 5)) {
            const newResult1 = [formatDataList(result.slice(0, 5))]

            const newResult2 = [formatDataList(result.slice(5))]

            newData.mainInfo.date = newResult1[0].mainInfo.date
            newData.categoryList.map((category, idx) => {
              category.mobile = newResult2[0].categoryList[idx].mobile
              category.desktop = newResult1[0].categoryList[idx].desktop
            })
            newData.history.mobile.push([
              newResult2[0].mainInfo.date,
              ...newResult2[0].categoryList.map((sc) => sc.mobile[0].score),
              getMonthByIdx(new Date(newResult2[0].mainInfo.date).getMonth()),
            ])
            newData.history.desktop.push([
              newResult1[0].mainInfo.date,
              ...newResult1[0].categoryList.map((sc) => sc.desktop[0].score),
              getMonthByIdx(new Date(newResult1[0].mainInfo.date).getMonth()),
            ])
          } else {
            const newResult = [formatDataList(result)]

            const forDevice = newResult[0].mainInfo.device
            console.log(forDevice)
            newData.mainInfo.date = newResult[0].mainInfo.date
            newData.categoryList.map((category, idx) => {
              category[forDevice] = newResult[0].categoryList[idx][forDevice]
            })
            newData.history[forDevice].push([
              newResult[0].mainInfo.date,
              ...newResult[0].categoryList.map((sc) => sc[forDevice][0].score),
              getMonthByIdx(new Date(newResult[0].mainInfo.date)),
            ])
          }

          newDataArr.push(newData)
          numberOfReq += 1
        } catch (error) {
          console.error(error)
        }
      }
      setData(newDataArr)
      patchSanityDocument(newDataArr)
      setActiveRefreshID('')
      setActiveRefreshDevice('')
      setState(STATE_TYPE.success)
    } catch (error) {
      setState(STATE_TYPE.error)
    }
  }

  return (
    <Container>
      <Flex
        direction={'column'}
        style={{
          outline: '2px solid gray',
          padding: '0 8px',
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
        {Boolean(data.length > 1) && (
          <Flex
            justify={'center'}
            padding={4}
            style={{margin: 'auto 0 0 0', borderTop: '1px solid gray'}}
          >
            <Button
              fontSize={[2, 2, 3]}
              padding={[1, 1, 3]}
              text="Refresh all"
              tone="primary"
              onClick={handelRefreshAll}
              disabled={state === STATE_TYPE.loading}
            />
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

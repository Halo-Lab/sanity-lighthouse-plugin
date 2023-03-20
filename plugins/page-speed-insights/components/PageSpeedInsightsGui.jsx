import React, {useState, useEffect} from 'react'
import {STATE_TYPE} from '../helpers/constants'
import {Container} from '../styles/PageSpeedInsightsGuiStyles'
import {InputComponent} from './InputComponent'
import HistoryMenu from './HistoryMenu'
import {Stack, Radio, TextInput, Button, Inline, Flex, Text, Box} from '@sanity/ui'
import {apiRequestByDeviceAllCategories} from '../helpers/apiRequest'
import {formatDataList} from '../helpers/formatedData'
import Tab from './TabComponent'
import {MobileDeviceIcon, DesktopIcon} from '@sanity/icons'

const PageSpeedInsightsGui = (props) => {
  const [state, setState] = useState(STATE_TYPE.idle)
  const [url, setUrl] = useState('')
  const [device, setDevice] = useState('Desktop')
  const [data, setData] = useState([])
  const [activeItem, setActiveItem] = useState(0)

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
      setData([formatDataList(result), ...data])
      setState(STATE_TYPE.success)
    } catch (error) {
      console.log(error)
      setState(STATE_TYPE.error)
    }
  }
  console.log(data)

  return (
    <Container>
      <Flex
        direction={'column'}
        style={{
          outline: '2px solid gray',
        }}
        padding={[2, 3]}
        width={'fill'}
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
          />
        ) : state === STATE_TYPE.loading ? (
          <div>spiner</div>
        ) : (
          <Flex justify="center" padding={4}>
            <Text>Your history will show up here.</Text>
          </Flex>
        )}
      </Flex>
      {Boolean(data.length) && <Tab data={data[activeItem]} />}
    </Container>
  )
}

export default PageSpeedInsightsGui

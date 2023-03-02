import React, {useState} from 'react'
import {Container, Card, Flex, Heading, Box, Text, Button} from '@sanity/ui'
import {CustomInput} from './CustomInput'
import {apiRequest, apiRequestByDevice} from '../helpers/api-request'
import styled from 'styled-components'
import {SearchMenu} from './SearchMenu'
import {CustomSpinner} from './CustomSpinner'
import {formatData} from '../helpers/formatData'
import {TabContainers} from '../containers/TabContainers'
import {LIST_DEVICES, STATE_TYPE} from '../helpers/constants'
import {SyncIcon} from '@sanity/icons'

const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 40px;
  padding: 40px 0;
`

export const PerformanceGui = (props) => {
  const [state, setState] = useState(STATE_TYPE.idle)
  const [stateTabs, setStateTabs] = useState(STATE_TYPE.idle)
  const [url, setUrl] = useState('')
  const [device, setDevice] = useState('Desktop')
  const [data, setData] = useState([])
  const [activeResult, setActiveResult] = useState(0)
  const [isRefreshForDevice, setIsRefreshForDevice] = useState(null)
  const [id, setId] = useState('desktop')

  const handleSubmit = async (e) => {
    try {
      setState(STATE_TYPE.loading)
      //api request (url: string from input, device = Mobile or Desktop)
      const result = await apiRequest(url, device.toLowerCase())
      //add to array formatted data from result
      setData([formatData(result), ...data])
      setUrl('')
      setState(STATE_TYPE.success)
    } catch (error) {
      console.log(error)
      setState(STATE_TYPE.error)
    }
  }
  const deleteCardByID = (id) => {
    setData([...data].filter((item) => item.mainInfo.linkReq !== id))
    setActiveResult(0)
  }

  const handleRefresh = async (e) => {
    try {
      setStateTabs(STATE_TYPE.loading)
      console.log(LIST_DEVICES[id])
      setIsRefreshForDevice(LIST_DEVICES[id])
      const result = await apiRequestByDevice(data[activeResult]?.mainInfo?.linkReq, id)
      const newData = [...data].map((item, i) => {
        if (i === activeResult) {
          item[`${id}`] = result
        }
        return item
      })

      setData(newData)
      // setIsRefresh(false)
      setIsRefreshForDevice(null)
      setStateTabs(STATE_TYPE.success)
    } catch (error) {
      setState(STATE_TYPE.error)
    }
  }

  return (
    <Container width={3} padding={2}>
      <CustomGrid>
        <Flex direction={'column'} gap={5}>
          <Text>https://www.pinterest.com/ https://felyx.com/</Text>
          <CustomInput
            handleSubmit={handleSubmit}
            setUrl={setUrl}
            setDevice={setDevice}
            device={device}
            state={state}
            stateTabs={stateTabs}
            url={url}
            data={data}
          />
          <Box style={{outline: '2px solid gray'}} padding={[2, 3]}>
            <Heading>History:</Heading>
            {state === 'loading' && <CustomSpinner />}
            {Boolean(data?.length) && (
              <SearchMenu
                items={data}
                setActiveResult={setActiveResult}
                state={state}
                deleteCardByID={deleteCardByID}
                stateTabs={stateTabs}
              />
            )}
          </Box>
        </Flex>
        <Card>
          {state === STATE_TYPE.loading ? (
            <CustomSpinner />
          ) : (
            Boolean(data.length) && (
              <Box style={{outline: '2px solid gray', position: 'relative'}} padding={[2, 3]}>
                {Boolean(data[activeResult][`${id}`].length) && (
                  <div style={{position: 'absolute', top: 0, right: 0, padding: '2rem 2rem 0 0'}}>
                    <Button
                      fontSize={[2]}
                      icon={SyncIcon}
                      padding={[2]}
                      text="Refresh"
                      tone="caution"
                      onClick={handleRefresh}
                      disabled={stateTabs === 'loading'}
                    />
                  </div>
                )}
                <TabContainers
                  data={data}
                  activeResult={activeResult}
                  setData={setData}
                  isRefreshForDevice={isRefreshForDevice}
                  setId={setId}
                  id={id}
                  setStateTabs={setStateTabs}
                  stateTabs={stateTabs}
                />
              </Box>
            )
          )}
        </Card>
      </CustomGrid>
    </Container>
  )
}

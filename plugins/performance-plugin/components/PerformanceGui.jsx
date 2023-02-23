import React, {useState} from 'react'
import {Container, Card, Flex, Heading, Box, Text} from '@sanity/ui'
import {CustomInput} from './CustomInput'
import {apiRequest} from '../helpers/api-request'
import styled from 'styled-components'
import {SearchMenu} from './SearchMenu'
import {CustomSpinner} from './CustomSpinner'
import {formatData} from '../helpers/formatDate'
import {RenderCoreData} from './RenderCoreData'

const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 40px;
  padding: 40px 0;
`
const stateType = {idle: 'idle', loading: 'loading', success: 'success', error: 'error'}

export const PerformanceGui = (props) => {
  const [state, setState] = useState(stateType.idle)
  const [url, setUrl] = useState('')
  const [device, setDevice] = useState('Desktop')
  const [data, setData] = useState([])
  const [activeResult, setActiveResult] = useState(0)

  const handleSubmit = async (e) => {
    try {
      setState(stateType.loading)
      //api request (url: string from input, device = Mobile or Desktop)
      const result = await apiRequest(url, device.toLowerCase())
      //add to array formatted data from result
      setData([...data, formatData(result)])
      setUrl('')
      setState(stateType.success)
    } catch (error) {
      console.log(error)
      setState(stateType.error)
    }
  }

  return (
    <Container width={3} padding={2}>
      <CustomGrid>
        <Flex direction={'column'} gap={5}>
          <CustomInput
            handleSubmit={handleSubmit}
            setUrl={setUrl}
            setDevice={setDevice}
            device={device}
            state={state}
            url={url}
          />
          <Box style={{outline: '2px solid gray'}} padding={[2, 3]}>
            <Heading>History:</Heading>
            {Boolean(data?.length) && (
              <SearchMenu items={data} setActiveResult={setActiveResult} state={state} />
            )}
            {state === 'loading' && <CustomSpinner />}
          </Box>
        </Flex>
        <Card>
          {state === stateType.loading ? (
            <CustomSpinner />
          ) : (
            <Box style={{outline: '2px solid gray'}} padding={[2, 3]}>
              {/* <Heading>Result: {data?.length ? parseDate(data[activeResult]) : ''}</Heading> */}

              {/* {RenderCoreData(data.length ? data[activeResult].core : [])} */}
              {RenderCoreData()}
            </Box>
          )}
        </Card>
      </CustomGrid>
    </Container>
  )
}

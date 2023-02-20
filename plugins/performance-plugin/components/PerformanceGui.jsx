import React, {useState} from 'react'
import {Container, Card, Flex, Heading, Box} from '@sanity/ui'
import {CustomInput} from './CustomInput'
import {apiRequest} from '../helpers/api-request'
import styled from 'styled-components'
import {SearchMenu} from './SearchMenu'
import {CustomSpinner} from './CustomSpinner'
import {parseDate} from '../helpers/RenderContent'

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
  const [data, setData] = useState([])
  const [listReq, setListReq] = useState([])
  const [activeResult, setActiveResult] = useState(0)

  const handleSubmit = async (e) => {
    try {
      setState(stateType.loading)
      setListReq([...listReq, url])
      const result = await apiRequest(url)
      setData([...data, result])
      setState(stateType.success)
    } catch (error) {
      console.log(error)
      setState(stateType.error)
    }
  }

  return (
    <Container width={3}>
      <CustomGrid>
        <Flex direction={'column'} gap={5}>
          <CustomInput handleSubmit={handleSubmit} setUrl={setUrl} />
          <Box>
            <Heading>Search Request:</Heading>
            {!Boolean(listReq?.length) ? (
              <div>Empty</div>
            ) : (
              <SearchMenu items={listReq} setActiveResult={setActiveResult} state={state} />
            )}
          </Box>
        </Flex>
        <Card>
          {state === stateType.loading ? (
            <CustomSpinner />
          ) : (
            <Heading>Result: {data?.length ? parseDate(data[activeResult]) : ''}</Heading>
          )}
        </Card>
      </CustomGrid>
    </Container>
  )
}

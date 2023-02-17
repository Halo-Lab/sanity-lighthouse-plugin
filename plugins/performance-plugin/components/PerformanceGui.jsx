import React, {useState, useEffect} from 'react'
import {Container, Card, Grid, Flex, Heading, Box} from '@sanity/ui'
import {CustomInput} from '../../../components/CustomInput'
import {apiRequest} from '../../../helpers/api-request'
import styled from 'styled-components'
import {SearchMenu} from './SearchMenu'
import {CustomSpinner} from './CustomSpinner'
const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 40px;
  padding: 40px 0;
`
const stateType = {idle: 'idle', loading: 'loading', success: 'success', error: 'error'}

const showInitialContent = (id) => (
  <div>
    <h1>PageSpeed Insights API Demo</h1>
    <p>Page tested: ${id}</p>
  </div>
)

const showCruxContent = (cruxMetrics) => {
  let newItems = []

  for (let key in cruxMetrics) {
    newItems.push(`${key}: ${cruxMetrics[key]}`)
  }

  const renderMetrics = (items) => items.map((item, i) => <p key={`${item}`}>{item}</p>)
  return (
    <div>
      <h2>Chrome User Experience Report Results</h2>
      {renderMetrics(newItems)}
    </div>
  )
}
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
  const parseDate = (data) => {
    const {loadingExperience, lighthouseResult, id} = data
    const cruxMetrics = {
      'First Contentful Paint': loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
      'First Input Delay': loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category,
    }
    return (
      <div>
        {showInitialContent(id)}
        {showCruxContent(cruxMetrics)}
      </div>
    )
  }
  return (
    <Container width={3}>
      <CustomGrid>
        <Flex direction={'column'} gap={5}>
          <CustomInput handleSubmit={handleSubmit} setUrl={setUrl} />
          <Box>
            <Heading>Search Request:</Heading>
            {state === stateType.loading ? (
              <CustomSpinner />
            ) : (
              <SearchMenu items={listReq} setActiveResult={setActiveResult} />
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

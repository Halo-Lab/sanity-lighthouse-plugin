import React from 'react'
import {useClient} from 'sanity'
import PageSpeedInsightsContainer from './containers/PageSpeedInsightsContainer'

function PageSpeedPlugin(props) {
  const client = useClient({apiVersion: '2023-01-24'})

  // client.delete('performance')
  const doc = {
    _id: 'performance',
    _type: 'document',
    name: 'Sanity Performance Data',
    data: [],
  }
  client.createIfNotExists(doc)
  return <PageSpeedInsightsContainer client={client} />
}

export default PageSpeedPlugin

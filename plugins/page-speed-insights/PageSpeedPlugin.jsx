import React from 'react'
import {useClient} from 'sanity'
import PageSpeedInsightsContainer from './containers/PageSpeedInsightsContainer'

function PageSpeedPlugin(props) {
  const client = useClient({apiVersion: '2023-01-24'})

  return <PageSpeedInsightsContainer client={client} />
}

export default PageSpeedPlugin

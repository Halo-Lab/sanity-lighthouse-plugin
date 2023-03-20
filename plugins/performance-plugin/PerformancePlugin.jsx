import React from 'react'
import {useClient} from 'sanity'
import PerformanceContainer from './containers/PerformanceContainer'
import './styles/global.css'

function PerformancePlugin(props) {
  const client = useClient({apiVersion: '2023-01-24'})
  const config = {
    defaultApiVersion: 'v2021-10-21',
    // ...props.tool.options,
  }
  // client.delete('performance')
  const doc = {
    _id: 'performance',
    _type: 'document',
    name: 'Sanity Performance Data',
    data: [],
  }
  client.createIfNotExists(doc)

  return <PerformanceContainer client={client} config={config} />
}

export default PerformancePlugin

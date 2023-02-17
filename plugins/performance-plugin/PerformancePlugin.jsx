import React from 'react'
import {useClient} from 'sanity'
import PerformanceContainer from './containers/PerformanceContainer'

function PerformancePlugin(props) {
  const client = useClient({apiVersion: '1'})
  const config = {
    defaultApiVersion: 'v2021-10-21',
    // ...props.tool.options,
  }

  return <PerformanceContainer client={client} config={config} />
}

export default PerformancePlugin

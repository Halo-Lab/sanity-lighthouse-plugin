import React from 'react'
import {useToast} from '@sanity/ui'
import {PerformanceGui} from '../components/PerformanceGui'

const PerformanceContainer = (props) => {
  const toast = useToast()
  return <PerformanceGui toast={toast} {...props} />
}

export default PerformanceContainer

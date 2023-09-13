import {useClient} from 'sanity'
import PageSpeedInsightsContainer from './containers/PageSpeedInsightsContainer'
import {IPageSpeedPlugin} from './types'

function LighthousePlugin(props: IPageSpeedPlugin) {
  const client = useClient({apiVersion: '2023-01-24'})

  const doc = {
    _id: 'lighthouse.performance',
    _type: 'lighthouse.settings',
    name: 'Sanity Performance Data',
    data: [],
  }
  client.createIfNotExists(doc)
  return <PageSpeedInsightsContainer client={client} {...props} />
}

export default LighthousePlugin

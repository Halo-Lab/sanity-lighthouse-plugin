import {SanityClient} from 'sanity'
import {Flex, Text} from '@sanity/ui'
import {useState, useEffect} from 'react'
import {SettingsView, useSecrets} from '@sanity/studio-secrets'

import Tab from './TabComponent'
import HistoryMenu from './HistoryMenu'
import {InputComponent} from './InputComponent'
import Loading from './shared/LoadingComponent'
import {getMonthByIdx} from '../helpers/functions'
import {CustomSpinner} from './shared/CustomSpinner'
import {formatDataList} from '../helpers/formatedData'
import {RefreshIcon} from '../assets/icons/RefreshIcon'
import {ICategoryItem, IPluginData} from '../types'
import {ButtonResetAll, Container} from '../styles/PageSpeedInsightsGuiStyles'
import {apiReqByAllDevice, apiRequestByDeviceAllCategories} from '../helpers/apiRequest'
import {
  STATE_TYPE,
  LIST_DEVICES,
  SECRETS_NAMESPACE,
  SECRETS_PLUGIN_CONFIG_KEYS,
} from '../helpers/constants'

const errorMassageText = 'Server error. Please try again later.'

const PageSpeedInsightsGui = ({client}: {client: SanityClient}) => {
  const {secrets, loading} = useSecrets<Record<string, string>>(SECRETS_NAMESPACE)

  const [state, setState] = useState(STATE_TYPE.idle)
  const [url, setUrl] = useState<string>('')
  const [device, setDevice] = useState([])
  const [data, setData] = useState<IPluginData[]>([])
  const [activeItem, setActiveItem] = useState(0)
  const [activeTab, setActiveTab] = useState<string>(LIST_DEVICES.desktop)
  const [activeRefreshID, setActiveRefreshID] = useState('')
  const [activeRefreshDevice, setActiveRefreshDevice] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [showSecretsModal, setShowSecretsModal] = useState(false)

  useEffect(() => {
    if (!loading) {
      const secretKey = secrets ? secrets[SECRETS_PLUGIN_CONFIG_KEYS[0].key] : ''

      setShowSecretsModal(!secretKey)

      setApiKey(secretKey)
    }
  }, [secrets, loading])

  useEffect(() => {
    const getDocumentById = async () => {
      const doc = await client.getDocument('performance')
      if (doc?.data.length) {
        setData(doc?.data)
      }
    }
    getDocumentById()
  }, [])

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }, [errorMessage])

  const patchSanityDocument = (newData: IPluginData[]) => {
    if (!newData.length) return
    client
      .patch('performance')
      .set({data: newData})
      .commit()
      .catch((err: Error) => {
        console.error('Oh no, the update failed: ', err.message)
      })
  }

  const handleRequest = async () => {
    try {
      setState(STATE_TYPE.loading)
      let result
      let newData
      if (device.length > 1) {
        result = await apiReqByAllDevice(url, true, true, apiKey)

        const newResult1 = [formatDataList(result.slice(0, 5))]

        const newResult2 = [formatDataList(result.slice(5))]

        newResult1[0].categoryList.map((category: ICategoryItem, idx: number) => {
          category.mobile = newResult2[0].categoryList[idx].mobile
        })
        newResult1[0].history.mobile.push([
          newResult2[0].mainInfo.date,
          ...newResult2[0].categoryList.map((sc) => sc.mobile[0].score),
          getMonthByIdx(new Date(newResult2[0].mainInfo.date).getMonth()),
        ])
        newData = [...newResult1, ...data]
      } else {
        result = await apiRequestByDeviceAllCategories(url, device[0], apiKey)
        newData = [formatDataList(result), ...data]
      }

      setData(newData)
      setActiveTab(device[0])
      setActiveItem(0)
      patchSanityDocument(newData)
      setUrl('')
      setState(STATE_TYPE.success)
    } catch (error) {
      console.log(error)
      setErrorMessage(errorMassageText)
      setState(STATE_TYPE.error)
    }
  }

  const handleRefresh = async () => {
    try {
      setState(STATE_TYPE.loading)
      setActiveRefreshID(data[activeItem].mainInfo.linkReq)
      setActiveRefreshDevice(activeTab)
      const result = await apiRequestByDeviceAllCategories(
        data[activeItem]?.mainInfo?.linkReq,
        activeTab,
        apiKey
      )
      const newResult = [formatDataList(result)]

      const newData = [...data].map((item, i) => {
        if (i === activeItem) {
          item.mainInfo.date = newResult[0].mainInfo.date
          item.categoryList.map((category: ICategoryItem, idx: number) => {
            category[activeTab] = newResult[0].categoryList[idx][activeTab]
          })
          item.history[activeTab].push([
            newResult[0].mainInfo.date,
            ...newResult[0].categoryList.map((it) => it[activeTab][0].score),
            getMonthByIdx(new Date(newResult[0].mainInfo.date).getMonth()),
          ])
        }
        return item
      })

      setData(newData)
      patchSanityDocument(newData)
      setState(STATE_TYPE.success)
      setActiveRefreshID('')
      setActiveRefreshDevice('')
    } catch (error) {
      console.log(error)
      setErrorMessage(errorMassageText)
      setState(STATE_TYPE.error)
    }
  }

  const deleteCardByID = (link: string, idx: number) => {
    setState(STATE_TYPE.loading)
    client
      .patch('performance')
      .unset([`data[${idx}]`])
      .commit()
    setData([...data].filter((item) => item.mainInfo.linkReq !== link))

    setState(STATE_TYPE.success)
  }

  const handelRefreshAll = async () => {
    try {
      setState(STATE_TYPE.loading)
      let numberOfReq = 0
      const newDataArr: IPluginData[] = []

      while (numberOfReq < data.length) {
        try {
          const newData = [...data][numberOfReq]
          const reqFor = data[numberOfReq].categoryList[0]
          const result = await apiReqByAllDevice(
            data[numberOfReq].mainInfo.linkReq,
            Boolean(reqFor.desktop.length),
            Boolean(reqFor.mobile.length),
            apiKey
          )

          if (result.length > 5) {
            const newResult1 = [formatDataList(result.slice(0, 5))]
            const newResult2 = [formatDataList(result.slice(5))]

            newData.mainInfo.date = newResult1[0].mainInfo.date
            newData.categoryList.map((category: ICategoryItem, idx: number) => {
              category.mobile = newResult2[0].categoryList[idx].mobile
              category.desktop = newResult1[0].categoryList[idx].desktop
            })
            newData.history.mobile.push([
              newResult2[0].mainInfo.date,
              ...newResult2[0].categoryList.map((sc) => sc.mobile[0].score),
              getMonthByIdx(new Date(newResult2[0].mainInfo.date).getMonth()),
            ])
            newData.history.desktop.push([
              newResult1[0].mainInfo.date,
              ...newResult1[0].categoryList.map((sc) => sc.desktop[0].score),
              getMonthByIdx(new Date(newResult1[0].mainInfo.date).getMonth()),
            ])
          } else {
            const newResult = [formatDataList(result)]

            const forDevice = newResult[0].mainInfo.device

            newData.mainInfo.date = newResult[0].mainInfo.date
            newData.categoryList.map((category: ICategoryItem, idx: number) => {
              category[forDevice] = newResult[0].categoryList[idx][forDevice]
            })
            newData.history[forDevice].push([
              newResult[0].mainInfo.date,
              ...newResult[0].categoryList.map((sc) => sc[forDevice][0].score),
              getMonthByIdx(new Date(newResult[0].mainInfo.date)),
            ])
          }

          newDataArr.push(newData)
          numberOfReq += 1
        } catch (error) {
          console.error(error)
        }
      }
      setData(newDataArr)
      patchSanityDocument(newDataArr)
      setActiveRefreshID('')
      setActiveRefreshDevice('')
      setState(STATE_TYPE.success)
    } catch (error) {
      setErrorMessage(errorMassageText)
      setState(STATE_TYPE.error)
    }
  }

  return (
    <Container>
      {apiKey && (
        <>
          <Flex
            direction={'column'}
            style={{
              borderRight: '1px solid #E4E6E8',
            }}
          >
            <ButtonResetAll
              style={{marginTop: '5px'}}
              type="button"
              onClick={() => setShowSecretsModal(true)}
              disabled={state === STATE_TYPE.loading}
            >
              Change API Key
            </ButtonResetAll>
            <Flex direction={'column'} style={{padding: '30px 24px 40px 24px'}}>
              <InputComponent
                device={device}
                setDevice={setDevice}
                state={state}
                url={url}
                setUrl={setUrl}
                data={data}
                handleRequest={handleRequest}
              />
              {data.length ? (
                <HistoryMenu
                  data={data}
                  setActiveItem={setActiveItem}
                  activeItem={activeItem}
                  state={state}
                  deleteCardByID={deleteCardByID}
                />
              ) : state === STATE_TYPE.loading ? (
                <div style={{minHeight: '16px', padding: '20px 0 0 0'}}>
                  <Loading active={state === STATE_TYPE.loading} />
                </div>
              ) : (
                <Flex justify="center" padding={4}>
                  <Text>Your history will show up here.</Text>
                </Flex>
              )}
            </Flex>
            {Boolean(data.length > 1) && (
              <Flex
                gap={5}
                justify={'center'}
                style={{padding: '24px', margin: 'auto 0 0 0', borderTop: '1px solid #E4E6E8'}}
              >
                <ButtonResetAll
                  type="button"
                  onClick={handelRefreshAll}
                  disabled={state === STATE_TYPE.loading}
                >
                  <RefreshIcon />
                  Retest all
                </ButtonResetAll>
              </Flex>
            )}
          </Flex>
          {Boolean(data.length) && (
            <Tab
              data={data[activeItem]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleRefresh={handleRefresh}
              state={state}
              activeRefreshID={activeRefreshID}
              activeRefreshDevice={activeRefreshDevice}
            />
          )}
          {state === STATE_TYPE.loading && !data.length && <CustomSpinner />}
        </>
      )}
      {showSecretsModal && (
        <SettingsView
          title={'API KEY'}
          namespace={SECRETS_NAMESPACE}
          keys={SECRETS_PLUGIN_CONFIG_KEYS}
          onClose={() => setShowSecretsModal(false)}
        />
      )}
    </Container>
  )
}

export default PageSpeedInsightsGui

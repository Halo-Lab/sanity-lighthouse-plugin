import React, {useState, useCallback} from 'react'
import styled, {keyframes} from 'styled-components'
import {Flex} from '@sanity/ui'
import {LIST_DEVICES} from '../helpers/constants'
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s ease-in-out;
  border-bottom: 2px solid gray;
`

const TabButton = styled.button`
  background-color: ${({active}) => (active ? 'gray' : '#dddddd')};
  color: ${({active}) => (active ? '#fff' : '#666666')};
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({active}) => (active ? '#ffffff' : '#bbbbbb')};
    color: ${({active}) => (active ? '#333333' : '#555555')};
  }
`

const TabContent = styled.div`
  display: ${({active}) => (active ? 'block' : 'none')};
  animation: ${fadeIn} 0.5s ease-in-out;
`

const tabs = [
  {id: LIST_DEVICES.desktop, label: LIST_DEVICES.desktop.toUpperCase()},
  {id: LIST_DEVICES.mobile, label: LIST_DEVICES.mobile.toUpperCase()},
]

const Tab = ({data}) => {
  const [activeTab, setActiveTab] = useState(data.mainInfo.device)
  console.log(activeTab, data)
  const renderDataByDevice = useCallback(
    (data) => {
      return data.categoryList.map((item) => {
        return (
          <div key={`${item[activeTab].score}-${Math.random()}`}>{item[activeTab][0].score}</div>
        )
      })
    },
    [activeTab]
  )
  return (
    <Container>
      <TabContainer>
        <Flex>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </Flex>
      </TabContainer>
      {tabs.map((tab) => (
        <TabContent key={tab.id} active={activeTab === tab.id}>
          {Boolean(data?.categoryList?.length) && <div>{renderDataByDevice(data)}</div>}
        </TabContent>
      ))}
    </Container>
  )
}

export default Tab

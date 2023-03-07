import React from 'react'
import styled from 'styled-components'
import {Tooltip, Text, Box, Flex} from '@sanity/ui'
import {CustomPieChart} from './shared/CustomPieChart'
import {COLORS} from './shared/CustomPieChart'
import Accordion from './shared/Accordion'
import {GoogleChart} from './shared/GoogleChart'

const dataChart = [
  {value: 25, color: '#FF6384'},
  {value: 50, color: '#36A2EB'},
  {value: 75, color: '#FFCE56'},
]
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
// flex-direction: column;
const InfoContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`
const ValueCenter = styled.div`
  position: absolute;
  left: 53%;
  top: 53%;
  transform: translate(-50%, -50%);
`
const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const TooltipContainerItems = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`
const Link = styled.a`
  text-decoration: underline;
  color: #3c4043;
  :hover {
    color: #1a73e8;
  }
`
const options = {
  legend: 'none',
  // pieSliceText: 'none',
  // pieSliceTextStyle: {color: 'black', fontName: 'Helvetica Neue', fontSize: 21},
  // pieStartAngle: 135,
  tooltip: {trigger: 'none'},
  colors: COLORS,
  pieHole: 0.6,
  is3D: false,
  backgroundColor: 'transparent',
}

export const RenderCoreData = ({data = []}) => {
  if (!data.length) return

  const renderCoreItems = (items) =>
    items.map(({name, value, link, distributions, description}) => {
      const dataG = [
        ['Test', 'value'],
        ...distributions.reduce((acc, item) => {
          acc.push([item.name, item.value])
          return acc
        }, []),
      ]

      return (
        <Container key={`${name}-${value}`}>
          <InfoContainer>
            <Link href={link ? link : ''} as="h3">
              {name}
            </Link>
            <Flex direction={'column'}>
              {description?.length && <Accordion data={description} />}
            </Flex>
          </InfoContainer>
          {/* {distributions.map(({name, value}) => (
            <Accordion title={name} content={value} />
          ))} */}

          <Tooltip
            content={
              <Box padding={3}>
                <TooltipContainer>
                  <TooltipContainerItems>
                    <div
                      style={{
                        color: `${COLORS[0]}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {distributions[0].name}
                      <span style={{color: 'black'}}> ≤ 2.5 s</span>
                    </div>
                    <span className="U91CTe">{distributions[0].value}%</span>
                  </TooltipContainerItems>
                  <TooltipContainerItems>
                    <div
                      style={{
                        color: `${COLORS[1]}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {distributions[1].name}
                      <span style={{color: 'black'}}>2.5 s - 4 s</span>
                    </div>
                    <span className="U91CTe">{distributions[1].value}%</span>
                  </TooltipContainerItems>
                  <TooltipContainerItems>
                    <div
                      style={{
                        color: `${COLORS[2]}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {distributions[2].name}
                      <span style={{color: 'black'}}>&gt; 4 s</span>
                    </div>
                    <span className="U91CTe">{distributions[2].value}%</span>
                  </TooltipContainerItems>
                </TooltipContainer>
              </Box>
            }
            fallbackPlacements={['right', 'left']}
            placement="top"
            portal
          >
            <div style={{display: 'flex', gap: '10px', position: 'relative', maxHeight: '200px'}}>
              <ValueCenter>
                <Text size={4} weight={'bold'}>
                  {value}
                </Text>
              </ValueCenter>
              <CustomPieChart data={distributions} width={300} height={200} />
              {/* <GoogleChart options={options} data={dataG} /> */}
            </div>
          </Tooltip>
        </Container>
      )
    })
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '16px',
        borderBottom: '1px solid grey',
        padding: '0 0 10px 0',
      }}
    >
      {Boolean(data.length) && renderCoreItems(data)}
    </div>
  )
}

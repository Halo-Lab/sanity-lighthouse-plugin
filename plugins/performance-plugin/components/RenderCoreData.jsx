import React from 'react'
import styled from 'styled-components'
import {Tooltip, Text, Box} from '@sanity/ui'
import {CustomPieChart} from './shared/CustomPieChart'
import {COLORS} from './shared/CustomPieChart'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const InfoContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`
const ValueCenter = styled.div`
  position: absolute;
  left: 55%;
  top: 55%;
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
export const RenderCoreData = ({data = []}) => {
  if (!data.length) return
  const renderCoreItems = (items) =>
    items.map(({name, value, link, distributions}) => (
      <Container key={`${name}-${value}`}>
        <InfoContainer>
          <Link href={link ? link : ''}>{name}</Link>
        </InfoContainer>
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
          <div style={{display: 'flex', gap: '10px', position: 'relative'}}>
            <ValueCenter>
              <Text size={4} weight={'bold'}>
                {value}
              </Text>
            </ValueCenter>
            <CustomPieChart data={distributions} />
          </div>
        </Tooltip>
      </Container>
    ))
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
      {Boolean(data.length) && renderCoreItems(data)}
    </div>
  )
}

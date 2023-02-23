import React from 'react'
import {PieChart, Pie, Cell} from 'recharts'
import styled from 'styled-components'
import {Tooltip, Text, Box} from '@sanity/ui'

const testData = [
  {
    name: 'Largest Contentful Paint (LCP)',
    value: '1.2 s',
    link: 'https://web.dev/lcp/',
    distributions: [
      {
        value: 93,
        name: 'Good',
      },
      {
        value: 4,
        name: 'Needs Improvement',
      },
      {
        value: 3,
        name: 'Poor',
      },
    ],
  },
  {
    name: 'First Input Delay (FID)',
    value: '3 ms',
    link: 'https://web.dev/fid/',
    distributions: [
      {
        value: 98,
        name: 'Good',
      },
      {
        value: 1,
        name: 'Needs Improvement',
      },
      {
        value: 1,
        name: 'Poor',
      },
    ],
  },
  {
    name: 'Cumulative Layout Shift (CLS)',
    value: '0.01',
    link: 'https://web.dev/cls/',
    distributions: [
      {
        value: 99,
        name: 'Good',
      },
      {
        value: 1,
        name: 'Needs Improvement',
      },
      {
        value: 0,
        name: 'Poor',
      },
    ],
  },
  {
    name: 'First Contentful Paint (FCP)',
    value: '0.9 s',
    link: 'https://web.dev/fcp/',
    distributions: [
      {
        value: 92,
        name: 'Good',
      },
      {
        value: 5,
        name: 'Needs Improvement',
      },
      {
        value: 3,
        name: 'Poor',
      },
    ],
  },
  {
    name: 'Interaction to Next Paint (INP)',
    value: '48 ms',
    link: 'https://web.dev/inp/',
    distributions: [
      {
        value: 96,
        name: 'Good',
      },
      {
        value: 2,
        name: 'Needs Improvement',
      },
      {
        value: 1,
        name: 'Poor',
      },
    ],
  },
  {
    name: 'Time to First Byte (TTFB)',
    value: '0.4 s',
    link: 'https://web.dev/ttfb/',
    distributions: [
      {
        value: 89,
        name: 'Good',
      },
      {
        value: 8,
        name: 'Needs Improvement',
      },
      {
        value: 3,
        name: 'Poor',
      },
    ],
  },
]

const COLORS = ['#0cce6a', '#ffa400', '#ff4e43']

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
export const RenderCoreData = (coreItems = []) => {
  if (!coreItems.length) return
  console.log(coreItems)
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
            <PieChart width={150} height={150}>
              {/* <Pie
              data={distributions}
              cx={75}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={20}
              outerRadius={40}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
              label
            >
              {distributions.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie> */}
              <Pie
                data={distributions}
                cx={75}
                cy={75}
                innerRadius={40}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {distributions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </Tooltip>
      </Container>
    ))
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
      {Boolean(coreItems.length) && renderCoreItems(coreItems)}
    </div>
  )
}

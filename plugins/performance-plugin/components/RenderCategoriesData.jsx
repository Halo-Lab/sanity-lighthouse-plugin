import React from 'react'
import {Grid, Flex, Heading, Text} from '@sanity/ui'
import {GoogleChart} from './shared/GoogleChart'
import {COLORS} from '../helpers/constants'
import styled from 'styled-components'

const ScoreContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const RenderCategoriesData = ({data = []}) => {
  const colorChart =
    data.score <= 100
      ? data.score < 90
        ? data.score >= 50
          ? COLORS[1]
          : COLORS[2]
        : COLORS[0]
      : COLORS[0]

  const options = {
    legend: 'none',
    pieSliceText: 'none',
    pieSliceTextStyle: {color: 'black', fontName: 'Helvetica Neue', fontSize: 21},
    pieStartAngle: 135,
    tooltip: {trigger: 'none'},
    slices: {
      0: {
        color: colorChart,
      },
      1: {color: 'transparent'},
    },
    pieHole: 0.6,
    is3D: false,
    backgroundColor: 'transparent',
    chartArea: {width: '90%', height: '90%'},
    enableInteractivity: false,
  }

  return (
    <Grid column={[3]} gap={[1, 2, 3]} autoFlow={'column'}>
      <Flex direction={'column'} style={{position: 'relative'}} align="center" gap={2}>
        <Heading>{data.title}</Heading>
        <GoogleChart
          data={[
            ['Performance', 'Score'],
            ['Score', data.score],
            ['', 100 - data.score],
          ]}
          options={options}
          width={'200px'}
          height={'150px'}
        />
        <ScoreContainer>
          <Text size={3} weight={'bold'}>
            {Math.round(data.score)}%
          </Text>
        </ScoreContainer>
      </Flex>

      {Boolean(data?.categories?.length) && (
        <Grid columns={[1, 2]}>
          {data.categories.map((item) => (
            <Flex direction={'column'} gap={3} key={`${item.name}-${item.value}`}>
              <Text>{item.name}</Text>
              <Text size={4} weight={'medium'}>
                {item.value}
              </Text>
            </Flex>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

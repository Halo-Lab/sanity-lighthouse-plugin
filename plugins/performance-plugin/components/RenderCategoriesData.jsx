import React from 'react'
import {Grid, Flex, Heading, Text, Tooltip, Box} from '@sanity/ui'
import {GoogleChart} from './shared/GoogleChart'
import {COLORS} from '../helpers/constants'
import styled from 'styled-components'

const ScoreContainer = styled.div`
  position: absolute;
  top: 55%;
  left: 51%;
  transform: translate(-50%, -50%);
`
const Link = styled.a`
  text-decoration: underline;
  color: #3c4043;
  font-weight: bold;
  :hover {
    color: #1a73e8;
  }
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
          {data.categories.map((item) => {
            let newDescription = []
            if (Boolean(item?.description)) {
              newDescription = item.description.split('[Learn more]')
            }
            return (
              <Tooltip
                key={`${item.name}-${item.value}`}
                content={
                  <Box padding={2}>
                    <Text muted size={1}>
                      {newDescription[0] ? newDescription[0] : ''}
                    </Text>
                  </Box>
                }
                placement="top"
                portal
              >
                <Flex direction={'column'} gap={3}>
                  <Link
                    href={
                      newDescription[1] ? newDescription[1].replace('(', '').replace(')', '') : ''
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </Link>

                  <Text size={4} weight={'medium'}>
                    {item.value}
                  </Text>
                </Flex>
              </Tooltip>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}

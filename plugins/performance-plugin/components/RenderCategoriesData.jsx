import React from 'react'
import {Grid, Card, Flex, Heading, Box, Text} from '@sanity/ui'
import {CustomPieChart} from './shared/CustomPieChart'

export const RenderCategoriesData = ({data = []}) => {
  console.log(data)
  return (
    <Grid column={[1, 1, 2]} gap={[1, 2, 3]} autoFlow={'column'}>
      <Flex>
        <CustomPieChart
          data={[
            {value: Number(data.score), name: data.title},
            {value: 100 - Number(data.score), name: data.title},
          ]}
        />
        <Heading>{data.title}</Heading>
        <Text>{data.score}</Text>
      </Flex>
      {Boolean(data?.categories?.length) && (
        <Flex>
          <Text>{data.categories.map((item) => item.name)}</Text>
          <Text>{data.categories.map((item) => item.value)}</Text>
        </Flex>
      )}
    </Grid>
  )
}

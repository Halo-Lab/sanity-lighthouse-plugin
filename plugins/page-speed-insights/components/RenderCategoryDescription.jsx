import React, {useCallback} from 'react'
import {Grid, Flex, Text, Tooltip, Box} from '@sanity/ui'
import styled from 'styled-components'

const Link = styled.a`
  text-decoration: underline;
  color: #3c4043;
  font-weight: bold;
  :hover {
    color: #1a73e8;
  }
`
const RenderCategoryDescription = ({data}) => {
  const renderData = useCallback((items) => {
    return (
      <Grid columns={[1, 2]}>
        {items.map((item) => {
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
    )
  }, [])
  return <div>{renderData(data)}</div>
}

export default RenderCategoryDescription

import React from 'react'
import styled from 'styled-components'
import PieChartComponent from './shared/PieChartComponent'

const PieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 2rem 0;
`
const Title = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.17;

  display: flex;
  align-items: center;
  color: #003e56;
  margin: 0;
`

const RenderCategories = ({item}) => {
  const {categories, score, title} = item
  return (
    <PieContainer>
      <Title>{title}</Title>
      <PieChartComponent title={title} score={score} />
    </PieContainer>
  )
}

export default RenderCategories

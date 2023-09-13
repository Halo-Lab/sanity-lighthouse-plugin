import styled from 'styled-components'
import PieChartComponent from './shared/PieChartComponent'

const PieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`
const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.4;

  color: #3e3e3e;

  display: flex;
  align-items: center;
  margin: 0;
`

const RenderCategories = ({item}) => {
  const {score, title} = item

  return (
    <PieContainer>
      <PieChartComponent title={title} score={score} />
      <Title>{title}</Title>
    </PieContainer>
  )
}

export default RenderCategories

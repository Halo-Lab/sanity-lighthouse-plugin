import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {ChevronDownIcon, ChevronUpIcon} from '@sanity/icons'
const AccordionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`
const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  background-color: #f2f2f2;

  h3 {
    margin: 0;
  }

  span {
    font-size: 24px;
    transition: transform 0.3s ease-in-out;
  }

  :hover {
    background-color: #f3f4a3;
  }
`

const AccordionContent = styled.div`
  background-color: #fff;
  transition: max-height 0.3s ease-in-out;
  max-height: 0;
  overflow: hidden;

  &.open {
    max-height: 1000px;
  }
  div {
    padding: 10px;
  }
`

function Accordion({data = []}) {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const handleToggle = useCallback(
    (idx) => {
      setIsOpen(!isOpen)
      setIndex(idx)
    },
    [isOpen]
  )

  return data?.length
    ? data.map(({title, text, link}, i) => (
        <AccordionContainer key={`${title}`}>
          <AccordionHeader
            className={isOpen && index === i ? 'open' : ''}
            onClick={() => handleToggle(i)}
          >
            <h3>{title}</h3>
            <span>{isOpen && index === i ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
          </AccordionHeader>
          <AccordionContent className={isOpen && index === i ? 'open' : ''}>
            <div>
              {text}
              {link && <img src={link} alt={title} />}
            </div>
          </AccordionContent>
        </AccordionContainer>
      ))
    : null
}

export default Accordion

import React from 'react'
import styled from 'styled-components'
import { SpecificationItem, SpecificationItemProps } from './SpecificationItem'

interface SpecificationIconProps {
  items: SpecificationItemProps[]
}

export const SpecificationGrids = ({ items }: SpecificationIconProps) => {
  return (
    <StyledWrapper>
      {items.map((item) => (
        <SpecificationItem
          key={item.title}
          icon={item.icon}
          content={item.content}
          title={item.title}
        />
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`

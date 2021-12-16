import React from 'react'
import { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'

type RowProps = HTMLAttributes<HTMLDivElement>
const StyledRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid red;
`
export const Row = ({ children }: RowProps): ReactElement => {
  return <StyledRow>{children}</StyledRow>
}

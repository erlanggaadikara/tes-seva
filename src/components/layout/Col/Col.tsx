import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  span: number
}

const StyledCol = styled.div<ColProps>`
  width: ${({ span }) => (span / 24) * 100 + '%'};
  border: 1px solid green;
`

export const Col = ({ children, span }: ColProps): ReactElement => {
  return <StyledCol span={span}>{children}</StyledCol>
}

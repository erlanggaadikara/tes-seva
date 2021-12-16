import React from 'react'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors } from 'styles/colors'

interface ALinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string | undefined
  target?: string
  linkColor?: string
  visitedColor?: string
}

export const ALink = ({
  href,
  target = '_blank',
  children,
  linkColor = colors.primary1,
  visitedColor = colors.body,
  ...resetProps
}: ALinkProps) => {
  return (
    <StyledA
      {...resetProps}
      href={href}
      target={target}
      linkColor={linkColor}
      visitedColor={visitedColor}
    >
      {children}
    </StyledA>
  )
}

const StyledA = styled.a<{ linkColor: string; visitedColor: string }>`
  &:link {
    color: ${({ linkColor }) => linkColor};
  }
  &:visited {
    color: ${({ visitedColor }) => visitedColor};
  }
  cursor: pointer;
`

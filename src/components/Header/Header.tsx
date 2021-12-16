import React from 'react'
import styled from 'styled-components'
import car from './images/car.png'
interface TextProps {
  TYPE_WEIGHT: number
  TYPE_SIZE: string
}
const HeaderStyle = styled.h1<TextProps>`
  font-weight: ${({ TYPE_WEIGHT }) => TYPE_WEIGHT};
  font-size: ${({ TYPE_SIZE }) => TYPE_SIZE};
`
interface HeaderProps {
  title: string
}
export const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderStyle TYPE_WEIGHT={400} TYPE_SIZE={'12px'}>
      <img src={car} alt="logo" />
      {title}
    </HeaderStyle>
  )
}

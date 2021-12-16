import styled, { css } from 'styled-components'

export const TextLargeBoldStyle = css`
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.75px;
  text-align: left;
`

export const TextLargeBold = styled.span`
  ${TextLargeBoldStyle}
`

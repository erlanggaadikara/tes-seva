import styled, { css } from 'styled-components'

export const TextSuperLargeBoldStyle = css`
  font-family: Poppins;
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: 72px;
  letter-spacing: 1px;
  text-align: left;
`

export const TextSuperLargeBold = styled.span`
  ${TextSuperLargeBoldStyle}
`

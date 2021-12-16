import styled from 'styled-components'

export const TextMediumStrongStyle = styled.p`
  font-family: 'PoppinsBold';
  font-weight: bold;
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
`

export const TextMediumStrong = styled.strong`
  ${TextMediumStrongStyle}
`

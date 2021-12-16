import styled from 'styled-components'

export const TextMediumBoldStyle = styled.p`
  margin: 1rem 0;
  font-size: calc(1.3 * 1rem);
  font-family: 'Poppins';
  font-style: normal;
  letter-spacing: 0em;
  text-transform: none;
  line-height: 1.8em;
  font-size: 1rem;
  line-height: 1.8;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
`

export const TextMediumBold = styled.strong`
  ${TextMediumBoldStyle}
`

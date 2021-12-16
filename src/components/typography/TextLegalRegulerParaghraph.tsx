import styled, { keyframes } from 'styled-components'
import { colors } from 'styles/colors'

const fadeIn = keyframes`
  from {
   
    opacity: 0;
  }

  to {
   
    opacity: 1;
  }
`

export const TextLegalParaghraph = styled.p`
  animation: ${fadeIn} 1s;
  font-family: 'Poppins';
  font-weight: 300;
  font-style: normal;
  letter-spacing: 0em;
  text-transform: none;
  line-height: 1.8em;
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
  margin: 1rem 0;
  color: ${colors.title};
`

export const TextMediumStrong = styled.strong`
  letter-spacing: 0em;
  text-transform: none;
  line-height: 1.8em;
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
  margin: 1rem 0;
  font-family: 'PoppinsBold';
  font-weight: bold;
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
`

export const TextMediumStrongUnderline = styled.p`
  font-family: 'PoppinsBold';
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
  text-decoration: underline;
`

export const StyledItalic = styled.p`
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0em;
  text-transform: none;
  line-height: 1.8em;
  font-size: 1rem;
  line-height: 1.8;
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
`
export const StyledItalicSemiBold = styled.strong`
  font-family: 'PoppinsItalicSemiBold';
  font-style: italic;
  font-size: calc((1.3 - 1) * 1.2vw + 1rem);
`

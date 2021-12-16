import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const maxPageWidth = "700px";
export const maxPageWidthNumber = 700;
export const screenHeight = 1024; //document.documentElement.clientHeight
export const screenWidth = 744; //document.documentElement.clientWidth

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html body {
    background: ${colors.offWhite};
    margin: 0 auto;
    max-width: ${maxPageWidth};
  }
`;

import React from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { colors } from "styles/colors";
import LogoSeva from "./images/LogoSeva.png";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <StyledContentWrapper>
          <StyledImg src={LogoSeva} />
          <StyledTextWrapper>
            <StyledText>
              {t("funnelBackground.link.termsAndConditions")}
            </StyledText>
            <StyledText>{t("funnelBackground.link.privacyPolicy")}</StyledText>
            <StyledText>{t("funnelBackground.link.contactUs")}</StyledText>
          </StyledTextWrapper>
        </StyledContentWrapper>
      </StyledWrapper>
    </>
  );
}

export const GlobalStyle = createGlobalStyle`
  html body {
    background: #ffffff;
    margin: 0 auto;
    max-width: 100vw;
  }
`;
const StyledWrapper = styled.div`
  background: ${colors.line};
  width: 100vw;
  height: 88px;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    height: 224px;
  }
`;
const StyledContentWrapper = styled.div`
  max-width: 100vw;
  display: flex;
  padding-top: 16px;
  padding-left: 4vw;
  @media (max-width: 700px) {
    flex-wrap: wrap;
  }
`;
const StyledImg = styled.img.attrs({
  src: LogoSeva,
})`
  src`;
const StyledTextWrapper = styled.div`
  margin-top: auto;
  margin-left: 48vw;
  @media (max-width: 700px) {
    margin-top: 2vh;
    margin-left: 0vw;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    width: 80vw;
  }
`;
const StyledText = styled(TextSmallRegular)`
  margin-right: 20px;
  color: ${colors.label};
  font-weight: 600;
  @media (max-width: 700px) {
    margin-bottom: 5px;
  }
`;

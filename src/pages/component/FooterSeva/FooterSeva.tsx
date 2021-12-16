import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import urls from "helpers/urls";
import { ALink } from "components/ALink/ALink";
import { LogoSeva } from "components/icon/LogoSeva/LogoSevaFooter";
import { screenSize, isMobileDevice } from "utils/window";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

export const FooterSeva = () => {
  const { t } = useTranslation();
  const getLink = (message: string, url: string) => (
    <StyledLink>
      <ALink href={url} linkColor={colors.white} visitedColor={colors.label}>
        <StyledProgressText>{message}</StyledProgressText>
      </ALink>
    </StyledLink>
  );
  return (
    <StyledFooter>
      <LogoSeva />
      <StyleComponentFooter>
        {getLink(
          t("funnelBackground.link.termsAndConditions"),
          urls.termsAndConditions
        )}
        {getLink(t("funnelBackground.link.privacyPolicy"), urls.privacyPolicy)}
        {getLink(t("funnelBackground.link.contactUs"), urls.contactUs)}
      </StyleComponentFooter>
    </StyledFooter>
  );
};

const offset = 25;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: ${isMobileDevice ? "column" : "row"};
  width: 100%;
  background: ${colors.line};
  text-align: center;
  align-items: ${isMobileDevice ? "left" : "center"};
  padding: 20px 24px;
  justify-content: space-between;
  @media (max-width: ${screenSize.mobileS}) {
    width: none;
  }
  position: relative;
  bottom: 0;
`;

const StyleComponentFooter = styled.div`
  display: flex;
  flex-direction: ${isMobileDevice ? "column" : "row"};
  margin-top: ${offset}px;
  justify-content: space-between;
  width: ${isMobileDevice ? "auto" : "50%"};
  margin-right: ${isMobileDevice ? 0 : "10%"};
  margin-top: 40px;
`;
const StyledLink = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

const StyledProgressText = styled.span`
  ${TextSmallRegular};
  margin-left: 16px;
  color: ${colors.label};
`;

import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { ALink } from "components/ALink/ALink";
import NavBar from "PrivacyPolicy/components/NavBar";
import { TextLegalParaghraph } from "components/typography/TextLegalRegulerParaghraph";
import { H3LargeBold } from "components/typography/H3LargeBold";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import OverlayMenu from "PrivacyPolicy/components/OverlayMenu";
import urls from "helpers/urls";
import { OverrideStyle } from "PrivacyPolicy/OverrideStyle";
import { TermsAndConditionsParaghraph } from "./TermsParaghraphText";
export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const [height, setHeight] = useState("0");
  const [opacity, setOpacity] = useState("0");

  const getFooterElement = () => (
    <StyledFooter>
      {getLink(
        t("funnelBackground.link.termsAndConditions"),
        urls.termsAndConditions
      )}
      {getLink(t("funnelBackground.link.privacyPolicy"), urls.privacyPolicy)}
      {getLink(t("funnelBackground.link.contactUs"), urls.contactUs)}
    </StyledFooter>
  );

  const getLink = (message: string, url: string) => (
    <StyledLink>
      <ALink
        style={{ textDecoration: "underline" }}
        href={url}
        linkColor={colors.white}
        visitedColor={colors.white}
      >
        <TextLegalRegular>{message}</TextLegalRegular>
      </ALink>
    </StyledLink>
  );

  const openHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (height === "0") {
      setHeight("100vh");
      setOpacity("1");
    } else if (height === "100vh") {
      setHeight("0");
      setOpacity("0");
    }
  };

  const OverlayWrapper = styled.div`
    width: 100%;
    height: ${height};
    opacity: ${opacity};
    transition: height 2s ease;
    -webkit-transition: height 2s ease;
    -moz-transition: height 2s ease;
    -o-transition: height 2s ease;
  `;

  return (
    <>
      <OverrideStyle />
      <NavBarWrapper>
        <NavBar openMenu={openHandler} />
      </NavBarWrapper>
      <OverlayWrapper>
        <OverlayMenu />
      </OverlayWrapper>
      <StyledContentWrapper>
        <StyledContent>
          <H3LargeBold>{t("termsAndConditions.title")}</H3LargeBold>
          <TextLegalParaghraph>
            {t("termsAndConditions.lastDatePosted")}
          </TextLegalParaghraph>
          <TextLegalParaghraph
            dangerouslySetInnerHTML={{
              __html: TermsAndConditionsParaghraph,
            }}
          />
        </StyledContent>
      </StyledContentWrapper>
      {getFooterElement()}
    </>
  );
}

const NavBarWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const StyledContentWrapper = styled.div`
  padding-top: 3.3vmax;
  padding-bottom: 3.3vmax;
  display: flex;
  padding-right: 6vw;
  justify-content: center;
  padding-left: 6vw;
  margin: 0 auto;
  box-sizing: content-box;
  box-sizing: content-box;
`;

const StyledContent = styled.div`
  width: 75%;
  justify-content: center;
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 200px;
  background: ${colors.primaryDark};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  padding: 20px 24px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const StyledLink = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

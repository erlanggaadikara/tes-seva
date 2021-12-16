import React, { useState } from "react";
import styled from "styled-components";
import image from "./images/contact-us-rafiki.jpg";
import { H0LargeBold } from "components/typography/H0LargeBold";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import { ALink } from "components/ALink/ALink";
import urls from "helpers/urls";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import OverlayMenu from "./components/OverlayMenu";
import { useHistory } from "react-router-dom";
import { contactUsUrl } from "routes/routes";
import { OverrideStyle } from "./OverrideStyle";

export default function ContactUsPage() {
  const { t } = useTranslation();
  const history = useHistory();

  const [height, setHeight] = useState("0");
  const [opacity, setOpacity] = useState("0");

  const toContactUs = () => {
    history.push(contactUsUrl);
  };

  const getFooterElement = () => (
    <StyledFooter>
      {getLink(
        t("funnelBackground.link.termsAndConditions"),
        urls.termsAndConditions
      )}
      {getLink(t("funnelBackground.link.privacyPolicy"), urls.privacyPolicy)}
      <StyledLink2 onClick={toContactUs}>
        {t("funnelBackground.link.contactUs")}
      </StyledLink2>
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

  const ContentWrapper = styled.div`
    padding: 0px 20px;
    margin-right: 50px;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    background: ${colors.white};

    @media (max-width: 750px) {
      flex-direction: column;
    }
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
      <ContentWrapper>
        <ImageWrapper>
          <StyledImage src={image} />
        </ImageWrapper>
        <FormWrapper>
          <StyledContentTitle>{t("contactUsPage.title")}</StyledContentTitle>
          <TextLegalRegular>{t("contactUsPage.subtitle")}</TextLegalRegular>
          <Form />
        </FormWrapper>
      </ContentWrapper>
      {getFooterElement()}
    </>
  );
}

const NavBarWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const ImageWrapper = styled.div`
  margin: 50px 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const FormWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-right: 30px;

  @media (max-width: 750px) {
    margin-right: 0px;
  }
`;

const StyledContentTitle = styled(H0LargeBold)`
  color: ${colors.title};
  text-align: left;
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

const StyledLink2 = styled(TextLegalRegular)`
  width: 100%;
  color: ${colors.white};
  cursor: pointer;
  text-decoration: underline;
`;

import React from "react";
import styled from "styled-components";
import { ALink } from "components/ALink/ALink";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import urls from "helpers/urls";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import {
  trackSelectHomeContact,
  trackSelectHomePrivacy,
  trackSelectHomeTerms,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";

const getLink = (message: string, url: string) => {
  const onURLClick = (url: string) => {
    switch (url) {
      case urls.contactUs:
        trackSelectHomeContact(NewHomePageVersion.phone);
        break;
      case urls.privacyPolicy:
        trackSelectHomePrivacy(NewHomePageVersion.phone);
        break;
      case urls.termsAndConditions:
        trackSelectHomeTerms(NewHomePageVersion.phone);
    }
  };
  return (
    <StyledLink>
      <ALink
        style={{ textDecoration: "underline" }}
        href={url}
        linkColor={colors.white}
        visitedColor={colors.white}
        onClick={() => onURLClick(url)}
      >
        <LinkLabelMediumSemiBold>{message}</LinkLabelMediumSemiBold>
      </ALink>
    </StyledLink>
  );
};

export const FooterSection = () => {
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      {getLink(
        t("funnelBackground.link.termsAndConditions"),
        urls.termsAndConditions
      )}
      {getLink(t("funnelBackground.link.privacyPolicy"), urls.privacyPolicy)}
      {getLink(t("funnelBackground.link.contactUs"), urls.contactUs)}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${colors.title};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 104px;
  padding: 10px 0;
`;

const StyledLink = styled.div`
  margin: 10px 0;
`;

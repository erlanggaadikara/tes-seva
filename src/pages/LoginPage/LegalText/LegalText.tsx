import React from "react";
import { ALink } from "components/ALink/ALink";
import urls from "helpers/urls";
import { useTranslation } from "react-i18next";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import styled from "styled-components";
import { colors } from "styles/colors";

export const LegalText = () => {
  const { t } = useTranslation();

  return (
    <StyledLegalTextSection>
      <StyledLegalText>
        {t("loginPage.legal.beginText")}
        <ALink href={urls.termsAndConditions}>
          <TextLegalMedium>
            {t("loginPage.legal.termsAndConditions")}
          </TextLegalMedium>
        </ALink>
        {t("loginPage.legal.and")}
        <ALink href={urls.privacyPolicy}>
          <TextLegalMedium>
            {t("loginPage.legal.privacyPolicy")}
          </TextLegalMedium>
        </ALink>
      </StyledLegalText>
    </StyledLegalTextSection>
  );
};
const StyledLegalTextSection = styled.p`
  margin-top: 10px;
  text-align: center;
  color: ${colors.placeholder};
`;
const StyledLegalText = styled(TextLegalMedium)`
  text-align: center;
`;

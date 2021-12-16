import React from "react";
import styled from "styled-components";
import { SectionTitle } from "SectionTitle/SectionTitle";
import { colors } from "styles/colors";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { SecureLink } from "components/icon/SecureLink/SecureLink";
import { useTranslation } from "react-i18next";
import { TextXSmallMedium } from "components/typography/TextXSmallMedium";
import { LogoAstra } from "components/icon/LogoAstra/LogoAstra";

export const ImproveChanceSection = () => {
  const { t } = useTranslation();
  return (
    <StyledImproveChanceSection>
      <SectionTitle title={t("bankSelectionPage.improveTitle")} />
      <StyledContent>
        <StyledSecureInfo>
          <StyledIcon>
            <SecureLink />
          </StyledIcon>
          <StyledText>{t("bankSelectionPage.improveContent")}</StyledText>
        </StyledSecureInfo>
        <StyledSeparator />
        <StyledSupportedByInfo>
          <StyledSupportedText>
            {t("bankSelectionPage.supportedBy")}
          </StyledSupportedText>
          <LogoAstra />
        </StyledSupportedByInfo>
      </StyledContent>
    </StyledImproveChanceSection>
  );
};
const StyledImproveChanceSection = styled.section`
  padding: 21px 16px;
`;

const StyledContent = styled.div`
  border-radius: 16px;
  background: ${colors.inputBg};
  padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const StyledSecureInfo = styled.div`
  display: flex;
`;

const StyledIcon = styled.span`
  margin-right: 20px;
`;

const StyledText = styled(TextMediumRegular)`
  display: block;
`;

const StyledSeparator = styled.div`
  border: 1px solid ${colors.line};
  width: 100%;
  margin: 20px 20px;
`;

const StyledSupportedByInfo = styled.div`
  display: flex;
  align-self: center;
`;

const StyledSupportedText = styled(TextXSmallMedium)`
  color: ${colors.label};
  margin-right: 10px;
`;

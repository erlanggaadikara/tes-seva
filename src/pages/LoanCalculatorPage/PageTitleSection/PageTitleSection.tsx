import React from "react";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import styled from "styled-components";
import { colors } from "styles/colors";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import { LoanRank } from "models/models";
import { useTranslation } from "react-i18next";
import { ArrowBack } from "components/ArrowBack/ArrowBack";

interface PageTitleSectionProps {
  loanRank: LoanRank;
  backUrl: string;
}
export const PageTitleSection = ({
  loanRank,
  backUrl,
}: PageTitleSectionProps) => {
  const { t } = useTranslation();

  return (
    <StyledSection>
      <StyledIcon>
        <ArrowBack backUrl={backUrl} />
      </StyledIcon>
      <LinkLabelLargeSemiBold>
        {t(`loanCalculatorPage.pageTitleSection.${loanRank}.title`)}
      </LinkLabelLargeSemiBold>
      <StyledText>
        <TextSmallRegular>
          {t(`loanCalculatorPage.pageTitleSection.${loanRank}.description`)}
        </TextSmallRegular>
      </StyledText>
      <StyledChangeText>
        <LinkLabelXSmallSemiBold>
          {t(`loanCalculatorPage.pageTitleSection.${loanRank}.instruction`)}
        </LinkLabelXSmallSemiBold>
      </StyledChangeText>
    </StyledSection>
  );
};
const StyledSection = styled.section`
  padding: 24px 20px 22px 20px;
  background: ${colors.white};
  border-radius: 0 0 15px 15px;
  position: relative;
`;
const StyledText = styled.p`
  margin: 8px 0 30px 0;
`;
const StyledChangeText = styled.p`
  text-align: center;
  color: ${colors.title};
`;
const StyledIcon = styled.span`
  display: block;
  margin-bottom: 28px;
`;

import React from "react";
import { LoanRank } from "models/models";
import { getLoanRatingText, getSpeedometerMap } from "utils/DetailsDataProcess";
import { useTranslation } from "react-i18next";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import styled from "styled-components";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import { colors } from "styles/colors";

interface Props {
  loanRank: LoanRank | keyof typeof LoanRank;
}

export const LoanRankResult = ({ loanRank }: Props) => {
  const { t } = useTranslation();
  return (
    <StyledResultWrapper>
      <StyledTextWrapper>
        <StyledLoanRating>
          <LinkLabelLegalSemiBold>
            {t("loanCalculatorPage.calculateResult.loanRating")}
          </LinkLabelLegalSemiBold>
        </StyledLoanRating>
        <StyledLoanRatingText>
          <LinkLabelXSmallSemiBold>
            {getLoanRatingText(loanRank)}
          </LinkLabelXSmallSemiBold>
        </StyledLoanRatingText>
      </StyledTextWrapper>

      <StyledSpeedometerSection>
        {getSpeedometerMap(loanRank)({
          radius: 35,
          lineWidth: 10,
          restBlockColor: colors.line,
        })}
      </StyledSpeedometerSection>
    </StyledResultWrapper>
  );
};
const StyledResultWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;
const StyledLoanRatingText = styled.span`
  color: ${colors.label};
  display: inline-block;
  margin-top: 5px;
`;
const StyledSpeedometerSection = styled.div`
  margin-left: 4px;
`;
const StyledTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;
const StyledLoanRating = styled.span`
  display: inline-block;
`;

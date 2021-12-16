import { LoanRank } from "models/models";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { LoanRankResult } from "./LoanRankResult/LoanRankResult";
import { colors } from "styles/colors";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { getLoanCalculatorRankColor } from "LoanCalculator/LoanCalculatorDataProcess";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";

interface CalculateResultProps {
  monthlyInstallments: number;
  loanRank: LoanRank | keyof typeof LoanRank;
}

export const CalculateResult = ({
  monthlyInstallments,
  loanRank,
}: CalculateResultProps) => {
  const { t } = useTranslation();
  const [formattedPrice] = useFormattedPrice(monthlyInstallments);
  return (
    <StyledResultSection>
      <StyledMonthlyInstallments>
        <p>
          <LinkLabelLegalSemiBold>
            {t("loanCalculatorPage.calculateResult.monthlyInstallments")}
          </LinkLabelLegalSemiBold>
        </p>
        <StyledMonthlyInstalmentsValue loanRank={loanRank}>
          <LinkLabelMediumSemiBold>{formattedPrice}</LinkLabelMediumSemiBold>
        </StyledMonthlyInstalmentsValue>
      </StyledMonthlyInstallments>
      <LoanRankResult loanRank={loanRank} />
    </StyledResultSection>
  );
};
const StyledResultSection = styled.section`
  display: flex;
  justify-content: space-between;
  color: ${colors.placeholder};
`;
const StyledMonthlyInstallments = styled.div`
  width: 40%;
`;
const StyledMonthlyInstalmentsValue = styled.p<
  Pick<CalculateResultProps, "loanRank">
>`
  color: ${({ loanRank }) => getLoanCalculatorRankColor(loanRank)};
  margin-top: 4px;
`;

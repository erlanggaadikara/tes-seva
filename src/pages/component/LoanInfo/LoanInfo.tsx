import React from "react";
import { Calendar } from "components/icon/Calendar/Calendar";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useTranslation } from "react-i18next";
import { Card } from "components/icon/Card/Card";
import { Clock } from "components/icon/Clock/Clock";
interface LoanInfoProps {
  monthlyInstallment: string;
  downPayment: string;
  tenure?: string;
  isVerticalLineShow?: boolean;
}
export const LoanInfo = ({
  monthlyInstallment,
  downPayment,
  tenure,
  isVerticalLineShow,
}: LoanInfoProps) => {
  const { t } = useTranslation();
  return (
    <StyledLoanInfoSection>
      <StyledLoanInfo isVerticalLineShow={isVerticalLineShow}>
        <StyledIcon>
          <Calendar width={20} height={20} />
        </StyledIcon>
        <StyledLoanInfoText>{t(`variantDetails.instal`)}</StyledLoanInfoText>
        <StyledPriceRange>{monthlyInstallment}</StyledPriceRange>
      </StyledLoanInfo>
      <StyledLoanInfo>
        <StyledIcon>
          <Card width={20} height={20} />
        </StyledIcon>
        <StyledLoanInfoText>{t(`common.downPayment`)}</StyledLoanInfoText>
        <StyledPriceRange>{downPayment}</StyledPriceRange>
      </StyledLoanInfo>
      {tenure && (
        <StyledLoanInfo>
          <StyledIcon>
            <Clock width={20} height={20} />
          </StyledIcon>
          <StyledLoanInfoText>{t(`variantDetails.tenure`)}</StyledLoanInfoText>
          <StyledPriceRange>{tenure}</StyledPriceRange>
        </StyledLoanInfo>
      )}
    </StyledLoanInfoSection>
  );
};
const StyledLoanInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.inputBg};
  padding: 10px 10px;
`;

const StyledLoanInfo = styled.div<Pick<LoanInfoProps, "isVerticalLineShow">>`
  display: flex;
  flex-direction: row;
`;
const StyledLoanInfoText = styled(LinkLabelLegalSemiBold)`
  margin-top: 17px;
  margin-left: 10px;
  color: ${colors.label};
`;
const StyledPriceRange = styled(LinkLabelSmallSemiBold)`
  margin-top: 15px;
  margin-left: auto;
  color: ${colors.title};
`;

const StyledIcon = styled.div`
  margin-top: 15px;
  margin-left: 5px;
`;

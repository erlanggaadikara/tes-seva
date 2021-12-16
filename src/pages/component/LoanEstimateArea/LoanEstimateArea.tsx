import { CarVariantDetails, VariantDetailsInfo } from "types/types";
import { million, ten } from "const/const";

import { AccLogo } from "images/AccLogo/AccLogo";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { LoanRank } from "models/models";
import { LoanRankComponent } from "LoanRankComponent/LoanRankComponent";
import React from "react";
import { TafLogo } from "images/TafLogo/TafLogo";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { colors } from "styles/colors";
import { formatNumberByLocalization } from "utils/numberUtils/numberUtils";
import { getTenureFormatted } from "utils/translationFormatter";
import styled from "styled-components";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { useTranslation } from "react-i18next";

interface SpecificationAreaProps {
  carVariantDetails: CarVariantDetails;
  variantDetailsInfo: VariantDetailsInfo;
}

export const LoanEstimateArea = ({
  carVariantDetails,
  variantDetailsInfo,
}: SpecificationAreaProps) => {
  const { currentLanguage } = useCurrentLanguageFromContext();
  const {
    loanDetail: { loanRank, dpAmount, monthlyInstallment, tenure: loanTenure },
  } = carVariantDetails;
  const {
    loanApplyMessage,
    loanEstimate,
    downPayment,
    price,
    installments,
    tenure,
    estimatesDes,
    insuranceDes,
    feesDes,
  } = variantDetailsInfo;

  const { t } = useTranslation();

  const loanData = [
    {
      label: t(downPayment),
      value: t(price, {
        price: formatNumberByLocalization(
          dpAmount,
          currentLanguage,
          million,
          ten
        ),
      }),
    },
    {
      label: t(installments),
      value: t(price, {
        price: formatNumberByLocalization(
          monthlyInstallment,
          currentLanguage,
          million
        ),
      }),
    },
    {
      label: t(tenure),
      value: getTenureFormatted(t, loanTenure),
    },
  ];
  return (
    <StyledLoanEstimate>
      <StyledLoanRankComponent
        loadRank={loanRank as LoanRank}
        info={t(loanApplyMessage)}
      />
      <StyledLoanEstimateLabel>
        <LinkLabelSmallSemiBold>{t(loanEstimate)}</LinkLabelSmallSemiBold>
      </StyledLoanEstimateLabel>
      <StyledPaymentArea>
        {loanData.map(({ label, value }) => (
          <StyledPaymentItem key={label}>
            <StyledLoanLabel>
              <TextLegalMedium>{label}</TextLegalMedium>
            </StyledLoanLabel>
            <StyledLoanValue>
              <LinkLabelSmallSemiBold>{value}</LinkLabelSmallSemiBold>
            </StyledLoanValue>
          </StyledPaymentItem>
        ))}
      </StyledPaymentArea>

      <StyledMoreInfo>
        <LinkLabelLegalSemiBold>
          {t(estimatesDes)}
          <StyledMoreInfoText>{t(insuranceDes)}</StyledMoreInfoText>
          {t(feesDes)}
        </LinkLabelLegalSemiBold>
        <StyledLogo>
          <TafLogo />
          <StyledVerticalLine>
            <AccLogo />
          </StyledVerticalLine>
        </StyledLogo>
      </StyledMoreInfo>
    </StyledLoanEstimate>
  );
};

const StyledLoanEstimate = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 24px 16px 10px 16px;
  background: ${colors.white};
  border-radius: 8px;
`;
const StyledLoanRankComponent = styled(LoanRankComponent)`
  margin-bottom: 24px;
`;
const StyledLoanEstimateLabel = styled.div`
  color: ${colors.label};
`;
const StyledPaymentArea = styled.div`
  color: ${colors.label};
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledPaymentItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 22px;
`;
const StyledLoanLabel = styled.div`
  color: ${colors.placeholder};
`;
const StyledLoanValue = styled.div`
  margin-top: 4px;
  color: ${colors.title};
`;
const StyledMoreInfo = styled.div`
  color: ${colors.body};
  padding-top: 14px;
  border-top: 1px ${colors.line} solid;
`;
const StyledMoreInfoText = styled.div`
  color: ${colors.body};
  margin-top: 4px;
  margin-bottom: 4px;
`;
const StyledLogo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StyledVerticalLine = styled.div`
  border-left: 1px ${colors.line} solid;
  margin-left: 18px;
  flex-shrink: 1;
  padding-right: 24px;
  padding-left: 30px;
`;

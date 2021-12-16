import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { MiniVariantDetail } from "./MiniVariantDetail";
import { FullEditMonthlyIncome } from "./FullEditMonthlyIncome";
import { FullEditAge } from "./FullEditAge";
import { Button, ButtonType } from "components/Button/Button";
import { NewFunnelCarVariantDetails } from "types/types";
import { useTranslation } from "react-i18next";
import { SurveyFormKey } from "models/models";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { tracSelectV2LoanCalculatorSurveyCalculate } from "helpers/amplitude/newLoanCalculatorEventTracking";

interface FullEditSectionProps {
  carVariantDetails?: NewFunnelCarVariantDetails;
  handleSubmit: () => void;
  disableCalculateLoan?: boolean;
}

export const FullEditSection = ({
  carVariantDetails,
  handleSubmit,
  disableCalculateLoan,
}: FullEditSectionProps) => {
  const { t } = useTranslation();
  const contextSurveyFormData = useContextSurveyFormData();

  const checkButtonEnabled = () => {
    const totalIncomeIsDataValid =
      contextSurveyFormData[SurveyFormKey.TotalIncome]?.isDataValid;
    const ageIsDataValid =
      contextSurveyFormData[SurveyFormKey.Age]?.isDataValid;
    return totalIncomeIsDataValid && ageIsDataValid && !disableCalculateLoan;
  };
  const onSubmitClick = () => {
    handleSubmit();
    const income = contextSurveyFormData[SurveyFormKey.TotalIncome]?.value;
    const age = contextSurveyFormData[SurveyFormKey.Age]?.value;
    if (!!income && !!age) {
      tracSelectV2LoanCalculatorSurveyCalculate({
        income: Number(income),
        age: String(age),
      });
    }
  };
  return (
    <StyledWrapper>
      <MiniVariantDetail carVariantDetails={carVariantDetails} />
      <FullEditMonthlyIncome />
      <FullEditAge />
      <StyledButton
        width="100%"
        buttonType={ButtonType.primary1}
        onClick={onSubmitClick}
        disabled={!checkButtonEnabled()}
      >
        {t("newFunnelLoanCalculatorPage.editHeader.fullEditSection.button")}
      </StyledButton>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: ${colors.white};
  width: 100%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 16px 16px 32px;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
`;

import React from "react";
import { SurveyFormKey } from "models/models";
import { CashAmountInput } from "SurveyForm/CashAmountInput/CashAmountInput";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FullEditFormLabel } from "./FullEditFormLabel";

export const FullEditMonthlyIncome = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const originInput = surveyFormData?.totalIncome?.value?.toString() || "";

  return (
    <StyledWrapper>
      <FullEditFormLabel>
        {t(
          "newFunnelLoanCalculatorPage.editHeader.fullEditSection.monthlyIncome"
        )}
      </FullEditFormLabel>
      <CashAmountInput value={originInput} page={SurveyFormKey.TotalIncome} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-top: 28px;
`;

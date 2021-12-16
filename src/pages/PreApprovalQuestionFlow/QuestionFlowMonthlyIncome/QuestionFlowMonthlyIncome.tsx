import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { SurveyFormKey } from "models/models";
import { CashAmountInput } from "SurveyForm/CashAmountInput/CashAmountInput";
import { FormLabel } from "component/FormLabel/FormLabel";
import { QuestionFlowFormProps } from "types/types";

export const QuestionFlowMonthlyIncome = ({
  handleDisabled,
}: QuestionFlowFormProps) => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const originInput = surveyFormData?.totalIncome?.value?.toString() || "";

  useEffect(() => {
    handleDisabled && handleDisabled(!surveyFormData?.totalIncome?.isDataValid);
  }, [surveyFormData.totalIncome]);

  return (
    <StyledWrapper>
      <FormLabel>
        {t(`preApprovalQuestionFlow.${SurveyFormKey.TotalIncome}.title`)}
      </FormLabel>
      <CashAmountInput value={originInput} page={SurveyFormKey.TotalIncome} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  ${FormLabel} {
    margin-bottom: 24px;
  }
`;

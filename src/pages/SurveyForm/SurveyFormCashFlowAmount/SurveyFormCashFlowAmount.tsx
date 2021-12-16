import React from "react";
import { useTranslation } from "react-i18next";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import styled from "styled-components";
import { cashFlowAmountFormConfig } from "./cashFlowAmountForm.config";
import { FormLabel } from "component/FormLabel/FormLabel";
import { cashFlowFormConfig } from "SurveyFormCashFlow/cashFlowForm.config";
import { TextSmallBold } from "components/typography/TextSmallBold";
import { CheckboxItemType } from "components/form/Checkbox/CheckboxItem";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { CashAmountInput } from "CashAmountInput/CashAmountInput";
import { SurveyFormKey } from "models/models";

export const SurveyFormCashFlowAmount = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const value = (surveyFormData?.cashFlow?.value as string[]) || [];
  const originInput = surveyFormData?.totalIncome?.value?.toString() || "";
  const option = cashFlowFormConfig.options.filter((option: CheckboxItemType) =>
    value.includes(option.value)
  );

  return (
    <div>
      <FormLabel>{t(cashFlowAmountFormConfig.label)}</FormLabel>
      <StyledSubtitleArea>
        <TextSmallRegular>
          {t(cashFlowAmountFormConfig.subtitle)}
        </TextSmallRegular>
        <TextSmallBold>
          {option.map((data) => t(data.label)).join(", ")}
        </TextSmallBold>
      </StyledSubtitleArea>
      <CashAmountInput value={originInput} page={SurveyFormKey.TotalIncome} />
    </div>
  );
};

const StyledSubtitleArea = styled.div`
  padding-top: 28px;
  padding-bottom: 28px;
`;

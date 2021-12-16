import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "components/form/Checkbox/Checkbox";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import styled from "styled-components";
import { cashFlowFormConfig } from "./cashFlowForm.config";
import { FormLabel } from "component/FormLabel/FormLabel";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { SurveyFormKey } from "models/models";

export const SurveyFormCashFlow = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [cashFlowValue, setCashFlowValue] = useState<string[]>(
    surveyFormData.cashFlow?.value as string[]
  );
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const onChanged = (data: string[]) => {
    setCashFlowValue(data);
    patchSurveyFormValue({
      [SurveyFormKey.CashFlow]: {
        value: data,
        isDataValid: nextButtonEnable(data),
      },
    });
  };

  const nextButtonEnable = (datas: string[]): boolean => {
    if (datas.length < 1) {
      return false;
    }
    const results = cashFlowFormConfig.options
      .filter((item) => datas.indexOf(item.value) > -1)
      .map((item) =>
        item.subOptions
          ? datas.find((data) => data.indexOf(item.value.concat("_")) > -1)
          : true
      )
      .filter((result) => !result);
    return results != undefined && results.length < 1;
  };

  return (
    <div>
      <FormLabel>{t(cashFlowFormConfig.label)}</FormLabel>
      <StyledSubtitleArea>
        <TextSmallRegular>{t(cashFlowFormConfig.subtitle)}</TextSmallRegular>
      </StyledSubtitleArea>
      {cashFlowFormConfig && (
        <Checkbox
          value={cashFlowValue || []}
          options={cashFlowFormConfig.options}
          onChanged={onChanged}
        />
      )}
    </div>
  );
};

const StyledSubtitleArea = styled.p`
  margin-top: 17px;
  margin-bottom: 24px;
`;

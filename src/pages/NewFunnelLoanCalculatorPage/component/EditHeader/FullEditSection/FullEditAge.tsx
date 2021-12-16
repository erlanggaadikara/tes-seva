import React, { useState } from "react";
import { SurveyFormKey } from "models/models";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FullEditFormLabel } from "./FullEditFormLabel";
import { ageFormConfig } from "SurveyForm/SurveyFormAge/ageFormConfig";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { Select } from "components/form/Select/Select";
import { FormControlValue } from "types/types";
import { isDataValid } from "SurveyForm/surveyFormUtils";

export const FullEditAge = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [ageValue, setAgeValue] = useState(surveyFormData.age?.value);
  const patchSurveyFormValue = useContextSurveyFormPatch();

  const handleOnChange = (value: FormControlValue) => {
    setAgeValue(value);
    patchSurveyFormValue({
      [SurveyFormKey.Age]: { value, isDataValid: isDataValid(value) },
    });
  };

  return (
    <StyledWrapper>
      <FullEditFormLabel>
        {t("newFunnelLoanCalculatorPage.editHeader.fullEditSection.age")}
      </FullEditFormLabel>
      <Select
        value={ageValue}
        options={ageFormConfig.options}
        onChoose={handleOnChange}
        placeholder={t(ageFormConfig.placeholderLabel)}
        suffixIcon={DownOutlined}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-top: 44px;
`;

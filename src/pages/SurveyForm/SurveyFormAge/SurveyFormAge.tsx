import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "components/form/Select/Select";
import styled from "styled-components";
import { FormLabel } from "component/FormLabel/FormLabel";
import { FormControlValue } from "types/types";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { ageFormConfig } from "./ageFormConfig";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

export const SurveyFormAge = () => {
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
    <Wrapper>
      <FormLabel>{t(ageFormConfig.label)}</FormLabel>
      <Select
        value={ageValue}
        options={ageFormConfig.options}
        name={"ageGroup"}
        onChoose={handleOnChange}
        placeholder={t(ageFormConfig.placeholderLabel)}
        suffixIcon={DownOutlined}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${FormLabel} {
    margin-bottom: 18px;
  }
`;

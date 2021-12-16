import React, { useState } from "react";
import { RadioButton } from "components/form/RadioButton/RadioButton";
import { useTranslation } from "react-i18next";
import { FormLabel } from "component/FormLabel/FormLabel";
import styled from "styled-components";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { FormControlValue } from "types/types";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";
import { genderFormConfig } from "./gender.config";
export const SurveyFormGender = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [genderValue, setGenderValue] = useState(surveyFormData.gender?.value);
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const handleOnChange = (optionValue: FormControlValue) => {
    setGenderValue(optionValue);
    patchSurveyFormValue({
      [SurveyFormKey.Gender]: {
        value: optionValue,
        isDataValid: isDataValid(optionValue),
      },
    });
  };
  return (
    <Wrapper>
      <FormLabel>{t(genderFormConfig.label)}</FormLabel>
      <RadioButton
        value={genderValue}
        options={genderFormConfig.options}
        name={"gender"}
        onChoose={handleOnChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${FormLabel} {
    margin-bottom: 40px;
  }
`;

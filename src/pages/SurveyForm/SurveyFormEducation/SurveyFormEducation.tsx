import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "components/form/Select/Select";
import styled from "styled-components";
import { FormLabel } from "component/FormLabel/FormLabel";
import { educationFormConfig } from "./educationFormConfig";
import { Education } from "components/icon/Education/Education";
import { FormControlValue } from "types/types";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

export const SurveyFormEducation = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [educationValue, setEducationValue] = useState(
    surveyFormData.education?.value
  );
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const handleOnChange = (value: FormControlValue) => {
    setEducationValue(value);
    patchSurveyFormValue({
      [SurveyFormKey.Education]: { value, isDataValid: isDataValid(value) },
    });
  };
  return (
    <Wrapper>
      <FormLabel>{t(educationFormConfig.label)}</FormLabel>
      <Select
        value={educationValue}
        options={educationFormConfig.options}
        name={"education"}
        onChoose={handleOnChange}
        placeholder={t(educationFormConfig.placeholderLabel)}
        prefixIcon={Education}
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

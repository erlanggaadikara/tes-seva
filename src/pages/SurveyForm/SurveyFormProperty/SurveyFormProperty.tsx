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
import { propertyFormConfig } from "./propertyFormConfig";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

export const SurveyFormProperty = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [propertyValue, setPropertyValue] = useState(
    surveyFormData.homeOwnership?.value
  );
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const handleOnChange = (optionValue: FormControlValue) => {
    setPropertyValue(optionValue);
    patchSurveyFormValue({
      [SurveyFormKey.HomeOwnership]: {
        value: optionValue,
        isDataValid: isDataValid(optionValue),
      },
    });
  };
  return (
    <Wrapper>
      <FormLabel>{t(propertyFormConfig.label)}</FormLabel>
      <RadioButton
        value={propertyValue}
        options={propertyFormConfig.options}
        name={"property"}
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

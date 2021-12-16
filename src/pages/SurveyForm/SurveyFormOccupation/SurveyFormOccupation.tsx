import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "components/form/Select/Select";
import styled from "styled-components";
import { FormLabel } from "component/FormLabel/FormLabel";
import { Occupation } from "components/icon/Occupation/Occupation";
import { occupationFormConfig } from "./occupationFormConfig";
import { FormControlValue, QuestionFlowFormProps } from "types/types";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

export const SurveyFormOccupation = ({
  handleDisabled,
}: QuestionFlowFormProps) => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [occupationValue, setOccupationValue] = useState(
    surveyFormData.occupation?.value
  );

  useEffect(() => {
    handleDisabled && handleDisabled(!surveyFormData.occupation?.isDataValid);
  }, [surveyFormData.occupation]);

  const patchSurveyFormValue = useContextSurveyFormPatch();
  const handleOnChange = (value: FormControlValue) => {
    setOccupationValue(value);
    patchSurveyFormValue({
      [SurveyFormKey.Occupation]: { value, isDataValid: isDataValid(value) },
    });
  };

  return (
    <Wrapper>
      <FormLabel>{t(occupationFormConfig.label)}</FormLabel>
      <Select
        value={occupationValue}
        options={occupationFormConfig.options}
        name={"occupation"}
        onChoose={handleOnChange}
        placeholder={t(occupationFormConfig.placeholderLabel)}
        prefixIcon={Occupation}
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

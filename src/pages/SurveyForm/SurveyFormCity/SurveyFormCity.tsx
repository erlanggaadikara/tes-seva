import React, { useState } from "react";
import { FormLabel } from "component/FormLabel/FormLabel";
import { useTranslation } from "react-i18next";
import { surveyFormCityConfig } from "./surveyFormCity.config";
import { Select } from "components/form/Select/Select";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
import { FormControlValue } from "types/types";
import { Location } from "components/icon/Location/Location";

import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import styled from "styled-components";
import { AlertInfo } from "components/icon/AlertInfo/AlertInfo";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

export const SurveyFormCity = () => {
  const surveyFormData = useContextSurveyFormData();
  const [cityValue, setCityValue] = useState(surveyFormData.city?.value);
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const { t } = useTranslation();
  const [cityOptionList, setCityOptionList] = useState(
    surveyFormCityConfig.options
  );
  const storeCityOptionValue = (value: FormControlValue) => {
    setCityValue(value);
    patchSurveyFormValue({
      [SurveyFormKey.City]: { value, isDataValid: isDataValid(value) },
    });
  };
  const searchOption = (searchText: string) => {
    const searchResult = fuzzySearch(searchText, surveyFormCityConfig.options, [
      "label",
    ]);
    patchSurveyFormValue({ city: undefined });
    setCityOptionList(searchResult);
  };
  return (
    <Wrapper>
      <FormLabel>{t(surveyFormCityConfig.label)}</FormLabel>
      <Select
        options={cityOptionList}
        name={"city"}
        placeholder={t(surveyFormCityConfig.placeholder)}
        onChoose={storeCityOptionValue}
        enableSearch={true}
        onSearch={searchOption}
        value={cityValue}
        prefixIcon={Location}
        noOptionText={surveyFormCityConfig.noOptionText}
        errorIcon={AlertInfo}
        isShowDropDownByValue={true}
      />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  ${FormLabel} {
    margin-bottom: 18px;
  }
`;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { surveyFormCityConfig } from "./AddressFormCity.config";
import { FormControlValue } from "types/types";
import { PreApprovalQuestionsAddressKey } from "models/models";
import { isDataValid } from "SurveyForm/surveyFormUtils";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
import { Select } from "components/form/Select/Select";
import { AlertInfo } from "components/icon/AlertInfo/AlertInfo";
import { AddressFormItemTitle } from "AddressFormItemTitle/AddressFormItemTitle";
import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";
import { generateSurveyFormCityOptionList } from "SurveyForm/SurveyFormCity/utils/surveyFormCityConfigGenerator/surveyFormCity.config";
import { provinceEnglishCityMap } from "AddressFormProvince/provinceCityDataProcessor/provinceCityData.config";
import { generateCityValueMap } from "SurveyForm/SurveyFormCity/utils/cityDataProcess/cityDataProcess";
import { provinceObject } from "AddressFormProvince/AddressFormProvince.config";
import { getProvinceKeyByValue } from "AddressFormProvince/provinceCityDataProcessor/provinceCityDataProcessor";

export const AddressFormCity = () => {
  const { t } = useTranslation();
  const [skipInitialRender, setSkipInitialRender] = useState(true);
  const { questionFlowForm, patchQuestionFlowForm } = useQuestionFlowForm();
  const provinceValue =
    questionFlowForm[PreApprovalQuestionsAddressKey.Province].value;
  const [cityValue, setCityValue] = useState<FormControlValue>(
    questionFlowForm[PreApprovalQuestionsAddressKey.City].value
  );
  const [cityOptionList, setCityOptionList] = useState(
    surveyFormCityConfig.options
  );
  const [
    cityOptionListForSelectedProvince,
    setCityOptionListForSelectedProvince,
  ] = useState(cityOptionList);
  const storeCityOptionValue = (value: FormControlValue) => {
    setCityValue(value);
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.City]: {
        value,
        isDataValid: isDataValid(value),
      },
    });
  };
  const onSearch = (searchText: string) => {
    const searchResult = fuzzySearch(searchText, cityOptionList, ["label"]);
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.City]: {
        value: "",
        isDataValid: false,
      },
    });
    setCityOptionListForSelectedProvince(searchResult);
  };

  useEffect(() => {
    if (skipInitialRender) {
      setSkipInitialRender(false);
    } else {
      storeCityOptionValue("");
      if (!provinceValue) {
        setCityOptionList([]);
      } else {
        setCityOptionList(
          generateSurveyFormCityOptionList(
            generateCityValueMap(
              provinceEnglishCityMap[
                provinceObject[
                  getProvinceKeyByValue(provinceValue as string)
                ] as keyof typeof provinceEnglishCityMap
              ]
            )
          )
        );
      }
    }
  }, [provinceValue]);

  return (
    <>
      <AddressFormItemTitle title={PreApprovalQuestionsAddressKey.City} />
      <Select
        options={cityOptionListForSelectedProvince}
        name={"city"}
        placeholder={t(surveyFormCityConfig.placeholder)}
        onChoose={storeCityOptionValue}
        enableSearch={true}
        onSearch={onSearch}
        value={cityValue}
        noOptionText={surveyFormCityConfig.noOptionText}
        errorIcon={AlertInfo}
        isShowDropDownByValue={true}
        floatDropdown={true}
        disabled={!provinceValue}
      />
    </>
  );
};

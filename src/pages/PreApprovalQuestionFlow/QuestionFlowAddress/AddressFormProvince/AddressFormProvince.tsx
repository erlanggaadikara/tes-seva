import React, { useState } from "react";
import { PreApprovalQuestionsAddressKey } from "models/models";
import { AddressFormItemTitle } from "AddressFormItemTitle/AddressFormItemTitle";
import { useTranslation } from "react-i18next";
import { isDataValid } from "SurveyForm/surveyFormUtils";
import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";
import { surveyFormProvinceConfig } from "./AddressFormProvince.config";
import { AlertInfo } from "components/icon/AlertInfo/AlertInfo";
import { Select } from "components/form/Select/Select";
import { FormControlValue } from "types/types";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";

export const AddressFormProvince = () => {
  const { t } = useTranslation();
  const { questionFlowForm, patchQuestionFlowForm } = useQuestionFlowForm();
  const [provinceValue, setProvinceValue] = useState<FormControlValue>(
    questionFlowForm[PreApprovalQuestionsAddressKey.Province].value
  );
  const [provinceOptionList, setProvinceOptionList] = useState(
    surveyFormProvinceConfig.options
  );

  const onChoose = (value: FormControlValue) => {
    setProvinceValue(value);
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.Province]: {
        value,
        isDataValid: isDataValid(value),
      },
    });
  };
  const onSearch = (searchText: string) => {
    const searchResult = fuzzySearch(
      searchText,
      surveyFormProvinceConfig.options,
      ["label"]
    );
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.Province]: {
        value: "",
        isDataValid: false,
      },
    });
    setProvinceOptionList(searchResult);
  };

  return (
    <>
      <AddressFormItemTitle title={PreApprovalQuestionsAddressKey.Province} />
      <Select
        options={provinceOptionList}
        name={"province"}
        placeholder={t(surveyFormProvinceConfig.placeholder)}
        onChoose={onChoose}
        enableSearch={true}
        onSearch={onSearch}
        value={provinceValue}
        noOptionText={surveyFormProvinceConfig.noOptionText}
        errorIcon={AlertInfo}
        isShowDropDownByValue={true}
        floatDropdown={true}
      />
    </>
  );
};

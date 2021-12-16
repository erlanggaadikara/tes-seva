import {
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
} from "models/models";
import { ProvinceOptions } from "localization/locales/cityOptions/cityOptions.en";
import i18n from "i18next";
import { ProvinceEnum } from "./provinceCityDataProcessor/test/testData.config";
import { generateProvinceObjectForIndonesia } from "./provinceCityDataProcessor/provinceCityDataProcessor";

export const provinceObject: Partial<ProvinceOptions> =
  generateProvinceObjectForIndonesia();

export const generateProvinceOptionList = (
  cityOptions: Partial<ProvinceOptions> = provinceObject
) => {
  return Object.keys(cityOptions).map((key) => {
    return {
      value: cityOptions[key as keyof typeof ProvinceEnum],
      label: i18n.t(
        `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.Province}.options.${key}`
      ),
    };
  });
};

export const surveyFormProvinceConfig = {
  options: generateProvinceOptionList(),
  placeholder: `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.Province}.placeholder`,
  noOptionText: `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.Province}.noOptionText`,
};

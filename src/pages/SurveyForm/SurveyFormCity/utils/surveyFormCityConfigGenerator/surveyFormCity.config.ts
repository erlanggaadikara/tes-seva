import { Cities } from "models/cities";
import { CityOptions } from "localization/locales/cityOptions/cityOptions.en";
import { generateCityValueMap } from "cityDataProcess/cityDataProcess";
import i18n from "i18next";

export const generateSurveyFormCityOptionList = (
  cityOptions: Partial<CityOptions> = generateCityValueMap()
) => {
  return Object.keys(cityOptions).map((key) => {
    return {
      value: cityOptions[key as keyof typeof Cities],
      label: i18n.t(`surveyForm.fields.city.options.${key}`),
    };
  });
};

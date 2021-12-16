import {
  originalCityDataEnglish,
  originalCityDataIndonesia,
} from "./cityOriginalData.config";
import { capitalizeWords } from "utils/stringUtils";
import { CityOptions } from "localization/locales/cityOptions/cityOptions.en";
import { cityList } from "pages/PreApprovalQuestionFlow/QuestionFlowAddress/AddressFormProvince/provinceCityDataProcessor/provinceCityDataProcessor";

export const getOriginalCityList = (
  city: string = originalCityDataIndonesia
): string[] => {
  return city.split(/\r\n|\n|\r/);
};
export const originalCityListIndonesia = cityList;
// todo change this when we get city english data
export const originalCityListEnglish = getOriginalCityList(
  originalCityDataEnglish
);

export const generateCityObjectForIndonesia = (
  cityList: string[] = originalCityListIndonesia
): Partial<CityOptions> => {
  return cityList.reduce<Record<string, string>>((accumulator, current) => {
    const key = current.replace(/\s/g, "").replace(/-/, "").replace(/\//, "");
    accumulator[key] = current;
    return accumulator;
  }, {});
};
export const generateCityObjectForEnglish = (
  cityListIndonesia: string[] = originalCityListIndonesia,
  cityListEnglish: string[] = originalCityListEnglish
): Partial<CityOptions> => {
  return cityListIndonesia.reduce<Record<string, string>>(
    (accumulator, current, index) => {
      const key = current.replace(/\s/g, "").replace(/-/, "").replace(/\//, "");
      accumulator[key] = cityListEnglish[index];
      return accumulator;
    },
    {}
  );
};
export const generateCityEnumObject = (
  cityList: string[] = originalCityListIndonesia
) => {
  return cityList.reduce<Record<string, string>>((accumulator, current) => {
    const key = current.replace(/\s/g, "").replace(/-/, "").replace(/\//, "");
    accumulator[key] = key;
    return accumulator;
  }, {});
};
export const upperCaseCityList = (
  cityList: string[] = originalCityListIndonesia
) => {
  return cityList.map((item) => {
    return capitalizeWords(item);
  });
};
export const generateCityValueMap = (
  cityList: string[] = originalCityListIndonesia
) => {
  return cityList.reduce<Record<string, string>>((accumulator, current) => {
    const key = current.replace(/\s/g, "").replace(/-/, "").replace(/\//, "");
    accumulator[key] = current;
    return accumulator;
  }, {});
};

import { provinceEnglishCityMap } from "./provinceCityData.config";
import { ProvinceOptions } from "localization/locales/cityOptions/cityOptions.en";
import { ProvinceEnum } from "./test/testData.config";

export const provinceList = Object.keys(provinceEnglishCityMap);

export const cityList = Object.values(provinceEnglishCityMap).reduce(
  (a, b) => [...a, ...b],
  []
);

export const generateProvinceObjectForIndonesia = (
  provinces: string[] = provinceList
): Partial<ProvinceOptions> => {
  return provinces.reduce<Record<string, string>>((accumulator, current) => {
    const key = getProvinceKeyByValue(current);
    accumulator[key] = current;
    return accumulator;
  }, {});
};

export const getProvinceKeyByValue = (
  provinceValue: string
): keyof typeof ProvinceEnum => {
  return provinceValue
    .replace(/\s/g, "")
    .replace(/-/, "")
    .replace(/\//, "") as keyof typeof ProvinceEnum;
};

export const generateProvinceEnumObject = (
  provinces: string[] = provinceList
) => {
  return provinces.reduce<Record<string, string>>((accumulator, current) => {
    const key = getProvinceKeyByValue(current);
    accumulator[key] = key;
    return accumulator;
  }, {});
};

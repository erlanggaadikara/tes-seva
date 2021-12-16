import { TFunction } from "i18next";
import { LanguageCode } from "models/models";
import { replacePriceSeparatorByLocalization } from "./numberUtils/numberUtils";

export const getRpFormattedPrice = (
  t: TFunction,
  priceValue: number | string,
  languageCode = LanguageCode.en
) => {
  return t(`RpPrice`, {
    priceValue: replacePriceSeparatorByLocalization(priceValue, languageCode),
  });
};
export const getTenureFormatted = (t: TFunction, count: number) => {
  return t(`common.tenureAmount`, {
    count: count,
  });
};

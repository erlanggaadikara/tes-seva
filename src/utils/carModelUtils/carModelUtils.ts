import { hundred, million, ten } from "const/const";
import {
  formatNumberByLocalization,
  formatPriceNumber,
} from "utils/numberUtils/numberUtils";
import { CarRecommendation, CarVariant } from "types/types";
import { LanguageCode } from "models/models";

type DpObject = {
  dpAmount: number;
};
type MonthlyInstallmentObject = {
  monthlyInstallment: number;
};
type CarModel = Pick<
  CarRecommendation,
  "lowestAssetPrice" | "highestAssetPrice"
>;
type CarModelWithBrandAndModel = Pick<CarRecommendation, "brand" | "model">;
type PriceValueObject = Pick<CarVariant, "priceValue">;

export const formatPriceRange = (
  prices: number[],
  digits = ten,
  languageCode = LanguageCode.en
) => {
  return `${formatNumberByLocalization(
    Math.min(...prices),
    languageCode,
    million,
    digits
  )}-${formatNumberByLocalization(
    Math.max(...prices),
    languageCode,
    million,
    digits
  )}`;
};

export const getDpRange = (
  variants: DpObject[],
  languageCode = LanguageCode.en
) => {
  return formatPriceRange(
    variants.map((variant) => variant.dpAmount),
    ten,
    languageCode
  );
};

export const getMonthlyInstallmentRange = (
  variants: MonthlyInstallmentObject[],
  languageCode = LanguageCode.en
) => {
  return formatPriceRange(
    variants.map((variant) => variant.monthlyInstallment),
    hundred,
    languageCode
  );
};

export const getModelPriceRange = (carModel: CarModel) => {
  return `${formatPriceNumber(carModel.lowestAssetPrice)}-${formatPriceNumber(
    carModel.highestAssetPrice
  )}`;
};
export const getVariantsPriceRange = (variants: PriceValueObject[]) => {
  return formatPriceRange(
    variants.map((variant) => variant.priceValue),
    hundred
  );
};

export const getModelName = (carModel: CarModelWithBrandAndModel) => {
  return `${carModel.brand} ${carModel.model}`;
};

import {
  LanguageCode,
  VariantSpecificationsType,
  VariantTransmissionType,
} from "models/models";
import { AutomaticTransmission } from "components/icon/Transmission/AutomaticTransmission";
import { ManualTransmission } from "components/icon/Transmission/ManualTransmission";

import { TFunction } from "i18next";
import { variantDetailsConfig } from "pages/VariantDetailsPage/variantDetails.config";
import {
  formatNumberByLocalization,
  RoundingStrategy,
} from "numberUtils/numberUtils";
import { VariantSpecifications } from "types/types";

export type SpecificationsUtils = {
  fuelType?: string;
  transmission?: string;
  engineCapacity?: number;
  carSeats?: number;
  bodyType?: string;
  length?: number;
};
interface GetSpecificationListParams {
  specifications: SpecificationsUtils;
  t: TFunction;
  currentLanguage: LanguageCode;
  sortBy?: VariantSpecificationsType[];
  onlyShowSeatNumber?: boolean;
}
export const getSpecificationList = ({
  specifications,
  t,
  currentLanguage,
  sortBy,
  onlyShowSeatNumber = false,
}: GetSpecificationListParams) => {
  const { fuelType, transmission, carSeats, bodyType, engineCapacity, length } =
    specifications;
  const variantSpecifications =
    variantDetailsConfig.variantSpecifications.items;

  const unSortedArray = variantSpecifications.map((item) => {
    let content = "";
    let icon = item.icon;
    switch (item.label) {
      case VariantSpecificationsType.BodyType:
        bodyType &&
          (content = t(item.contentLabel.replace("${param}", bodyType)));
        break;
      case VariantSpecificationsType.FuelType:
        fuelType &&
          (content = t(item.contentLabel.replace("${param}", fuelType)));
        break;
      case VariantSpecificationsType.Transmission:
        if (transmission) {
          content = t(item.contentLabel.replace("${param}", transmission));
          icon =
            transmission === VariantTransmissionType.Automatic
              ? AutomaticTransmission
              : ManualTransmission;
        }
        break;
      case VariantSpecificationsType.EngineCapacity:
        engineCapacity &&
          (content = t(item.contentLabel, { amount: engineCapacity }));
        break;
      case VariantSpecificationsType.CarSeats:
        carSeats &&
          (content = onlyShowSeatNumber
            ? `${carSeats}`
            : t(item.contentLabel, { amount: carSeats }));
        break;
      case VariantSpecificationsType.Length:
        length &&
          (content = t(item.contentLabel, {
            amount: formatNumberByLocalization(
              length,
              currentLanguage,
              undefined,
              undefined,
              RoundingStrategy.Ceil
            ),
          }));
        break;
      default:
        break;
    }
    return { ...item, icon, content, title: t(item.title) };
  });
  if (sortBy) {
    const result: VariantSpecifications[] = [];
    sortBy.forEach((sortByItem) => {
      unSortedArray.forEach((item) => {
        if (item.label === sortByItem) {
          result.push(item);
        }
      });
    });
    return result;
  } else {
    return unSortedArray;
  }
};

import { CarVariantDetails } from "types/types";
import {
  CarResultAndVariantParameterWithVariantIndex,
  CarResultParameters,
} from "helpers/amplitude/newFunnelEventTracking";

interface GetCarResultAndVariantParameter {
  carResultParameter: CarResultParameters;
  carVariantDetails: CarVariantDetails;
}
export const getCarResultAndVariantParameter = ({
  carResultParameter,
  carVariantDetails,
}: GetCarResultAndVariantParameter) => {
  const { id, name, priceValue } = carVariantDetails.variantDetail;
  const { monthlyInstallment, dpAmount, tenure } = carVariantDetails.loanDetail;
  const carVariantParameters = {
    variantID: id,
    variantName: name,
    variantPrice: priceValue,
    variantMonthlyInstallments: monthlyInstallment,
    variantDownPayment: dpAmount,
    variantTenure: tenure,
  };

  return {
    ...carResultParameter,
    ...carVariantParameters,
  };
};

type TrackVariantDetailsEvent = {
  carVariantDetails: CarVariantDetails | undefined;
  carResultParameter: CarResultParameters;
  trackFunction: (
    selectCarResultVariant: CarResultAndVariantParameterWithVariantIndex
  ) => void;
  imageIndex?: number;
};
export const trackVariantDetailsEvent = ({
  carVariantDetails,
  carResultParameter,
  trackFunction,
  imageIndex,
}: TrackVariantDetailsEvent) => {
  if (carVariantDetails) {
    const selectCarResultVariant = getCarResultAndVariantParameter({
      carVariantDetails,
      carResultParameter,
    });
    trackFunction({ imageIndex, ...selectCarResultVariant });
  }
};

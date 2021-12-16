import {
  VariantBodyType,
  VariantFuelType,
  VariantSpecificationsType,
  VariantTransmissionType,
} from "models/models";
import { BodyType } from "components/icon/BodyType/BodyType";
import { Fuel } from "components/icon/Fuel/Fuel";
import { ManualTransmission } from "components/icon/Transmission/ManualTransmission";
import { Engine } from "components/icon/Engine/Engine";
import { CarSeat } from "components/icon/CarSeat/CarSeat";
import { Length } from "components/icon/Dimensions/Length";
import { VariantDetailsInfo, VariantSpecifications } from "types/types";

interface VariantDetailsConfig extends VariantDetailsInfo {
  specifications: string;
  variantSpecifications: {
    items: VariantSpecifications[];
    brochure: string;
  };
}

export const variantDetailsConfig: VariantDetailsConfig = {
  discount: "variantDetails.discount",
  loanEstimate: "variantDetails.loanEstimate",
  downPayment: "variantDetails.downPayment",
  price: "variantDetails.priceUnit",
  priceAmount: "variantDetails.priceAmount",
  installments: "variantDetails.installments",
  tenure: "variantDetails.tenure",
  estimatesDes: "variantDetails.estimatesDes",
  insuranceDes: "variantDetails.insuranceDes",
  feesDes: "variantDetails.feesDes",
  specifications: "variantDetails.specifications",
  variantSpecifications: {
    items: [
      {
        label: VariantSpecificationsType.BodyType,
        title: "variantDetails.variantSpecifications.bodyType",
        icon: BodyType,
        content: VariantBodyType.MPV,
        contentLabel: "variantDetails.variantBodyType.${param}",
      },
      {
        label: VariantSpecificationsType.FuelType,
        title: "variantDetails.variantSpecifications.fuel",
        icon: Fuel,
        content: VariantFuelType.Hybrid,
        contentLabel: "variantDetails.variantFuelType.${param}",
      },
      {
        label: VariantSpecificationsType.Transmission,
        title: "variantDetails.variantSpecifications.transmission",
        icon: ManualTransmission,
        content: VariantTransmissionType.Manual,
        contentLabel: "variantDetails.variantTransmissionType.${param}",
      },
      {
        label: VariantSpecificationsType.EngineCapacity,
        title: "variantDetails.variantSpecifications.engineCapacity",
        icon: Engine,
        content: "engineAmount",
        contentLabel: "variantDetails.variantSpecifications.engineAmount",
      },
      {
        label: VariantSpecificationsType.CarSeats,
        title: "variantDetails.variantSpecifications.carSeats",
        icon: CarSeat,
        content: "carSeatsAmount",
        contentLabel: "variantDetails.variantSpecifications.carSeatsAmount",
      },
      {
        label: VariantSpecificationsType.Length,
        title: "variantDetails.variantSpecifications.length",
        icon: Length,
        content: "lengthAmount",
        contentLabel: "variantDetails.variantSpecifications.lengthAmount",
      },
    ],
    brochure: "variantDetails.variantSpecifications.brochure",
  },
  description: "variantDetails.description",
  confirmAgent: "variantDetails.confirmAgent",
  loanConfiguration: "variantDetails.loanConfiguration",
  loanApplyMessage: "variantDetails.loanApplyMessage",
};

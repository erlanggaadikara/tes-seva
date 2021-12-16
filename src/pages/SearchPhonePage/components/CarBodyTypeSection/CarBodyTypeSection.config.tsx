import React from "react";
import { VariantBodyType } from "models/models";
import { VariantBodyTypeHatchback } from "components/icon/VariantBodyTypeHatchback/VariantBodyTypeHatchback";
import { VariantBodyTypeSedan } from "components/icon/VariantBodyTypeSedan/VariantBodyTypeSedan";
import { VariantBodyTypeSUV } from "components/icon/VariantBodyTypeSUV/VariantBodyTypeSUV";
import { VariantBodyTypeMPV } from "components/icon/VariantBodyTypeMPV/VariantBodyTypeMPV";
import { VariantBodyTypeSport } from "components/icon/VariantBodyTypeSport/VariantBodyTypeSport";

export interface BodyType {
  type: VariantBodyType;
  img: JSX.Element;
}

export const BodyTypeConfig: Array<BodyType> = [
  {
    type: VariantBodyType.Hatchback,
    img: <VariantBodyTypeHatchback />,
  },
  {
    type: VariantBodyType.Sedan,
    img: <VariantBodyTypeSedan />,
  },
  {
    type: VariantBodyType.SUV,
    img: <VariantBodyTypeSUV />,
  },
  {
    type: VariantBodyType.MPV,
    img: <VariantBodyTypeMPV />,
  },
  {
    type: VariantBodyType.Sport,
    img: <VariantBodyTypeSport />,
  },
];

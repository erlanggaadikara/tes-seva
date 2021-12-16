import React from "react";
import { Toyota } from "components/icon/Toyota/Toyota";
import { Daihatsu } from "components/icon/Daihatsu/Daihatsu";
import { BMW } from "components/icon/BMW/BMW";
import { SupportedBrand } from "models/models";

export interface Brand {
  name: SupportedBrand;
  logo: JSX.Element;
}

export const Brands: Brand[] = [
  {
    name: SupportedBrand.toyota,
    logo: <Toyota />,
  },
  {
    name: SupportedBrand.daihatsu,
    logo: <Daihatsu />,
  },
  {
    name: SupportedBrand.bmw,
    logo: <BMW />,
  },
];

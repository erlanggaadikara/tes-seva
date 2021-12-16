import React from "react";
import logo from "./TafLogo.png";
import { IconProps } from "components/icon/iconType";

export const TafLogo = ({ width = 84, height = 48, className }: IconProps) => {
  return (
    <img
      src={logo}
      alt="TafLogo"
      style={{ width, height }}
      className={className}
    />
  );
};

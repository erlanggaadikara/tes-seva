import React from "react";
import ShareTwitterLogoImage from "./ShareTwitterLogo.png";
import { IconProps } from "iconType";

export const TwitterLogo = ({ width = 56, height = 56 }: IconProps) => {
  return (
    <img
      src={ShareTwitterLogoImage}
      alt="whats app logo"
      style={{ width, height }}
    />
  );
};

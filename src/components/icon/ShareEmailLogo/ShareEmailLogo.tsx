import React from "react";
import ShareEmailLogoImage from "./ShareEmailLogo.png";
import { IconProps } from "iconType";

export const EmailLogo = ({ width = 56, height = 56 }: IconProps) => {
  return (
    <img
      src={ShareEmailLogoImage}
      alt="whats app logo"
      style={{ width, height }}
    />
  );
};

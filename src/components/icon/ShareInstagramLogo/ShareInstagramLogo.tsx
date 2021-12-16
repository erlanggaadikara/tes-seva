import React from "react";
import ShareInstagramLogoImage from "./ShareInstagramLogo.png";
import { IconProps } from "iconType";

export const InstagramLogo = ({ width = 56, height = 56 }: IconProps) => {
  return (
    <img
      src={ShareInstagramLogoImage}
      alt="whats app logo"
      style={{ width, height }}
    />
  );
};

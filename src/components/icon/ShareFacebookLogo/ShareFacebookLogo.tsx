import React from "react";
import ShareFacebookLogoImage from "./ShareFacebookLogo.png";
import { IconProps } from "iconType";

export const FacebookLogo = ({ width = 56, height = 56 }: IconProps) => {
  return (
    <img
      src={ShareFacebookLogoImage}
      alt="whats app logo"
      style={{ width, height }}
    />
  );
};

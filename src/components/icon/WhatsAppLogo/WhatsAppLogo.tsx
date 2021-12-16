import React from "react";
import WhatsAppLogoImage from "./WhatsAppLogo.png";
import { IconProps } from "iconType";

export const WhatsAppLogo = ({ width = 56, height = 56 }: IconProps) => {
  return (
    <img
      src={WhatsAppLogoImage}
      alt="whats app logo"
      style={{ width, height }}
    />
  );
};

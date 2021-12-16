import React from "react";
import ShareWhatsappLogoImage from "./ShareWhatsappLogo.png";
import { IconProps } from "iconType";

export const WhatsappLogo = ({ width = 56, height = 56 }: IconProps) => {
  return (
    <img
      src={ShareWhatsappLogoImage}
      alt="whats app logo"
      style={{ width, height }}
    />
  );
};

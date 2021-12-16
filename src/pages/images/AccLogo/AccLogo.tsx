import React from "react";
import logo from "./AccLogo.png";
import { IconProps } from "components/icon/iconType";

export const AccLogo = ({ width = 48, height = 60 }: IconProps) => {
  return <img src={logo} alt="AccLogo" style={{ width, height }} />;
};

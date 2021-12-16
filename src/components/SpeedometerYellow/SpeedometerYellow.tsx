import { SpeedometerSvg } from "SpeedometerSvg/SpeedometerSvg";
import React from "react";
import { colors } from "styles/colors";
import { ColoredSpeedometerProps } from "SpeedometerRed/SpeedometerRed";
export const SpeedometerYellow = ({
  radius = 30,
  lineWidth = 9,
  restBlockColor = colors.white,
}: ColoredSpeedometerProps) => {
  const blockColors = [
    colors.secondaryDark,
    colors.secondaryDark,
    colors.secondaryDark,
    colors.secondaryDark,
    restBlockColor,
    restBlockColor,
  ];
  return (
    <SpeedometerSvg
      radius={radius}
      colors={blockColors}
      lineWidth={lineWidth}
    />
  );
};

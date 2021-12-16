import { SpeedometerSvg } from "SpeedometerSvg/SpeedometerSvg";
import React from "react";
import { colors } from "styles/colors";
import { ColoredSpeedometerProps } from "SpeedometerRed/SpeedometerRed";

export const SpeedometerGreen = ({
  radius = 30,
  lineWidth = 9,
}: ColoredSpeedometerProps) => {
  const blockColors = [
    colors.success,
    colors.success,
    colors.success,
    colors.success,
    colors.success,
    colors.success,
  ];
  return (
    <SpeedometerSvg
      radius={radius}
      colors={blockColors}
      lineWidth={lineWidth}
    />
  );
};

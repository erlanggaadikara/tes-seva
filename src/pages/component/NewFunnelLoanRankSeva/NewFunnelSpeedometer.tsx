import { SpeedometerSvg } from "components/SpeedometerSvg/SpeedometerSvg";
import { colors } from "styles/colors";
import React from "react";
import { NewFunnelLoanRank } from "models/models";

interface NewFunnelSpeedometerProps {
  loanRank: NewFunnelLoanRank;
  radius?: number;
  lineWidth?: number;
}
const newFunnelSpeedometerMap = {
  [NewFunnelLoanRank.Red]: [
    colors.label,
    colors.label,
    colors.white,
    colors.white,
    colors.white,
    colors.white,
  ],
  [NewFunnelLoanRank.Yellow]: [
    colors.primary1,
    colors.primary1,
    colors.primary1,
    colors.primary1,
    colors.white,
    colors.white,
  ],
  [NewFunnelLoanRank.Green]: [
    colors.error,
    colors.error,
    colors.error,
    colors.error,
    colors.error,
    colors.error,
  ],
  [NewFunnelLoanRank.Grey]: [
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
  ],
};
export const NewFunnelSpeedometer = ({
  loanRank,
  radius = 30,
  lineWidth = 8,
}: NewFunnelSpeedometerProps) => {
  return (
    <SpeedometerSvg
      radius={radius}
      colors={newFunnelSpeedometerMap[loanRank]}
      lineWidth={lineWidth}
    />
  );
};

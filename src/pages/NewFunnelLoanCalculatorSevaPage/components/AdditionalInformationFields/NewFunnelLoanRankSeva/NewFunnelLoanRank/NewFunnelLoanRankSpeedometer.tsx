import React from "react";
import styled from "styled-components";
import { NewFunnelSpeedometerSeva } from "./NewFunnelSpeedometer";
import { NewFunnelLoanRankBg } from "./images/NewFunnelLoanRankBg";
import { NewFunnelLoanRank } from "models/models";
import { colors } from "styles/colors";
import { ZIndex } from "styles/zIndex";
import { IconProps } from "components/icon/iconType";

const newFunnelLoanRankIconBgMapSeva = {
  [NewFunnelLoanRank.Red]: colors.lightGrey,
  [NewFunnelLoanRank.Yellow]: colors.white,
  [NewFunnelLoanRank.Green]: colors.errorLight,
  [NewFunnelLoanRank.Grey]: colors.inputBg,
};

interface NewFunnelLoanRankIconProps extends IconProps {
  height?: number;
  borderTopRadius?: number;
  borderBottomRadius?: number;
  loanRank: NewFunnelLoanRank;
}

export const NewFunnelLoanRankSpeedometerSeva = ({
  borderTopRadius,
  borderBottomRadius,
  loanRank,
  height = 56,
}: NewFunnelLoanRankIconProps) => {
  return (
    <StyledWrapper height={height}>
      <StyledBackground>
        <NewFunnelLoanRankBg
          height={height}
          borderTopRadius={borderTopRadius}
          borderBottomRadius={borderBottomRadius}
          color={newFunnelLoanRankIconBgMapSeva[loanRank]}
        />
      </StyledBackground>
      <StyledContent>
        <NewFunnelSpeedometerSeva
          radius={15}
          lineWidth={5}
          loanRank={loanRank}
        />
      </StyledContent>
    </StyledWrapper>
  );
};
const width = 104;
const StyledWrapper = styled.div<{ height: number }>`
  width: ${width}px;
  position: relative;
  align-items: center;
  justify-content: start;
  display: flex;
  background: transparent;
  background-size: 100%;
  height: ${({ height }) => height}px;
  padding-left: 28px;
`;

const StyledContent = styled.div`
  z-index: ${ZIndex.Overlay};
`;

const StyledBackground = styled.div`
  top: 0;
  left: 0;
  right: ${width}px;
  bottom: 0;
  position: absolute;
`;

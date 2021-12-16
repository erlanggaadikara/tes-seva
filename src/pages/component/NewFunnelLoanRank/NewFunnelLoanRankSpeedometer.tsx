import React from "react";
import styled from "styled-components";
import { NewFunnelLoanRank } from "models/models";
import { IconProps } from "components/icon/iconType";
import { colors } from "styles/colors";
import { NewFunnelSpeedometer } from "./NewFunnelSpeedometer";
import { NewFunnelLoanRankBg } from "./images/NewFunnelLoanRankBg";
import { ZIndex } from "styles/zIndex";

const newFunnelLoanRankIconBgMap = {
  [NewFunnelLoanRank.Red]: colors.errorLight,
  [NewFunnelLoanRank.Yellow]: colors.secondary20,
  [NewFunnelLoanRank.Green]: colors.secondaryLight,
  [NewFunnelLoanRank.Grey]: colors.inputBg,
};

interface NewFunnelLoanRankIconProps extends IconProps {
  height?: number;
  borderTopRadius?: number;
  borderBottomRadius?: number;
  loanRank: NewFunnelLoanRank;
}

export const NewFunnelLoanRankSpeedometer = ({
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
          color={newFunnelLoanRankIconBgMap[loanRank]}
        />
      </StyledBackground>
      <StyledContent>
        <NewFunnelSpeedometer radius={15} lineWidth={5} loanRank={loanRank} />
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

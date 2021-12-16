import React from "react";
import { IconProps } from "components/icon/iconType";
import styled from "styled-components";

interface NewFunnelLoanRankBgProps extends IconProps {
  borderTopRadius?: number;
  borderBottomRadius?: number;
}

export const NewFunnelLoanRankBg = ({
  width = 104,
  height,
  color,
  borderTopRadius = 0,
  borderBottomRadius = 16,
}: NewFunnelLoanRankBgProps) => {
  return (
    <StyledWrapper
      width={width}
      height={height}
      viewBox="0 0 104 56"
      fill="none"
      borderTopRadius={borderTopRadius}
      borderBottomRadius={borderBottomRadius}
    >
      <g opacity="0.8">
        <path
          d="M0 0.00143051L72.0001 0C80.8366 0 88.0001 7.16344 88.0001 16V56H7.67708e-05L0 0.00143051Z"
          fill={color}
        />
        <path
          d="M88.0001 56H104C95.1635 56 88.0001 48.8366 88.0001 40V56Z"
          fill={color}
        />
      </g>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.svg<{
  borderTopRadius: number;
  borderBottomRadius: number;
}>`
  background: transparent;
  border-top-left-radius: ${({ borderTopRadius }) => borderTopRadius}px;
  border-bottom-left-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius}px;
`;

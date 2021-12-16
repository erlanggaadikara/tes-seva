import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { MenuOutlined } from "components/icon/MenuOutlined/MenuOutlined";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";

export interface DragBoxProps extends HTMLAttributes<HTMLDivElement> {
  isTextRight?: boolean;
  label: string;
  width?: string;
  color?: string;
}
export const Box = ({ isTextRight, label, width, color }: DragBoxProps) => {
  return (
    <StyledSelectedLabelContainer width={width}>
      <StyledSelectedLabelText isTextRight={isTextRight} color={color}>
        {label}
      </StyledSelectedLabelText>
      <StyledIcon isTextRight={isTextRight}>
        <MenuOutlined />
      </StyledIcon>
    </StyledSelectedLabelContainer>
  );
};
type StyledBoxProps = Pick<DragBoxProps, "isTextRight" | "width" | "color">;
const StyledSelectedLabelContainer = styled.div<StyledBoxProps>`
  height: 50%;
  width: ${({ width }) => width};
  background: ${colors.white};
  border-radius: 10px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledIcon = styled.span<StyledBoxProps>`
  display: inline-block;
  order: ${({ isTextRight }) => setFlexOrder(isTextRight)};
`;
const StyledSelectedLabelText = styled(LinkLabelMediumSemiBold)<StyledBoxProps>`
  display: inline-block;
  order: ${({ isTextRight }) => setFlexOrder(!isTextRight)};
  color: ${({ color }) => color};
`;
const setFlexOrder = (isTextRight: boolean | undefined) => {
  return isTextRight ? 1 : 0;
};

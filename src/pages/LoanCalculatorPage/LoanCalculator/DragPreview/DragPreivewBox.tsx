import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { MenuOutlined } from "components/icon/MenuOutlined/MenuOutlined";
import { colors } from "styles/colors";

export interface DragBoxProps extends HTMLAttributes<HTMLDivElement> {
  isTextRight?: boolean;
  label: string;
  width?: string;
  color?: string;
}
export const DragPreviewBox = ({ isTextRight, width }: DragBoxProps) => {
  return (
    <StyledDiv isTextRight={isTextRight}>
      <StyledSelectedLabelContainer width={width} isTextRight={isTextRight}>
        <StyledIcon isTextRight={isTextRight}>
          <MenuOutlined color={colors.primaryLight1} />
        </StyledIcon>
      </StyledSelectedLabelContainer>
      <StyledLine isTextRight={isTextRight} />
    </StyledDiv>
  );
};
type StyledBoxProps = Pick<DragBoxProps, "isTextRight" | "width" | "color">;
const StyledSelectedLabelContainer = styled.div<StyledBoxProps>`
  height: 50%;
  width: ${({ width }) => width};
  background: transparent;
  border: 2px solid ${colors.primaryLight1};
  border-radius: 10px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  justify-content: ${({ isTextRight }) =>
    isTextRight ? "flex-end" : "flex-start"};
  order: ${({ isTextRight }) => setFlexOrder(isTextRight)};
`;
const StyledIcon = styled.span<StyledBoxProps>`
  display: inline-block;
  order: ${({ isTextRight }) => setFlexOrder(!isTextRight)};
`;
const setFlexOrder = (isTextRight: boolean | undefined) => {
  return isTextRight ? 1 : 0;
};
const StyledLine = styled.p<StyledBoxProps>`
  border-bottom: 2px solid ${colors.primaryLight1};
  width: 16px;
`;
const StyledDiv = styled.div<StyledBoxProps>`
  display: flex;
  align-items: center;
`;

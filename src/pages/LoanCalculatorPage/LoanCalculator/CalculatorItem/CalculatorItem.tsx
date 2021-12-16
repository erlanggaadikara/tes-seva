import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { DragBox } from "DragBox/DragBox";
import { DragSourceType } from "dragAndDropModel";
import { useDrop } from "react-dnd";
import { useLoanCalculatorPatch } from "context/loanCalculatorContext/loanCalculatorContext";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
type valueType = number | string;
export interface CalculatorDataProps<T extends valueType> {
  value: T;
  isSelected?: boolean;
}
export interface CalculatorItemProps<T extends valueType> {
  data: CalculatorDataProps<T>;
  label: string;
  isTextRight?: boolean | undefined;
  onSelect?: (value: T) => void;
  dragSourceType: DragSourceType;
  dragBoxWidth?: string;
  color?: string;
  height?: string;
}
export const CalculatorItem = <T extends valueType>({
  data: { value, isSelected },
  label,
  isTextRight,
  onSelect,
  dragSourceType,
  dragBoxWidth = "100px",
  color,
  height = "50px",
}: CalculatorItemProps<T>) => {
  const patchLoanCalculatorData = useLoanCalculatorPatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragSourceType,
      drop: () => {
        patchLoanCalculatorData({ [dragSourceType]: value });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [value]
  );
  return (
    <StyledCalculatorItem
      ref={drop}
      isOver={isOver}
      isTextRight={isTextRight}
      height={height}
      onClick={() => {
        onSelect && onSelect(value);
      }}
    >
      <StyledPrefixLine isTextRight={isTextRight} isSelected={isSelected} />
      <StyledLabelContainer isTextRight={isTextRight}>
        <StyledPureLabel color={color}>
          <LinkLabelSmallSemiBold>{label}</LinkLabelSmallSemiBold>
        </StyledPureLabel>
        <StyledDragLabel isTextRight={isTextRight}>
          {isSelected && (
            <DragBox
              label={label}
              isTextRight={isTextRight}
              dragSourceType={dragSourceType}
              width={dragBoxWidth}
              color={color}
            />
          )}
        </StyledDragLabel>
      </StyledLabelContainer>
    </StyledCalculatorItem>
  );
};
export type StyledCalculatorItemProps = Pick<
  CalculatorItemProps<number>,
  "isTextRight" | "height"
> &
  Pick<CalculatorDataProps<number>, "isSelected"> & { isOver?: boolean };
const StyledCalculatorItem = styled.div<StyledCalculatorItemProps>`
  background: ${({ isOver }) => (isOver ? `${colors.line}` : "none")};
  display: flex;
  height: ${({ height }) => height};
  align-items: center;
  justify-content: ${({ isTextRight }) =>
    isTextRight ? "flex-start" : "flex-end"};
`;
const StyledPrefixLine = styled.span<StyledCalculatorItemProps>`
  display: inline-block;
  order: ${({ isTextRight }) => setFlexOrder(!isTextRight)};
  margin-right: ${({ isTextRight, isSelected }) =>
    isTextRight && !isSelected ? "10px" : "0"};
  margin-left: ${({ isTextRight, isSelected }) =>
    !isTextRight && !isSelected ? "10px" : "0"};
  width: ${({ isTextRight, isSelected }) =>
    isTextRight && isSelected ? "16px" : "15px"};
  border-bottom: ${({ isSelected }) =>
    isSelected
      ? `2px solid ${colors.placeholder}`
      : `2px solid ${colors.line}`};
`;
const StyledLabelContainer = styled.div<StyledCalculatorItemProps>`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;
const setFlexOrder = (isTextRight: boolean | undefined) => {
  return isTextRight ? 1 : 0;
};
const StyledPureLabel = styled.div<StyledCalculatorItemProps>`
  position: relative;
  color: ${({ color }) => color};
`;
const StyledDragLabel = styled.div<StyledCalculatorItemProps>`
  position: absolute;
  z-index: 1;
  right: ${({ isTextRight }) => (isTextRight ? "auto" : 0)};
`;

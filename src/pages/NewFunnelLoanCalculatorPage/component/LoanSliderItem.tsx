import React from "react";
import styled from "styled-components";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { colors } from "styles/colors";

interface LoanPickerItemProps {
  width?: number;
  value: string;
  color: string;
  isSelected?: boolean;
}

export const LoanSliderItem = ({
  width = 100,
  value,
  color = colors.primary1,
  isSelected = false,
}: LoanPickerItemProps) => {
  return (
    <StyledItemWrapper>
      <StyledChildren>
        {isSelected ? (
          <StyledSelectedText width={width} color={color}>
            {value}
          </StyledSelectedText>
        ) : (
          <StyledUnselectedText width={width} color={color}>
            {value}
          </StyledUnselectedText>
        )}
      </StyledChildren>
    </StyledItemWrapper>
  );
};
const StyledItemWrapper = styled.li`
  width: auto;
  display: flex;
  align-items: center;
  justify-self: center;
`;

const StyledChildren = styled.div`
  display: flex;
  width: 100%;
`;

const StyledSelectedText = styled(LinkLabelMediumSemiBold)<{
  color: string;
  width: number;
}>`
  width: ${({ width }) => width}px;
  text-align: center;
  color: ${({ color }) => color};
`;
const StyledUnselectedText = styled(LinkLabelXSmallSemiBold)<{
  color: string;
  width: number;
}>`
  width: ${({ width }) => width}px;
  text-align: center;
  color: ${({ color }) => color};
`;

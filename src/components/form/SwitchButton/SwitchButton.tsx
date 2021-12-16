import React from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelXSmallSemiBoldStyle } from "components/typography/LinkLabelXSmallSemiBold";

interface SwitchButtonProps {
  switchClick: (value: boolean) => void;
  switchBtnValues: string[];
  isChecked: boolean;
}

export const SwitchButton = ({
  switchClick,
  switchBtnValues,
  isChecked = true,
}: SwitchButtonProps) => {
  return (
    <StyledContainer>
      <StyledSwitchButton>
        <StyledButton
          isChecked={isChecked}
          onClick={() => switchClick(!isChecked)}
        >
          {switchBtnValues[0]}
        </StyledButton>
        <StyledButton
          isChecked={!isChecked}
          onClick={() => switchClick(!isChecked)}
        >
          {switchBtnValues[1]}
        </StyledButton>
      </StyledSwitchButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  flex-direction: column;
  height: 100%;
`;

const StyledSwitchButton = styled.div`
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.primaryLight4};
  border-radius: 12px;
`;

const StyledButton = styled.button<{ isChecked: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  :hover {
    cursor: pointer;
  }
  ${LinkLabelXSmallSemiBoldStyle}
  ${({ isChecked }) =>
    isChecked
      ? css`
          background: ${colors.primaryLight1};
          border: 1px solid ${colors.primaryLight1};
          color: ${colors.title};
        `
      : css`
          background: ${colors.white};
          border: 1px solid ${colors.white};
          color: ${colors.label};
        `}
`;

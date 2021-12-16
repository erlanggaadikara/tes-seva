import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <ProgressBarContainer>
      <ProgressBarIndicator percentage={percentage} />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  margin: 0 auto 24px;
  position: relative;
  background-color: ${colors.line};
  border-radius: 2px;
`;

interface ProgressBarProps {
  percentage: number;
}

const easeOutBack = `cubic-bezier(0.34, 1.56, 0.64, 1)`;

const ProgressBarIndicator = styled.div<ProgressBarProps>`
  width: ${({ percentage }) => percentage}%;
  transition: width 0.5s ${easeOutBack};
  height: 8px;
  position: absolute;
  left: 0;
  background-color: ${colors.primary1};
  border-radius: 2px;
`;

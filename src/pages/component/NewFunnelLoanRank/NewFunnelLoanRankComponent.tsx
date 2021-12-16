import React from "react";
import styled from "styled-components";
import { NewFunnelLoanRank } from "models/models";
import { NewFunnelLoanRankSpeedometer } from "./NewFunnelLoanRankSpeedometer";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { TextSmallMedium } from "components/typography/TextSmallMedium";
import { loanRankColor } from "NewFunnelLoanCalculatorPage/newFunnelLoanCalculatorPage.config";
import { TextLegalSemiBold } from "components/typography/TextLegalSemiBold";

interface NewFunnelLoanRankProps {
  loanRank: NewFunnelLoanRank;
  borderTopRadius?: number;
  borderBottomRadius?: number;
  isMiniModel?: boolean;
}

const newFunnelLoadRankComponentMap = {
  [NewFunnelLoanRank.Red]: {
    background: loanRankColor[NewFunnelLoanRank.Red],
    label: `newFunnelLoanRank.loadRank.${NewFunnelLoanRank.Red}`,
    fontColor: colors.white,
  },
  [NewFunnelLoanRank.Yellow]: {
    background: loanRankColor[NewFunnelLoanRank.Yellow],
    label: `newFunnelLoanRank.loadRank.${NewFunnelLoanRank.Yellow}`,
    fontColor: colors.title,
  },
  [NewFunnelLoanRank.Green]: {
    background: loanRankColor[NewFunnelLoanRank.Green],
    label: `newFunnelLoanRank.loadRank.${NewFunnelLoanRank.Green}`,
    fontColor: colors.title,
  },
  [NewFunnelLoanRank.Grey]: {
    background: loanRankColor[NewFunnelLoanRank.Grey],
    label: `newFunnelLoanRank.loadRank.${NewFunnelLoanRank.Grey}`,
    fontColor: colors.placeholder,
  },
};

export const NewFunnelLoanRankComponent = ({
  loanRank,
  borderTopRadius = 0,
  borderBottomRadius = 14,
  isMiniModel = false,
}: NewFunnelLoanRankProps) => {
  const { t } = useTranslation();
  const config = newFunnelLoadRankComponentMap[loanRank];
  return (
    <StyledWrapper
      background={config.background}
      borderTopRadius={borderTopRadius}
      borderBottomRadius={borderBottomRadius}
    >
      <NewFunnelLoanRankSpeedometer
        borderTopRadius={borderTopRadius}
        borderBottomRadius={borderBottomRadius}
        loanRank={loanRank}
      />
      <StyledLabel color={config.fontColor}>
        {isMiniModel ? (
          <TextLegalSemiBold>
            {t(newFunnelLoadRankComponentMap[loanRank].label)}
          </TextLegalSemiBold>
        ) : (
          <TextSmallMedium>
            {t(newFunnelLoadRankComponentMap[loanRank].label)}
          </TextSmallMedium>
        )}
      </StyledLabel>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div<{
  background: string;
  borderTopRadius: number;
  borderBottomRadius: number;
}>`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  background: ${({ background }) => background};
  border-top-right-radius: ${({ borderTopRadius }) => borderTopRadius}px;
  border-top-left-radius: ${({ borderTopRadius }) => borderTopRadius}px;
  border-bottom-left-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius}px;
  border-bottom-right-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius}px;
`;
const StyledLabel = styled.div<{ color: string }>`
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  text-align: center;
  color: ${({ color }) => color};
`;

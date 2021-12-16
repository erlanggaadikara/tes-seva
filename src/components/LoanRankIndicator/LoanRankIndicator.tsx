import React from "react";
import styled, { css } from "styled-components";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LoanRank } from "models/models";
import { SpeedometerGreen } from "SpeedometerGreen/SpeedometerGreen";
import { SpeedometerYellow } from "SpeedometerYellow/SpeedometerYellow";
import { SpeedometerRed } from "SpeedometerRed/SpeedometerRed";
import { useTranslation } from "react-i18next";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { getLoanRankBgColor } from "utils/DetailsDataProcess";

const carTileSpeedometerMap = {
  [LoanRank.Green]: SpeedometerGreen,
  [LoanRank.Yellow]: SpeedometerYellow,
  [LoanRank.Red]: SpeedometerRed,
};

interface Props {
  loanRank: LoanRank | keyof typeof LoanRank;
  speedometerRadius?: number;
  speedometerLineWidth?: number;
  reverse?: boolean;
  isBigSize?: boolean;
}

export const LoanRankIndicator = ({
  loanRank,
  speedometerRadius = 24,
  speedometerLineWidth = 8,
  reverse = false,
  isBigSize = false,
}: Props) => {
  const { t } = useTranslation();

  return (
    <StyledLoanRankContainer
      bgColor={getLoanRankBgColor(loanRank)}
      isBigSize={isBigSize}
      reverse={reverse}
    >
      {carTileSpeedometerMap[loanRank]({
        radius: speedometerRadius,
        lineWidth: speedometerLineWidth,
      })}
      <LoanMessage>
        {isBigSize ? (
          <LinkLabelMediumSemiBold>
            {t(`loanRankIndicator.loanRank.${loanRank}`)}
          </LinkLabelMediumSemiBold>
        ) : (
          <LinkLabelXSmallSemiBold>
            {t(`loanRankIndicator.loanRank.${loanRank}`)}
          </LinkLabelXSmallSemiBold>
        )}
        <br />
        <LinkLabelLegalSemiBold>
          {t(`loanRankIndicator.loanApplyMessage`)}
        </LinkLabelLegalSemiBold>
      </LoanMessage>
    </StyledLoanRankContainer>
  );
};

interface LoanRankProps {
  bgColor?: string;
  isBigSize: boolean;
  reverse: boolean;
}

const StyledLoanRankContainer = styled.div<LoanRankProps>`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: ${({ bgColor }) => bgColor};

  ${({ reverse, isBigSize }) =>
    reverse &&
    css`
      flex-direction: row-reverse;
      justify-content: space-between;
      padding: 0;

      ${LoanMessage} {
        margin-left: 0;
        max-width: ${isBigSize ? "unset" : "145px"};
      }
    `}
`;

const LoanMessage = styled.div`
  margin-left: 8px;
  max-width: 135px;
`;

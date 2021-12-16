import React from "react";
import styled from "styled-components";
import { LoanRank } from "models/models";
import {
  getLoanRankBgColor,
  getLoanRatingText,
  getSpeedometerMap,
} from "utils/DetailsDataProcess";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";

interface LoanRankProps {
  loadRank: LoanRank;
  info?: string;
}

export const LoanRankComponent = ({
  loadRank,
  info,
  ...restProps
}: LoanRankProps) => {
  return (
    <StyledWrapper background={getLoanRankBgColor(loadRank)} {...restProps}>
      <StyledSpeedometer>
        {getSpeedometerMap(loadRank)({
          radius: 38,
          lineWidth: 10,
        })}
      </StyledSpeedometer>
      <StyledDes>
        <LinkLabelMediumSemiBold>
          {getLoanRatingText(loadRank)}
        </LinkLabelMediumSemiBold>
        {info && <LinkLabelLegalSemiBold>{info}</LinkLabelLegalSemiBold>}
      </StyledDes>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ background: number | string }>`
  width: 100%;
  background: ${({ background }) => background};
  padding: 18px 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  display: flex;
`;
const StyledDes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledSpeedometer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

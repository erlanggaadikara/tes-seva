import React from "react";
import { AffordableCarItem } from "./AffordableCarItem";
import styled from "styled-components";
import { CarRecommendation } from "types/types";
import { colors } from "styles/colors";
import { tracSelectV2LoanCalculatorRecommendation } from "helpers/amplitude/newLoanCalculatorEventTracking";
import { formatPriceNumber } from "utils/numberUtils/numberUtils";
import { NewFunnelLoanRank } from "models/models";
import {
  getDpRange,
  getMonthlyInstallmentRange,
} from "utils/carModelUtils/carModelUtils";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
interface AffordableCarListProps {
  newFunnelRecommendations: CarRecommendation[];
}

export const AffordableCarList = ({
  newFunnelRecommendations,
}: AffordableCarListProps) => {
  const { currentLanguage } = useCurrentLanguageFromContext();
  const onCarItemClick = (index: number, item: CarRecommendation) => {
    const carPriceRange = `${formatPriceNumber(
      item.lowestAssetPrice
    )}-${formatPriceNumber(item.highestAssetPrice)}`;
    const monthlyInstallmentRange = getMonthlyInstallmentRange(
      item.variants,
      currentLanguage
    );
    const dpRange = getDpRange(item.variants, currentLanguage);

    tracSelectV2LoanCalculatorRecommendation({
      index,
      carID: item.id,
      carName: `${item.brand} ${item.model}`,
      price: carPriceRange,
      loanRank: item.loanRank as NewFunnelLoanRank,
      monthlyInstallments: monthlyInstallmentRange,
      downPayment: dpRange,
    });
  };
  return (
    <StyledWrapper>
      {newFunnelRecommendations.map((item: CarRecommendation, index) => (
        <StyledCarList key={item.id}>
          <AffordableCarItem
            carModel={item}
            onCarTileClick={() => onCarItemClick(index, item)}
          />
        </StyledCarList>
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 16px;
  background: ${colors.white};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledCarList = styled.div`
  flex: 0 0 auto;
  margin-right: 20px;
  width: 82%;
  :last-child {
    padding-right: 16px;
  }
`;

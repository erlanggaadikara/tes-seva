import React, { useRef } from "react";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import styled from "styled-components";
import { colors, transparent } from "styles/colors";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { CarRecommendation } from "types/types";
import { useTranslation } from "react-i18next";
import { NewFunnelLoanRankComponent } from "component/NewFunnelLoanRank/NewFunnelLoanRankComponent";
import { NewFunnelLoanRank } from "models/models";
import { Calendar } from "components/icon/Calendar/Calendar";
import { AffordableCarItemIconLabel } from "./AffordableCarItemIconLabel";
import {
  getDpRange,
  getMonthlyInstallmentRange,
} from "utils/carModelUtils/carModelUtils";
import { variantListUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import {
  getCarModelDetailsById,
  handleRecommendationsAndCarModelDetailsUpdate,
} from "services/recommendations";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { getClientWidth } from "utils/componentUtils";
import { Card } from "components/icon/Card/Card";
import { Clock } from "components/icon/Clock/Clock";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { getNewFunnelAllRecommendations } from "services/newFunnel";
import { formatPriceNumber } from "utils/numberUtils/numberUtils";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";

interface CarTileProps {
  carModel: CarRecommendation;
  onCarTileClick: () => void;
}

export const AffordableCarItem = ({
  carModel,
  onCarTileClick,
}: CarTileProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useCurrentLanguageFromContext();
  const history = useHistory();
  const carTileRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carTileWidth = carTileRef.current?.clientWidth ?? 0;
  const { setCarModelDetails } = useContextCarModelDetails();
  const { clearFunnelQuery } = useFunnelQueryData();
  const { setRecommendations } = useContextRecommendations();
  const carPriceRange = `${formatPriceNumber(
    carModel.lowestAssetPrice
  )}-${formatPriceNumber(carModel.highestAssetPrice)}`;

  const monthlyInstallmentRange = getMonthlyInstallmentRange(
    carModel.variants,
    currentLanguage
  );
  const dpRange = getDpRange(carModel.variants, currentLanguage);

  const onWrapperClick = () => {
    onCarTileClick();
    Promise.all([
      getNewFunnelAllRecommendations(),
      getCarModelDetailsById(carModel.id),
    ])
      .then(
        handleRecommendationsAndCarModelDetailsUpdate(
          setRecommendations,
          setCarModelDetails
        )
      )
      .then(() => {
        clearFunnelQuery();
        history.push(variantListUrl.replace(":id", carModel.id));
      });
  };

  return (
    <StyledCarTileWrapper onClick={onWrapperClick}>
      <CarTile>
        <CarTileHeader width={carTileWidth}>
          <WebpPicture
            src={carModel.image}
            fallbackImage={
              <CarImage
                src={carModel.image}
                alt="car image"
                useIntersectionObserver={true}
                threshold={415}
              />
            }
          />
          <CarTitle>
            <TextMediumRegular>{`${carModel.brand} ${carModel.model}`}</TextMediumRegular>
            <CarPriceRange>
              {t(`carResultsPage.priceRange`, {
                priceRange: carPriceRange,
              })}
            </CarPriceRange>
          </CarTitle>
        </CarTileHeader>
      </CarTile>
      {carModel.loanRank && (
        <NewFunnelLoanRankComponent
          loanRank={carModel.loanRank as NewFunnelLoanRank}
          borderBottomRadius={0}
          isMiniModel={true}
        />
      )}
      <StyledContent>
        <StyledAffordableCarItemLabel>
          <AffordableCarItemIconLabel
            icon={<Calendar />}
            title={t(
              "newFunnelLoanCalculatorPage.affordableCar.monthlyInstallment"
            )}
            value={t(`carResultsPage.priceRange`, {
              priceRange: monthlyInstallmentRange,
            })}
          />
        </StyledAffordableCarItemLabel>
        <StyledAffordableCarItemLabel>
          <AffordableCarItemIconLabel
            icon={<Card />}
            title={t("newFunnelLoanCalculatorPage.affordableCar.downPayment")}
            value={t(`carResultsPage.priceRange`, {
              priceRange: dpRange,
            })}
          />
        </StyledAffordableCarItemLabel>
        <StyledAffordableCarItemLabel>
          <AffordableCarItemIconLabel
            icon={<Clock width={24} height={24} />}
            title={t("newFunnelLoanCalculatorPage.affordableCar.tenure")}
            value={t(`newFunnelLoanCalculatorPage.affordableCar.years`, {
              tenure: carModel.variants[0]?.tenure,
            })}
          />
        </StyledAffordableCarItemLabel>
      </StyledContent>
    </StyledCarTileWrapper>
  );
};

const StyledCarTileWrapper = styled.div`
  box-shadow: 0 1px 16px ${transparent("title", 0.1)};
  width: 100%;
  border-radius: 16px;
`;

const CarTile = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${colors.body};
  background: ${colors.placeholder};
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
`;

const CarTileHeader = styled.div<{ width: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  height: ${getClientWidth() * 0.41}px;
  min-height: 150px;
`;

const CarImage = styled(LazyLoadImage)`
  object-fit: cover;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 150px;
`;

const CarTitle = styled.div`
  width: 100%;
  color: white;
  background: linear-gradient(5.43deg, #000000 16.66%, rgba(0, 0, 0, 0) 92.41%);
  padding: 2px 12px 8px;
  position: absolute;
  bottom: 0;
  text-align: left;
`;

const CarPriceRange = styled(LinkLabelMediumSemiBold)`
  display: block;
  margin-top: 2px;
`;

const StyledContent = styled.div`
  padding: 24px;
`;

const StyledAffordableCarItemLabel = styled.div`
  margin-bottom: 20px;
`;

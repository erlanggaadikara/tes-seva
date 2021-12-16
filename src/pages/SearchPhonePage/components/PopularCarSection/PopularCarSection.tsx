import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { LocalStorageKey, LocationStateKey } from "models/models";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import {
  CarRecommendation,
  CarRecommendationResponse,
  CarVariantLoan,
} from "types/types";
import {
  getCarModelDetailsById,
  handleCarModelDetailsUpdate,
} from "services/recommendations";
import { carResultsUrl, variantListUrl } from "routes/routes";
import { PopularCarModelTile } from "./PopularCarModelTile/PopularCarModelTile";
import { SectionHeader } from "SectionHeader/SectionHeader";
import { Button, ButtonType } from "components/Button/Button";
import { useContextPopularCars } from "context/popularCarsContext/popularCarsContext";
import { getPopularCars } from "services/newFunnel";
import { useTranslation } from "react-i18next";
import {
  trackSelectHomePopularCars,
  trackSelectHomeBrowseMore,
  trackNavigateHomePopularCars,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";
import { formatPriceNumber } from "utils/numberUtils/numberUtils";

export const PopularCarSection = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation<
    { [LocationStateKey.IsCarRecommendationsEmpty]: boolean } | undefined
  >();
  const { popularCarsRecommendation, setPopularCarsRecommendation } =
    useContextPopularCars();
  const [recommendationLists, setRecommendationLists] = useState<
    CarRecommendation[]
  >(popularCarsRecommendation);
  const [, setLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );
  const { setCarModelDetails } = useContextCarModelDetails();

  useEffect(() => {
    setRecommendationLists(popularCarsRecommendation);
  }, [popularCarsRecommendation]);

  useEffect(() => {
    if (location.state?.isCarRecommendationsEmpty) {
      history.replace({
        ...location,
        state: { [LocationStateKey.IsCarRecommendationsEmpty]: undefined },
      });
      return;
    }
    if (popularCarsRecommendation.length === 0) {
      getPopularCars({})
        .then((response: AxiosResponse<CarRecommendationResponse>) => {
          setPopularCarsRecommendation(response.data.carRecommendations || []);
        })
        .catch();
    }
  }, []);

  const handleCarTileClick = (car: CarRecommendation, index: number) => {
    logSelectionEvet(car, index);

    const { id: modelId } = car;
    setLoanDetails({
      modelId,
    });
    getCarModelDetailsById(modelId)
      .then(
        handleCarModelDetailsUpdate(
          popularCarsRecommendation,
          setCarModelDetails
        )
      )
      .then(() => {
        history.push({
          pathname: variantListUrl.replace(":id", modelId),
          state: {
            [LocationStateKey.IsFromPopularCar]: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logSelectionEvet = (car: CarRecommendation, index: number) => {
    const {
      id: modelId,
      brand,
      model,
      lowestAssetPrice,
      highestAssetPrice,
    } = car;

    const carPriceRange = `${formatPriceNumber(
      lowestAssetPrice
    )}-${formatPriceNumber(highestAssetPrice)}`;

    trackSelectHomePopularCars(
      {
        index,
        carID: modelId,
        carName: `${brand} ${model}`,
        price: t(`carResultsPage.priceRange`, {
          priceRange: carPriceRange,
        }),
      },
      NewHomePageVersion.phone
    );
  };

  const visibleIndexes: NodeJS.Timeout[] = [];
  const logCarTileVisibility = (visible: boolean, index: number) => {
    visibleIndexes[index] && clearTimeout(visibleIndexes[index]);
    if (visible) {
      const timer = setTimeout(() => {
        trackNavigateHomePopularCars(index, NewHomePageVersion.phone);
      }, 1000);
      visibleIndexes[index] = timer;
    }
  };

  const goToCarResultPage = () => {
    trackSelectHomeBrowseMore(NewHomePageVersion.phone);
    history.push(carResultsUrl, {
      //TODO: should this be false always?
      [LocationStateKey.IsCarRecommendationsEmpty]: false,
    });
  };
  return (
    <StyledPopularCarSection>
      <SectionHeader text={t("homePageSearch.popularCars.title")} />
      <HarderChanceSection>
        <HarderChanceOptionsContainer>
          {recommendationLists.map((car, index) => {
            return (
              <CarWrapper key={car.id}>
                <StyledCarModelTile
                  key={car.id}
                  carModel={car}
                  onModelClick={() => handleCarTileClick(car, index)}
                  onVisible={(visible) => logCarTileVisibility(visible, index)}
                />
              </CarWrapper>
            );
          })}
        </HarderChanceOptionsContainer>
      </HarderChanceSection>
      <Button
        buttonType={ButtonType.primary1}
        width={"91%"}
        onClick={goToCarResultPage}
      >
        {t("homePageSearch.popularCars.browseMoreCars")}
      </Button>
    </StyledPopularCarSection>
  );
};

const PagePadding = "16px";
const StyledPopularCarSection = styled.section`
  padding-bottom: 56px;
`;

const StyledCarModelTile = styled(PopularCarModelTile)`
  margin-bottom: 0;
  text-align: center;
`;
const HarderChanceSection = styled.div`
  margin-bottom: 24px;
`;
const HarderChanceOptionsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 ${PagePadding};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CarWrapper = styled.div`
  flex: 0 0 auto;
  margin-right: 20px;
  width: 82%;
  :last-child {
    padding-right: ${PagePadding};
  }
`;

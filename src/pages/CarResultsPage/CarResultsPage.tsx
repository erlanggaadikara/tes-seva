import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CarRecommendation,
  CarRecommendationResponse,
  CarVariantLoan,
} from "types/types";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "styles/colors";
import { CarModelTile } from "./CarModelTile/CarModelTile";
import { Button, ButtonType } from "components/Button/Button";
import { variantListUrl } from "routes/routes";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { Loading } from "component/loading/Loading";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { Footer } from "components/Footer/Footer";
import { SearchInput } from "components/SearchInput/SearchInput";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
import { FilterCarResults } from "./Filter/FilterCarResults";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import {
  getNewFunnelAllRecommendations,
  getNewFunnelRecommendationsByQueries,
} from "services/newFunnel";
import {
  getCarModelDetailsById,
  handleCarModelDetailsUpdate,
} from "services/recommendations";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import {
  LocalStorageKey,
  LocationStateKey,
  QueryKeys,
  SessionStorageKey,
} from "models/models";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import {
  useAmplitudePageView,
  useCarResultParameter,
} from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackSearchCarResults,
  trackSelectCarResult,
  trackViewCarResult,
} from "helpers/amplitude/newFunnelEventTracking";
import {
  getDpRange,
  getModelName,
  getModelPriceRange,
  getMonthlyInstallmentRange,
} from "utils/carModelUtils/carModelUtils";
import { useQuery } from "hooks/useQuery";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { PageHeader } from "component/PageHeader/PageHeader";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { ContactUsTile } from "./ContactUsTile/ContactUsTile";
import { TakeSurveyTile } from "./TakeSurveyTile/TakeSurveyTile";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { useSessionStorage } from "hooks/useSessionStorage/useSessionStorage";

export default function CarResultsPage() {
  console.log("Debug", "CarResultsPage", "Testing for ChunkLoadError");
  const { t } = useTranslation();
  const { currentLanguage } = useCurrentLanguageFromContext();
  const history = useHistory();
  const location = useLocation<
    { [LocationStateKey.IsCarRecommendationsEmpty]: boolean } | undefined
  >();
  const { bodyType, brand }: { bodyType: string; brand: string } = useQuery([
    QueryKeys.CarBodyType,
    QueryKeys.CarBrand,
  ]);
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const { recommendations, setRecommendations } = useContextRecommendations();
  const [recommendationLists, setRecommendationLists] =
    useState<CarRecommendation[]>(recommendations);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchEventTimer, setSearchEventTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const searchEventDelay = 2 * 1000;
  const [canLog, setCanLog] = useState<boolean>(false);
  const { showToast, RenderToast } = useToast();
  const [, setLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );
  const [modelDetail, setModelDetail] =
    useSessionStorage<CarVariantLoan | null>(
      SessionStorageKey.PreviouslyViewed,
      null
    );
  const { setCarModelDetails } = useContextCarModelDetails();
  const carResultParameters = useCarResultParameter();
  useAmplitudePageView(() => {
    trackViewCarResult(carResultParameters);
  });

  useEffect(() => {
    const forFilterRecommendations = recommendations.map((item) => {
      item.brandAndModel = `${item.brand} ${item.model}`;
      item.modelAndBrand = `${item.model} ${item.brand}`;
      return item;
    });
    const filterRecommendations = searchInputValue
      ? fuzzySearch(searchInputValue, forFilterRecommendations, [
          "brandAndModel",
          "modelAndBrand",
        ])
      : recommendations;
    setRecommendationLists(filterRecommendations);
  }, [searchInputValue]);

  useEffect(() => {
    setRecommendationLists(recommendations);
  }, [recommendations]);

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  const getAllRecommendations = () => {
    getNewFunnelAllRecommendations({
      onDownloadProgress: handleProgressUpdate(setProgress),
    })
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        setRecommendations(response.data.carRecommendations || []);
        resetLoadingState();
      })
      .catch(() => {
        resetLoadingState();
        showToast();
      });
  };

  useEffect(() => {
    if (location.state?.isCarRecommendationsEmpty) {
      history.replace({
        ...location,
        state: { [LocationStateKey.IsCarRecommendationsEmpty]: undefined },
      });
      return;
    }
    if (bodyType || brand) {
      setShowLoading(true);
      getNewFunnelRecommendationsByQueries(
        {
          [QueryKeys.CarBodyType]: bodyType?.split(","),
          [QueryKeys.CarBrand]: brand?.split(","),
        },
        {
          onDownloadProgress: handleProgressUpdate(setProgress),
        }
      )
        .then((response: AxiosResponse<CarRecommendationResponse>) => {
          setRecommendations(response.data.carRecommendations || []);
          resetLoadingState();
        })
        .catch(() => {
          resetLoadingState();
          showToast();
        });
      return;
    }
    if (recommendations.length === 0) {
      setShowLoading(true);
      getAllRecommendations();
    }
  }, []);

  const handleCarTileClick = (carModel: CarRecommendation, index: number) => {
    setLoanDetails({
      modelId: carModel.id,
    });
    if (modelDetail) {
      setModelDetail([...modelDetail, carModel]);
    } else {
      setModelDetail([carModel]);
    }

    const selectCarResult = {
      index: index + 1,
      carID: carModel.id,
      carName: getModelName(carModel),
      price: `${getModelPriceRange(carModel)} jt`,
      monthlyInstallments: `${getMonthlyInstallmentRange(
        carModel.variants,
        currentLanguage
      )} jt`,
      downPayment: `${getDpRange(carModel.variants, currentLanguage)} jt`,
      ...carResultParameters,
    };
    trackSelectCarResult(selectCarResult);
    getCarModelDetailsById(carModel.id)
      .then(handleCarModelDetailsUpdate(recommendations, setCarModelDetails))
      .then(() => {
        history.push(variantListUrl.replace(":id", carModel.id));
      })
      .catch((error) => {
        console.log(error);
        showToast();
      });
  };

  const onClearSearchInput = () => {
    setSearchInputValue("");
  };
  const trackSearch = () => {
    if (canLog) {
      searchInputValue &&
        trackSearchCarResults({
          search: searchInputValue,
          ...carResultParameters,
        });
      setCanLog(false);
      const timer = setTimeout(() => {
        setCanLog(true);
      }, searchEventDelay);
      setSearchEventTimer(timer);
    }
  };
  const onSearchInputChange = (searchInputValue: string) => {
    setSearchInputValue(searchInputValue);
    trackSearch();
  };
  const handleOnFocus = () => {
    const timer = setTimeout(() => {
      setCanLog(true);
    }, searchEventDelay);
    setSearchEventTimer(timer);
  };
  const handleOnBlur = () => {
    searchInputValue &&
      trackSearchCarResults({
        search: searchInputValue,
        ...carResultParameters,
      });
    if (searchEventTimer) {
      clearTimeout(searchEventTimer);
    }
  };
  useEffect(() => {
    return () => {
      if (searchEventTimer) {
        clearTimeout(searchEventTimer);
      }
    };
  }, []);

  const onBrowseAllCar = () => {
    onClearSearchInput();
    getAllRecommendations();
  };

  const renderSurveyTile = () => {
    if (recommendationLists.length <= 3 && recommendationLists.length > 0) {
      return <TakeSurveyTile />;
    }
  };

  return (
    <StyledCarResultsPage>
      <PageHeader />
      <StyledHeader>
        <StyledTitle
          dangerouslySetInnerHTML={{
            __html: t("carResultsPage.title"),
          }}
        />
        <StyledFilter>
          <StyledInput>
            <SearchInput
              onFocus={handleOnFocus}
              onSearchInputChange={onSearchInputChange}
              searchInputValue={searchInputValue}
              placeholder={t("carResultsPage.placeholder")}
              onBlur={handleOnBlur}
            />
          </StyledInput>
          <FilterCarResults onSubmitClick={onClearSearchInput} />
        </StyledFilter>
      </StyledHeader>
      <StyledContent>
        <StyledMessage>{t("carResultsPage.message")}</StyledMessage>
        {recommendationLists.length !== 0 ? (
          recommendationLists.map((car, index) => {
            if (index === 3) {
              return (
                <div>
                  <TakeSurveyTile />
                  <StyledCarModelTile
                    key={car.id}
                    carModel={car}
                    onModelClick={() => handleCarTileClick(car, index)}
                  />
                </div>
              );
            }
            return (
              <StyledCarModelTile
                key={car.id}
                carModel={car}
                onModelClick={() => handleCarTileClick(car, index)}
              />
            );
          })
        ) : (
          <StyledNotFound>
            <LinkLabelMediumSemiBold>
              {t("carResultsPage.notFound")}
            </LinkLabelMediumSemiBold>
            <StyledNotFoundDesc>
              {t("carResultsPage.notFoundDesc")}
            </StyledNotFoundDesc>
          </StyledNotFound>
        )}
        {renderSurveyTile()}
        {recommendationLists.length !== 0 && <ContactUsTile />}
      </StyledContent>
      {recommendationLists.length === 0 && (
        <Footer background={"transparent"}>
          <Button
            width="100%"
            buttonType={ButtonType.primary1}
            onClick={onBrowseAllCar}
          >
            {t("carResultsPage.notFoundButton")}
          </Button>
        </Footer>
      )}

      <Loading isShowLoading={isShowLoading} progress={progress} />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledCarResultsPage>
  );
}

const StyledCarResultsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.offWhite};
  padding-bottom: 120px;
`;

const StyledHeader = styled.div`
  background: ${colors.inputBg};
  padding: 20px 16px 32px;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
`;

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  align-items: center;
`;
const StyledInput = styled.div`
  width: 100%;
  margin-right: 16px;
  border-radius: 16px;
  color: ${colors.title};
  background: ${colors.white};
  :focus {
    border-color: ${colors.primary1};
  }
`;
const StyledContent = styled.div`
  padding: 0 16px;
`;
const StyledCarModelTile = styled(CarModelTile)`
  margin-bottom: 16px;
`;

const StyledMessage = styled(LinkLabelLegalSemiBold)`
  display: block;
  margin: 16px 0;
  color: ${colors.label};
`;

const StyledNotFound = styled.div`
  color: ${colors.title};
  text-align: center;
  margin: 56px 40px 0;
`;
const StyledNotFoundDesc = styled(TextSmallRegular)`
  margin-top: 10px;
  display: block;
  color: ${colors.placeholder};
`;

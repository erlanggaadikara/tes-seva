import React, { useEffect, useState } from "react";
import {
  CarRecommendation,
  CarRecommendationResponse,
  CarVariantLoan,
  CarResultIndexPage,
} from "types/types";
import { itemLimit } from "const/const";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "styles/colors";
import { CarModelTile } from "./CarModelTile/CarModelTile";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { Loading } from "pages/component/loading/Loading";
import { handleProgressUpdate } from "pages/component/loading/loadingUtils";
import { SearchInput } from "components/SearchInput/SearchInput";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
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
import { LocalStorageKey, LocationStateKey, QueryKeys } from "models/models";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import {
  getDpRange,
  getModelName,
  getModelPriceRange,
  getMonthlyInstallmentRange,
} from "utils/carModelUtils/carModelUtils";
import { PageHeaderSeva } from "pages/component/PageHeaderSeva/PageHeaderSeva";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { ContactUsTile } from "./ContactUsTile/ContactUsTile";
import { FreeInstallment } from "./FreeInstallment/FreeInstallment";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { MaxWidthStyle } from "styles/MaxWidthStyle";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { Pagination } from "./Pagination/Pagination";
import { FilterSideMenu } from "pages/component/Filter/FilterSideMenu/FilterSideMenu";
import { FilterButton } from "pages/component/Filter/FilterButton/FilterButton";
import { FooterSeva } from "pages/component/FooterSeva/FooterSeva";
import { SortByDropdown } from "./SortByDropdown/SortByDropdown";

export default function CarResultsPage() {
  const { t } = useTranslation();
  const { currentLanguage } = useCurrentLanguageFromContext();
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
  const [indexPage, setIndexPage] = useState<CarResultIndexPage>();
  const { setCarModelDetails } = useContextCarModelDetails();

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

  const handleCarTileClick = (carModel: CarRecommendation, index: number) => {
    setLoanDetails({
      modelId: carModel.id,
    });
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
    };
    localStorage.setItem("carDetail", selectCarResult.price);
    getCarModelDetailsById(carModel.id)
      .then(handleCarModelDetailsUpdate(recommendations, setCarModelDetails))
      .then(() => {
        // history.push(newFunnelVariantDetailsUrl.replace(":id", carModel.id));
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
    if (searchEventTimer) {
      clearTimeout(searchEventTimer);
    }
  };

  const changePage = (page: number) => {
    const startIndex = page * itemLimit - itemLimit;
    const endIndex = startIndex + itemLimit;
    setIndexPage({ startIndex, endIndex });
  };

  useEffect(() => {
    const forFilterRecommendations = recommendations.map((item) => {
      item.brandAndModel = `${item.brand} ${item.model}`;
      item.modelAndBrand = `${item.model} ${item.brand}`;
      return item;
    });
    console.log(forFilterRecommendations);
    const filterRecommendations = searchInputValue
      ? fuzzySearch(searchInputValue, forFilterRecommendations, [
          "model",
          "brand",
        ])
      : recommendations;
    console.log(filterRecommendations);
    setRecommendationLists(filterRecommendations);
  }, [searchInputValue]);

  useEffect(() => {
    setRecommendationLists(recommendations);
    setShowLoading(false);
  }, [recommendations]);

  useEffect(() => {
    return () => {
      if (searchEventTimer) {
        clearTimeout(searchEventTimer);
      }
    };
  }, []);

  const SearchBar = () => (
    <SearchInput
      onFocus={handleOnFocus}
      onSearchInputChange={onSearchInputChange}
      searchInputValue={searchInputValue}
      placeholder={t("carResultsPage.placeholder")}
      onBlur={handleOnBlur}
    />
  );

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
    setShowLoading(false);
  }, [recommendations]);

  useEffect(() => {
    return () => {
      if (searchEventTimer) {
        clearTimeout(searchEventTimer);
      }
    };
  }, []);

  const WebHeader = () => {
    return (
      <StyledWebHeader>
        <StyledFilter>
          <StyledTitle
            dangerouslySetInnerHTML={{
              __html: t("carResultPageSeva.totalResult", {
                total: recommendationLists.length,
              }),
            }}
          />
          <StyledSortByWrapper>
            <StyledSubTitle>
              {t("carResultPageSeva.sortBy.title")}
            </StyledSubTitle>
            <SortByDropdown
              onChange={() => {
                setShowLoading(true);
              }}
            />
          </StyledSortByWrapper>
        </StyledFilter>
      </StyledWebHeader>
    );
  };

  const SearchTopBar = () => (
    <StyledInputTopBar>{SearchBar()}</StyledInputTopBar>
  );

  const MobileHeader = () => (
    <StyledMobileHeader>
      <StyledFilter>
        <StyledInput>{SearchBar()}</StyledInput>
        <FilterButton onSubmitClick={onClearSearchInput} />
      </StyledFilter>
    </StyledMobileHeader>
  );

  return (
    <>
      <MaxWidthStyle />
      <StyledCarResultsPage>
        <PageHeaderSeva>{SearchTopBar()}</PageHeaderSeva>
        <StyledBody>
          <FilterSideMenuWrapper>
            <FilterSideMenu />
          </FilterSideMenuWrapper>
          <StyledContent>
            <StyledHeader>
              {MobileHeader()}
              {WebHeader()}
            </StyledHeader>
            <StyledMobileHeader>
              <StyledTotalCars>
                <StyledTitle
                  dangerouslySetInnerHTML={{
                    __html: t("carResultPageSeva.totalResult", {
                      total: recommendationLists.length,
                    }),
                  }}
                />
              </StyledTotalCars>
            </StyledMobileHeader>
            <StyledGrid>
              {recommendationLists.length !== 0 ? (
                recommendationLists
                  .slice(indexPage?.startIndex, indexPage?.endIndex)
                  .map((car, index) => {
                    if (index === 3) {
                      return (
                        <>
                          <StyledCarModelTile
                            key={car.id}
                            carModel={car}
                            onModelClick={() => handleCarTileClick(car, index)}
                          />
                          <StyledStretchColumn key={index + car.id}>
                            <FreeInstallment />
                          </StyledStretchColumn>
                        </>
                      );
                    } else if (index === 7) {
                      return (
                        <>
                          <StyledCarModelTile
                            key={car.id}
                            carModel={car}
                            onModelClick={() => handleCarTileClick(car, index)}
                          />
                          <StyledStretchColumn key={index + car.id}>
                            <ContactUsTile />
                          </StyledStretchColumn>
                        </>
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
            </StyledGrid>
            <Pagination
              length={recommendationLists.length}
              onChangePage={changePage}
              searchRender={searchInputValue}
            />
          </StyledContent>
        </StyledBody>
        <Loading isShowLoading={isShowLoading} progress={progress} />
        <RenderToast
          type={ToastType.Error}
          message={t("common.errorMessage")}
        />
      </StyledCarResultsPage>
      <FooterSeva />
    </>
  );
}

const StyledCarResultsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.offWhite};
  padding-bottom: 120px;
`;

const StyledHeader = styled.div`
  padding: 0;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterSideMenuWrapper = styled.div`
  margin-top: 30px;
  margin-left: 30px;

  @media (max-width: 428px) {
    display: none;
  }
`;

const StyledMobileHeader = styled.div`
  @media (min-width: 428px) {
    display: none;
  }
`;

const StyledWebHeader = styled.div`
  padding: 20px 0px 32px;
  @media (max-width: 425px) {
    display: none;
  }
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
`;

const StyledSubTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
`;

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  align-items: center;
`;

const StyledTotalCars = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  margin: 5px 0;
`;

const StyledInput = styled.div`
  width: 100%;
  margin-right: 16px;
  border-radius: 16px;
`;

const StyledInputTopBar = styled.div`
  width: 40%;
  margin-right: 16px;
  border-radius: 16px;
  @media (max-width: 427px) {
    display: none;
  }
`;

const StyledContent = styled.div`
  padding: 0 16px;
  width: 70%;
  @media (max-width: 425px) {
    width: 100%;
  }
`;
const StyledCarModelTile = styled(CarModelTile)`
  margin-bottom: 16px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const StyledStretchColumn = styled.div`
  @media (min-width: 769px) {
    grid-column: 3 / 1;
  }
`;

const StyledSortByWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

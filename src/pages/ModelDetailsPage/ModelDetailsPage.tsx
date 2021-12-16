import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { CarVariantLoan, CarVariantRecommendation } from "types/types";
import {
  CarTileSize,
  LoanRank,
  LocalStorageKey,
  QueryKeys,
} from "models/models";
import {
  getCarModelDetailsById,
  getCarRecommendations,
  getCarVariantDetailsById,
  getLoanPermutation,
  handleCarRecommendationsError,
  handleCarVariantDetailsUpdate,
  handleRecommendationsAndCarModelDetailsUpdate,
} from "services/recommendations";
import { AxiosResponse } from "axios";
import { CarVariantTile } from "./CarVariantTile/CarVariantTile";
import { H2MediumMedium } from "components/typography/H2MediumMedium";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import {
  loanCalculatorUrl,
  modelDetailsUrl,
  recommendationsUrl,
  scheduleAppointmentUrl,
  variantDetailsUrl,
} from "routes/routes";
import { ImageCarousel } from "components/ImageSwipe/ImageCarousel";
import { FloatingBackButton } from "components/FloatingBackButton/FloatingBackButton";
import { ToastType, useToast } from "components/Toast/Toast";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import { useTranslation } from "react-i18next";
import { isMobileDevice } from "utils/window";
import { maxPageWidth } from "styles/GlobalStyle";
import {
  LoanPermutationResponse,
  useLoanPermutationResponse,
} from "context/loanPermutationContext/loanPermutationContext";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { Loading } from "component/loading/Loading";
import { trackViewCarVariant } from "helpers/trackingEvents";
import { Button, ButtonType } from "components/Button/Button";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { Footer } from "components/Footer/Footer";
import { handleProgressUpdate } from "component/loading/loadingUtils";

interface Params {
  id: string;
}

export default function ModelDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("loadingPage.title");
  const history = useHistory();
  const { carModelDetails, setCarModelDetails } = useContextCarModelDetails();
  const { showToast, RenderToast } = useToast();
  const { setCarVariantDetails } = useContextCarVariantDetails();
  const carouseSizeRatio = 1.4;
  const initCarouseHeight = isMobileDevice
    ? 245
    : parseInt(maxPageWidth) / carouseSizeRatio;
  const [carouseHeight, setCarouseHeight] = useState<number>(initCarouseHeight);
  const { setLoanPermutationResponse } = useLoanPermutationResponse();
  const { recommendations, setRecommendations } = useContextRecommendations();
  const [, setLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );
  useEffect(() => {
    if (!carModelDetails) {
      setShowLoading(true);
      Promise.all([
        getCarRecommendations({
          onDownloadProgress: handleProgressUpdate(setProgress),
        }),
        getCarModelDetailsById(id),
      ])
        .then(
          handleRecommendationsAndCarModelDetailsUpdate(
            setRecommendations,
            setCarModelDetails
          )
        )
        .then(resetLoadingState)
        .catch((e) => {
          resetLoadingState();
          handleCarRecommendationsError(e, history, showToast);
        });
    }
  }, []);

  const getCarouseHeight = () => {
    const screenWidth = document.body.clientWidth;
    setCarouseHeight(
      (screenWidth - parseInt(pagePadding) * 2) / carouseSizeRatio
    );
  };

  useLayoutEffect(() => {
    getCarouseHeight();
  }, [carModelDetails]);

  const greenOptions =
    carModelDetails?.variants?.filter(
      (car: CarVariantRecommendation) => car.loanRank === LoanRank.Green
    ) || [];
  const hasGreenOptions = greenOptions?.length > 0;
  const nonGreenOptions =
    carModelDetails?.variants?.filter(
      (car: CarVariantRecommendation) => car.loanRank !== LoanRank.Green
    ) || [];
  const greenSectionVariants = hasGreenOptions ? greenOptions : nonGreenOptions;

  const goToVariantDetailsPage = (variant: CarVariantRecommendation) => {
    const { id: variantId } = variant;
    trackViewCarVariant(variant);
    const pathname = variantDetailsUrl.replace(":id", variantId);
    history.push({
      pathname: pathname,
    });
  };

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  const goToLoanCalculatorPage = (
    id: string,
    dpAmount: number,
    tenure: number,
    loanRank: string,
    variantId: string
  ) => {
    setShowLoading(true);
    setLoadingTitle("loanCalculatorPage.loadingPage.title");
    getLoanPermutation(variantId, dpAmount, tenure, {
      onDownloadProgress: handleProgressUpdate(setProgress),
    })
      .then((response: AxiosResponse<LoanPermutationResponse>) => {
        setLoanPermutationResponse(response.data);
        const queries = generateQuery({
          [QueryKeys.ModelId]: id,
          [QueryKeys.LoanRank]: loanRank,
          [QueryKeys.VariantId]: variantId,
          [QueryKeys.DpAmount]: dpAmount,
          [QueryKeys.Tenure]: tenure,
        });
        history.push({
          pathname: loanCalculatorUrl,
          search: queries,
        });
        resetLoadingState();
      })
      .catch(() => {
        resetLoadingState();
        showToast();
      });
  };

  const handleCarTileClick = (variant: CarVariantRecommendation) => {
    const { id: variantId, loanRank, dpAmount, tenure } = variant;
    getCarVariantDetailsById(variantId)
      .then(
        handleCarVariantDetailsUpdate(recommendations, setCarVariantDetails)
      )
      .then(() => {
        if (loanRank === LoanRank.Green) {
          goToVariantDetailsPage(variant);
        } else {
          goToLoanCalculatorPage(id, dpAmount, tenure, loanRank, variantId);
        }
      })
      .catch(() => {
        showToast();
      });
  };

  const goToScheduleAppointment = () => {
    setLoanDetails({
      modelId: id,
      loanRank:
        greenSectionVariants.length > 0
          ? greenSectionVariants[0].loanRank
          : undefined,
    });
    history.push({
      pathname: scheduleAppointmentUrl,
      state: {
        from: modelDetailsUrl.replace(":id", id),
      },
    });
  };

  return (
    <>
      {carModelDetails ? (
        <StyledModelDetailsPage>
          <StyledHeader>
            <FloatingBackButton
              onClick={() => history.push(recommendationsUrl)}
            />
            <StyledH2MediumMedium>
              {carModelDetails?.brand}
            </StyledH2MediumMedium>
            <StyledH2MediumBold>{carModelDetails?.model}</StyledH2MediumBold>
          </StyledHeader>
          <StyledImageContainer>
            <ImageCarousel
              urls={carModelDetails?.images}
              height={carouseHeight}
              padding={"0 16px 0 16px"}
            />
          </StyledImageContainer>

          <StyledEasierChanceSection>
            {greenSectionVariants?.map((variant) => (
              <CarVariantTile
                key={variant.id}
                variant={variant}
                onClick={() => handleCarTileClick(variant)}
              />
            ))}
          </StyledEasierChanceSection>

          {hasGreenOptions && nonGreenOptions?.length > 0 && (
            <StyledHarderChanceSection>
              {nonGreenOptions?.map((variant) => (
                <StyledVariantTileWrapper key={variant.id}>
                  <CarVariantTile
                    variant={variant}
                    size={CarTileSize.Small}
                    onClick={() => handleCarTileClick(variant)}
                  />
                </StyledVariantTileWrapper>
              ))}
            </StyledHarderChanceSection>
          )}

          <Footer>
            <Button
              width="90%"
              buttonType={ButtonType.primary1}
              onClick={goToScheduleAppointment}
            >
              {t("scheduleAppointmentPage.form.submit")}
            </Button>
          </Footer>
        </StyledModelDetailsPage>
      ) : (
        <></>
      )}
      <RenderToast
        type={ToastType.Error}
        message={t("common.recommendationErrorMessage")}
      />
      <Loading
        isShowLoading={isShowLoading}
        progress={progress}
        message={loadingTitle}
      />
    </>
  );
}

const pagePadding = "16px";
const headHeight = 170;

const StyledModelDetailsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.carBg};
  padding-bottom: 80px;
`;

const StyledHeader = styled.div`
  width: 100%;
  height: ${headHeight};
  padding-top: 34px;
  background: ${colors.white};
  z-index: 1;
`;
const StyledImageContainer = styled.div`
  width: 100%;
  background: ${colors.white};
`;

const StyledEasierChanceSection = styled.section`
  width: 100%;
  padding: 24px ${pagePadding};
  margin-top: 14px;
`;

const StyledHarderChanceSection = styled.section`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 ${pagePadding};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledVariantTileWrapper = styled.div`
  flex: 0 0 auto;
  margin-right: 24px;

  :last-child {
    padding-right: ${pagePadding};
  }
`;

const StyledPadding = css`
  padding-left: ${pagePadding};
  padding-right: ${pagePadding};
`;

const StyledH2MediumBold = styled(H2MediumBold)`
  ${StyledPadding};
  padding-top: 8px;
  padding-bottom: 26px;
  color: ${colors.title};
`;

const StyledH2MediumMedium = styled(H2MediumMedium)`
  ${StyledPadding};
  margin-top: 30px;
  color: ${colors.label};
`;

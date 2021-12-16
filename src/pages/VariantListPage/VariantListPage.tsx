import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { CarVariantRecommendation, SimpleCarVariantDetail } from "types/types";
import {
  getCarModelDetailsById,
  getCarVariantDetailsById,
  handleCarVariantDetailsUpdate,
  handleRecommendationsAndCarModelDetailsUpdate,
} from "services/recommendations";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import {
  carResultsUrl,
  homeSearchUrl,
  loginUrl,
  newFunnelVariantDetailsUrl,
  preApprovalStartUrl,
} from "routes/routes";
import { ImageCarousel } from "components/ImageSwipe/ImageCarousel";
import { ToastType, useToast } from "components/Toast/Toast";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import { useTranslation } from "react-i18next";
import { isMobileDevice } from "utils/window";
import { maxPageWidth } from "styles/GlobalStyle";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { Loading } from "component/loading/Loading";
import { CarVariantItem } from "./CarVariantItem/CarVariantItem";
import {
  getNewFunnelAllRecommendations,
  getPopularCars,
} from "services/newFunnel";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import {
  getModelName,
  getVariantsPriceRange,
} from "utils/carModelUtils/carModelUtils";
import { usePreApprovalIntroModal } from "component/PreApprovalIntroModal/usePreApprovalIntroModal";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LocalStorageKey, LocationStateKey } from "models/models";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackSelectCarResultDetailsThumbnail,
  trackSelectCarResultVariant,
  trackSelectCarResultVariantDetailsGetPreapproval,
  trackSelectCarResultVariantDetailsGetPreapprovalStart,
  trackSelectCarResultVariantDetailsGetPreapprovalCancel,
  trackSelectCarResultDetailsCoupon,
} from "helpers/amplitude/newFunnelEventTracking";
import { useContextPopularCars } from "context/popularCarsContext/popularCarsContext";
import { useHistory } from "react-router";
import { ContactUsFloatingComponent } from "components/ContactUsModal/ContactUsModal";
import { getToken } from "utils/api";
import { isPreApproved } from "preApprovalUitls";
import { FloatingBackButton } from "components/FloatingBackButton/FloatingBackButton";
import { PageHeader, PageHeaderHeight } from "component/PageHeader/PageHeader";
import { Line } from "components/Line/Line";
import { trackViewAccountCreation } from "helpers/amplitude/preApprovalEventTracking";
import { InstalmentFreeBanner } from "./InstalmentFreeBanner/InstalmentFreeBanner";
import { useInstalmentFreeModal } from "./InstalmentFreeModal/InstalmentFreeModal";
import { ZIndex } from "styles/zIndex";
import { handleProgressUpdate } from "component/loading/loadingUtils";

interface Params {
  id: string;
}

let currentSelectionIndex = -1;

export default function VariantListPage() {
  console.log("Debug", "VariantListPage", "Testing for ChunkLoadError");
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const { InstalmentFreeModal, showModal: showInstalmentFreeModal } =
    useInstalmentFreeModal();
  const [loadingTitle] = useState("loadingPage.title");
  const history = useHistory();
  const location = useLocation<
    { [LocationStateKey.IsFromPopularCar]: boolean } | undefined
  >();
  const isFromPopularCar = location.state?.[LocationStateKey.IsFromPopularCar];
  const { carModelDetails, setCarModelDetails } = useContextCarModelDetails();
  const { showToast, RenderToast } = useToast();
  const { showToast: showToast2, RenderToast: RenderToast2 } = useToast();
  const { showModal: showPreapprovalModal, PreApprovalIntroModal } =
    usePreApprovalIntroModal();
  const { setCarVariantDetails } = useContextCarVariantDetails();
  const [, setSimpleCarVariantDetails] =
    useLocalStorage<SimpleCarVariantDetail | null>(
      LocalStorageKey.SimpleCarVariantDetails,
      null
    );
  const carResultParameter = useCarResultParameter();
  const carouseSizeRatio = 1.4;
  const initCarouseHeight = isMobileDevice
    ? 245
    : parseInt(maxPageWidth) / carouseSizeRatio;
  const loveThisCarSectionRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  const [carouseHeight, setCarouseHeight] = useState<number>(initCarouseHeight);
  const { recommendations, setRecommendations } = useContextRecommendations();
  const { popularCarsRecommendation, setPopularCarsRecommendation } =
    useContextPopularCars();
  const [canApplyPreApproval, setCanApplyPreApproval] = useState(false);

  const onGetPreapprovalButtonClick = (
    variant: CarVariantRecommendation,
    index: number
  ) => {
    currentSelectionIndex = index;
    showPreapprovalModal();
    const params = extractAmplitudeParamFromState(currentSelectionIndex);
    if (params) {
      trackSelectCarResultVariantDetailsGetPreapproval(params);
    }
  };

  const onInstalmentFreeBannerClick = () => {
    showInstalmentFreeModal();
    trackSelectCarResultDetailsCoupon(carResultParameter);
  };

  useEffect(() => {
    isPreApproved()
      .then((isPreApproved) => setCanApplyPreApproval(!isPreApproved))
      .catch(() => setCanApplyPreApproval(true));
  }, []);

  useEffect(() => {
    if (!isFromPopularCar) {
      if (!carModelDetails) {
        setShowLoading(true);
        Promise.all([
          getNewFunnelAllRecommendations({
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
          .catch(() => {
            resetLoadingState();
            showToast();
          });
      }
    }
  }, []);

  useEffect(() => {
    if (isFromPopularCar) {
      if (!carModelDetails) {
        setShowLoading(true);
        Promise.all([
          getPopularCars({
            onDownloadProgress: handleProgressUpdate(setProgress),
          }),
          getCarModelDetailsById(id),
        ])
          .then(
            handleRecommendationsAndCarModelDetailsUpdate(
              setPopularCarsRecommendation,
              setCarModelDetails
            )
          )
          .then(resetLoadingState)
          .catch(() => {
            resetLoadingState();
            showToast();
          });
      }
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
    if (carModelDetails && carModelDetails.variants.length < 1) {
      showToast2();
    }
  }, [carModelDetails]);

  const greenSectionVariants = carModelDetails?.variants;

  const handleGoBack = () => {
    if (isFromPopularCar) {
      history.push(homeSearchUrl);
    } else {
      history.push(carResultsUrl);
    }
  };

  const goToVariantDetailsPage = (
    variant: CarVariantRecommendation,
    index: number
  ) => {
    const { id, name, priceValue, monthlyInstallment, dpAmount, tenure } =
      variant;
    const carVariantParameters = {
      variantID: id,
      variantName: name,
      variantPrice: priceValue,
      variantMonthlyInstallments: monthlyInstallment,
      variantDownPayment: dpAmount,
      variantTenure: tenure,
    };

    const selectCarResultVariant = {
      variantIndex: index + 1,
      ...carResultParameter,
      ...carVariantParameters,
    };

    trackSelectCarResultVariant(selectCarResultVariant);
    const pathname = newFunnelVariantDetailsUrl.replace(":id", id);
    history.push({
      pathname: pathname,
    });
  };

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  const handleCarTileClick = (
    variant: CarVariantRecommendation,
    index: number
  ) => {
    const { id: variantId } = variant;
    getCarVariantDetailsById(variantId)
      .then(
        handleCarVariantDetailsUpdate(
          isFromPopularCar ? popularCarsRecommendation : recommendations,
          setCarVariantDetails
        )
      )
      .then(() => {
        goToVariantDetailsPage(variant, index);
      })
      .catch(() => {
        showToast();
      });
  };

  const extractAmplitudeParamFromState = (index: number) => {
    const variants = carModelDetails?.variants;
    if (variants === undefined || index < 0) {
      return null;
    }
    const variant = variants[index];
    const { id, name, priceValue, monthlyInstallment, dpAmount, tenure } =
      variant;
    const carVariantParameters = {
      variantID: id,
      variantName: name,
      variantPrice: priceValue,
      variantMonthlyInstallments: monthlyInstallment,
      variantDownPayment: dpAmount,
      variantTenure: tenure,
    };
    return {
      ...carResultParameter,
      ...carVariantParameters,
    };
  };

  const onPreApprovalIntroStartButtonClick = () => {
    saveSimpleCarData();
    gotoTargetPage();
    const params = extractAmplitudeParamFromState(currentSelectionIndex);
    if (params) {
      trackSelectCarResultVariantDetailsGetPreapprovalStart(params);
    }
  };

  const onPreApprovalIntroHideButtonClick = () => {
    const params = extractAmplitudeParamFromState(currentSelectionIndex);
    if (params) {
      trackSelectCarResultVariantDetailsGetPreapprovalCancel(params);
    }
  };

  const saveSimpleCarData = () => {
    if (!carModelDetails || !carModelDetails.variants[currentSelectionIndex]) {
      return;
    }
    const variant = carModelDetails.variants[currentSelectionIndex];
    const simpleCarVariantDetails: SimpleCarVariantDetail = {
      modelId: carModelDetails.id,
      variantId: variant.id,
      loanTenure: variant.tenure,
      loanDownPayment: variant.dpAmount,
      loanMonthlyInstallment: variant.monthlyInstallment,
      loanRank: variant.loanRank,
    };
    setSimpleCarVariantDetails(simpleCarVariantDetails);
  };

  const gotoTargetPage = () => {
    if (getToken()) {
      goTopPreApprovalStartPage();
    } else {
      trackViewAccountCreation();
      goToLoginPage();
    }
  };

  const goToLoginPage = () => history.push(loginUrl);

  const goTopPreApprovalStartPage = () =>
    history.push({
      pathname: preApprovalStartUrl,
      state: { [LocationStateKey.IsFromLoginPage]: true },
    });

  const onCarouselIndexChange = (currentIndex: number) => {
    if (carModelDetails) {
      const selectCarResultDetailsThumbnail = {
        imageIndex: currentIndex + 1,
        carID: carModelDetails?.id,
        carName: getModelName(carModelDetails),
        price: `${getVariantsPriceRange(carModelDetails.variants)} jt`,
        ...carResultParameter,
      };
      trackSelectCarResultDetailsThumbnail(selectCarResultDetailsThumbnail);
    }
  };

  return (
    <>
      {carModelDetails ? (
        <StyledModelDetailsPage>
          <PageHeader />
          <Line width={"100%"} height={"1px"} background={colors.line} />
          <StyledHeader>
            <StyledBackButton onClick={handleGoBack} />
            <StyledH2MediumMedium stickMarginTop={stickMarginTop}>
              {carModelDetails?.brand}
            </StyledH2MediumMedium>
            <StyledH2MediumBold>{carModelDetails?.model}</StyledH2MediumBold>
          </StyledHeader>
          <StyledImageContainer>
            <ImageCarousel
              urls={carModelDetails?.images}
              height={carouseHeight}
              padding={"0 16px 0 16px"}
              onIndexChange={onCarouselIndexChange}
            />
            <StyledInstalmentFreeWrapper ref={loveThisCarSectionRef}>
              <InstalmentFreeBanner onClick={onInstalmentFreeBannerClick} />
            </StyledInstalmentFreeWrapper>
          </StyledImageContainer>
          <StyledEasierChanceSection>
            {greenSectionVariants?.map((variant, index) => (
              <CarVariantItem
                key={variant.id}
                variant={variant}
                variantIndex={index}
                onClickToVariantDetailsPage={() =>
                  handleCarTileClick(variant, index)
                }
                onGetPreapprovalButtonClick={() =>
                  onGetPreapprovalButtonClick(variant, index)
                }
                showPreApprovalButton={canApplyPreApproval}
              />
            ))}
          </StyledEasierChanceSection>
        </StyledModelDetailsPage>
      ) : (
        <></>
      )}
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
      <RenderToast2
        type={ToastType.Error}
        message={"Varian ini belum tersedia"}
      />
      <Loading
        isShowLoading={isShowLoading}
        progress={progress}
        message={loadingTitle}
      />
      <PreApprovalIntroModal
        onPositiveButtonClick={onPreApprovalIntroStartButtonClick}
        onModalHideClick={onPreApprovalIntroHideButtonClick}
      />
      <InstalmentFreeModal />
      <ContactUsFloatingComponent title={t("contactUs.haveQuestions")} />
    </>
  );
}

const pagePadding = "16px";
const headHeight = 168;
const stickMarginTop = 37;

const StyledModelDetailsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.carBg};
  padding-bottom: 112px;
`;

const StyledHeader = styled.div`
  position: relative;
  width: 100%;
  height: ${headHeight};
  padding-top: 34px;
  background: ${colors.white};
  z-index: ${ZIndex.Menubar};
`;
const StyledImageContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  background: ${colors.white};
`;

const StyledEasierChanceSection = styled.section`
  width: 100%;
  padding: 24px ${pagePadding};
  margin-top: 14px;
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

const StyledH2MediumMedium = styled(LinkLabelMediumSemiBold)<{
  stickMarginTop: number;
}>`
  ${StyledPadding};
  margin-top: ${({ stickMarginTop }) => stickMarginTop}px;
  color: ${colors.label};
  display: block;
`;

const StyledBackButton = styled(FloatingBackButton)`
  top: calc(8px + ${PageHeaderHeight});
`;
const StyledInstalmentFreeWrapper = styled.div`
  width: 100%;
  padding: 24px 0;
`;

import React, { useEffect, useState } from "react";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import {
  getCarVariantDetailsById,
  handleRecommendationsAndCarVariantDetailsUpdate,
} from "services/recommendations";
import { CarVariantDetails, SimpleCarVariantDetail } from "types/types";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/colors";
import {
  loginUrl,
  newFunnelLoanCalculatorUrl,
  preApprovalStartUrl,
  carResultsUrl,
} from "routes/routes";
import getCurrentEnvironment from "helpers/environments";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { variantDetailsConfig } from "./variantDetails.config";
import { trackViewAccountCreation } from "helpers/amplitude/preApprovalEventTracking";
import {
  LoanRank,
  LocalStorageKey,
  LocationStateKey,
  PageFrom,
  QueryKeys,
} from "models/models";
import { useQuery } from "hooks/useQuery";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { VariantDetailHeader } from "component/VariantDetailHeader/VariantDetailHeader";
import { VariantDetailBody } from "component/VariantDetailBody/VariantDetailBody";
import { Loading } from "component/loading/Loading";
import { getNewFunnelAllRecommendations } from "services/newFunnel";
import { usePreApprovalIntroModal } from "component/PreApprovalIntroModal/usePreApprovalIntroModal";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import {
  trackSelectCarResultVariantDetailsCustomizeLoan,
  trackSelectCarResultVariantDetailsGetPreapproval,
  trackSelectCarResultVariantDetailsCustomizeLoanCancel,
  trackSelectCarResultVariantDetailsCustomizeLoanStartSurvey,
  trackSelectCarResultVariantDetailsGetPreapprovalStart,
  trackSelectCarResultVariantDetailsGetPreapprovalCancel,
  trackViewCarResultVariantDetails,
} from "helpers/amplitude/newFunnelEventTracking";
import { trackViewV2LoanCalculatorSurvey } from "helpers/amplitude/newLoanCalculatorEventTracking";
import {
  useAmplitudePageView,
  useCarResultParameter,
} from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  getCarResultAndVariantParameter,
  trackVariantDetailsEvent,
} from "./variantDetailsUtils/variantDetailsUtils";
import { FloatingBackButton } from "components/FloatingBackButton/FloatingBackButton";
import { getModelName } from "utils/carModelUtils/carModelUtils";
import { trackWhatsappButtonClickFromCarResults } from "helpers/trackingEvents";
import { EventFromType } from "helpers/amplitude/newHomePageEventTracking";
import { NewFunnelVariantBasicInfo } from "component/NewFunnelVariantBasicInfo/NewFunnelVariantBasicInfo";
import { LoveThisCarSection } from "./LoveThisCarSection/LoveThisCarSection";
import { getCustomerAssistantWhatsAppNumber } from "services/lead";
import { getToken } from "utils/api";
import { PageHeader, PageHeaderHeight } from "component/PageHeader/PageHeader";
import { Line } from "components/Line/Line";
import { CarVariantsModal } from "component/CarVariantsModal/CarVariantsModal";
import { ContactUsFloatingComponent } from "components/ContactUsModal/ContactUsModal";
import { convertSlashesInStringToVerticalLines } from "utils/stringUtils";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";

interface Params {
  id: string;
}

export default function NewFunnelVariantDetailsPage() {
  const [shouldMergeQueryData, setShouldMergeQueryData] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [loadingTitle] = useState("loadingPage.title");
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { showModal: showPreApprovalIntroModal, PreApprovalIntroModal } =
    usePreApprovalIntroModal();
  const carResultParameter = useCarResultParameter();
  const {
    dpAmount,
    tenure,
    monthlyInstallment,
    loanRank,
  }: {
    loanRank: LoanRank;
    dpAmount: string;
    monthlyInstallment: string;
    tenure: string;
  } = useQuery([
    QueryKeys.DpAmount,
    QueryKeys.Tenure,
    QueryKeys.MonthlyInstallment,
    QueryKeys.LoanRank,
  ]);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const history = useHistory();
  const location = useLocation<
    | {
        [LocationStateKey.Reevaluated]: boolean;
      }
    | undefined
  >();
  const { showToast, RenderToast } = useToast();
  const { showToast: showToast2, RenderToast: RenderToast2 } = useToast();
  const { showToast: showInfoToast, RenderToast: RenderInfoToast } = useToast();
  const [, setSimpleCarVariantDetails] =
    useLocalStorage<SimpleCarVariantDetail | null>(
      LocalStorageKey.SimpleCarVariantDetails,
      null
    );
  const { carVariantDetails, setCarVariantDetails } =
    useContextCarVariantDetails();
  const { setRecommendations } = useContextRecommendations();

  const formValue = useContextSurveyFormData();
  const { age, totalIncome } = formValue;

  useAmplitudePageView(() => {
    trackViewCarResultVariantDetails(!!loanRank, {
      income: Number(totalIncome?.value),
      age: String(age?.value) ?? "",
      loanRank: loanRank,
      monthlyInstallments: Number(monthlyInstallment),
      downPayment: Number(dpAmount),
      tenure: Number(tenure),
    });
  });

  const mergeQueryData = (response: CarVariantDetails | undefined) => {
    if (response && loanRank != undefined) {
      if (location.state?.[LocationStateKey.Reevaluated]) {
        showInfoToast();
        const state = {
          ...location.state,
          ...{ [LocationStateKey.Reevaluated]: false },
        };
        history.replace({ ...location, state: state });
      }
      setCarVariantDetails({
        ...response,
        loanDetail: {
          loanRank,
          tenure: parseInt(tenure),
          dpAmount: parseInt(dpAmount),
          monthlyInstallment: parseInt(monthlyInstallment),
        },
      });
    }
  };
  const enableNewFunnelLoanCalculator =
    getCurrentEnvironment.featureToggles.enableNewFunnelLoanCalculator;

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  const retrieveRecommendationsAndCarVariantDetails = () => {
    if (!carVariantDetails) {
      setShowLoading(true);
      // await getCarVariantDetailsByIdAndCustomCity(
      //   preApprovalQuestionData.variantId,
      //   selectedCity,
      // )
      //   .then(() => {
      //     resetLoadingState()
      //   })
      //   .catch(() => {
      //     failed = true
      //     resetLoadingState()
      //     return
      //   })

      Promise.all([
        getNewFunnelAllRecommendations({
          onDownloadProgress: handleProgressUpdate(setProgress),
        }),
        getCarVariantDetailsById(id),
      ])
        .then(
          handleRecommendationsAndCarVariantDetailsUpdate(
            setRecommendations,
            setCarVariantDetails
          )
        )
        .then(() => {
          setShouldMergeQueryData(true);
          resetLoadingState();
        })
        .catch(() => {
          resetLoadingState();
          showToast();
        });

      getCarVariantDetailsById(id).then((response) => {
        if (response.data.variantDetail.priceValue == null) {
          showToast2();
          setCarVariantDetails(undefined);
          setTimeout(() => {
            history.push(carResultsUrl);
          }, 3000);
        }
      });
    }
  };

  useEffect(() => {
    if (carVariantDetails) {
      setShouldMergeQueryData(true);
    }
    retrieveRecommendationsAndCarVariantDetails();
  }, []);

  useEffect(() => {
    mergeQueryData(carVariantDetails);
  }, [shouldMergeQueryData]);

  const handleGoBack = () => {
    history.goBack();
  };

  const goToWhatsApp = async () => {
    if (!carVariantDetails) {
      return;
    }
    const {
      variantDetail: { name },
      loanDetail: { dpAmount, monthlyInstallment },
    } = carVariantDetails;
    const modelName = getModelName(carVariantDetails.modelDetail);
    const message = t("newFunnelVariantDetailsPage.whatsappMessage", {
      carName: `${modelName}, ${convertSlashesInStringToVerticalLines(name)}`,
      dp: dpAmount,
      monthly: monthlyInstallment,
    });
    trackWhatsappButtonClickFromCarResults(
      EventFromType.carResultDetails,
      modelName,
      `${dpAmount} jt`,
      `${monthlyInstallment} jt`,
      PageFrom.CarResultVariant,
      name
    );

    setLoadingWhatsApp(true);
    const whatsAppUrl = await getCustomerAssistantWhatsAppNumber();
    setLoadingWhatsApp(false);
    window.open(`${whatsAppUrl}?text=${encodeURI(message)}`, "_blank");
  };

  const onPreApprovalIntroStartButtonClick = () => {
    trackVariantDetailsEvent({
      carVariantDetails,
      carResultParameter,
      trackFunction: trackSelectCarResultVariantDetailsGetPreapprovalStart,
    });
    saveSimpleCarData();
    if (getToken()) {
      history.push(preApprovalStartUrl);
    } else {
      history.push(loginUrl);
      trackViewAccountCreation();
    }
  };

  const onPreApprovalIntroHideButtonClick = () => {
    trackVariantDetailsEvent({
      carVariantDetails,
      carResultParameter,
      trackFunction: trackSelectCarResultVariantDetailsGetPreapprovalCancel,
    });
  };

  const saveSimpleCarData = () => {
    if (!carVariantDetails) {
      return;
    }
    const simpleCarVariantDetails: SimpleCarVariantDetail = {
      modelId: carVariantDetails.modelDetail.id,
      variantId: carVariantDetails.variantDetail.id,
      loanTenure: carVariantDetails.loanDetail.tenure,
      loanDownPayment: carVariantDetails.loanDetail.dpAmount,
      loanMonthlyInstallment: carVariantDetails.loanDetail.monthlyInstallment,
      loanRank: carVariantDetails.loanDetail.loanRank,
    };
    setSimpleCarVariantDetails(simpleCarVariantDetails);
  };

  const handleCustomizedLoanClicked = () => {
    trackVariantDetailsEvent({
      carVariantDetails,
      carResultParameter,
      trackFunction: trackSelectCarResultVariantDetailsCustomizeLoan,
    });
    if (enableNewFunnelLoanCalculator) {
      const variantId = carVariantDetails?.variantDetail.id || "";
      trackViewV2LoanCalculatorSurvey("car_result_variant");
      const pathname = newFunnelLoanCalculatorUrl.replace(":id", variantId);
      history.push({
        pathname: pathname,
      });
    } else {
      setShowModal(true);
    }
  };

  const hideCustomizedLoanModal = () => {
    setShowModal(false);
    trackVariantDetailsEvent({
      carVariantDetails,
      carResultParameter,
      trackFunction: trackSelectCarResultVariantDetailsCustomizeLoanCancel,
    });
  };

  const onClickLoveThisCar = () => {
    showPreApprovalIntroModal();
    trackVariantDetailsEvent({
      carVariantDetails,
      carResultParameter,
      trackFunction: trackSelectCarResultVariantDetailsGetPreapproval,
    });
  };

  const onConfirmLoanModal = () => {
    if (carVariantDetails) {
      const selectCarResultVariant = getCarResultAndVariantParameter({
        carVariantDetails,
        carResultParameter,
      });
      trackSelectCarResultVariantDetailsCustomizeLoanStartSurvey(
        selectCarResultVariant
      );
    }
  };

  return (
    <>
      {carVariantDetails ? (
        <>
          <StyledVariantDetailsPage>
            <PageHeader />
            <Line width={"100%"} height={"1px"} background={colors.line} />
            <StyledBackButton onClick={handleGoBack} />
            <VariantDetailHeader carVariantDetails={carVariantDetails} />
            <NewFunnelVariantBasicInfo {...carVariantDetails} />
            <StyledLoveThisCarContainer>
              <LoveThisCarSection
                onClickApplyNow={onClickLoveThisCar}
                carVariantDetails={carVariantDetails}
                onContactUsClick={goToWhatsApp}
                loading={loadingWhatsApp}
              />
            </StyledLoveThisCarContainer>

            <StyledVariantBodyContainer>
              <VariantDetailBody
                carVariantDetails={carVariantDetails}
                description={variantDetailsConfig.description}
                specifications={variantDetailsConfig.specifications}
                variantSpecifications={
                  variantDetailsConfig.variantSpecifications.items
                }
                brochure={variantDetailsConfig.variantSpecifications.brochure}
                isNewFunnel={true}
                onCustomizeLoanClicked={handleCustomizedLoanClicked}
              />
            </StyledVariantBodyContainer>
          </StyledVariantDetailsPage>
        </>
      ) : (
        <></>
      )}
      <RenderInfoToast
        type={ToastType.Info}
        message={t("variantDetails.reevaluatedMsg")}
      />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
      <RenderToast2
        type={ToastType.Error}
        message={"Varian ini belum tersedia di kotamu"}
      />
      <Loading
        isShowLoading={isShowLoading}
        progress={progress}
        message={loadingTitle}
      />
      {!enableNewFunnelLoanCalculator && (
        <CarVariantsModal
          isShowCarVariantsModal={isShowModal}
          hideCarVariantsModal={hideCustomizedLoanModal}
          type="customize"
          onConfirm={onConfirmLoanModal}
        />
      )}
      <PreApprovalIntroModal
        onPositiveButtonClick={onPreApprovalIntroStartButtonClick}
        onModalHideClick={onPreApprovalIntroHideButtonClick}
      />
      <ContactUsFloatingComponent title={t("contactUs.haveQuestions")} />
    </>
  );
}

const StyledVariantDetailsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.offWhite};
  color: ${colors.title};
  padding-bottom: 16px;
`;
const StyledLoveThisCarContainer = styled.div`
  padding: 0 16px;
  margin-top: 30px;
`;
const StyledVariantBodyContainer = styled.div`
  margin: 20px 0;
`;
const StyledBackButton = styled(FloatingBackButton)`
  top: calc(8px + ${PageHeaderHeight});
`;

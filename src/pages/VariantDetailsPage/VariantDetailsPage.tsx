import React, { useEffect, useState } from "react";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import {
  getCarRecommendations,
  getLoanPermutation,
  handleCarRecommendationsError,
  handleRecommendationsAndCarVariantDetailsUpdate,
  getCarVariantDetailsByIdAndCustomCity,
} from "services/recommendations";
import { AxiosResponse } from "axios";
import { CarVariantDetails, CarVariantLoan, Params } from "types/types";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/colors";
import {
  loanCalculatorUrl,
  modelDetailsUrl,
  scheduleAppointmentUrl,
  variantDetailsUrl,
} from "routes/routes";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import { variantDetailsConfig } from "./variantDetails.config";
import { LoanRank, LocalStorageKey, QueryKeys } from "models/models";
import {
  LoanPermutationResponse,
  useLoanPermutationResponse,
} from "context/loanPermutationContext/loanPermutationContext";
import { useQuery } from "hooks/useQuery";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { VariantDetailHeader } from "component/VariantDetailHeader/VariantDetailHeader";
import { VariantDetailBody } from "component/VariantDetailBody/VariantDetailBody";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { Loading } from "component/loading/Loading";
import { VariantBasicInfo } from "component/VariantBasicInfo/VariantBasicInfo";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { FloatingBackButton } from "components/FloatingBackButton/FloatingBackButton";
import { PageHeaderHeight } from "component/PageHeader/PageHeader";
import { useCurrentCityOtr } from "hooks/useCurrentCityOtr/useCurrentCityOtr";

export default function VariantDetailsPage() {
  const [shouldMergeQueryData, setShouldMergeQueryData] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("loadingPage.title");
  const { t } = useTranslation();
  const { id } = useParams<Params>();
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

  const history = useHistory();
  const location = useLocation<{ reevaluated: boolean } | undefined>();
  const { showToast, RenderToast } = useToast();
  const [, setLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );
  const { showToast: showInfoToast, RenderToast: RenderInfoToast } = useToast();

  const { carVariantDetails, setCarVariantDetails } =
    useContextCarVariantDetails();
  const { setLoanPermutationResponse } = useLoanPermutationResponse();
  const { setRecommendations } = useContextRecommendations();
  const [currentCityOtr] = useCurrentCityOtr();

  const mergeQueryData = (response: CarVariantDetails | undefined) => {
    if (response && loanRank != undefined) {
      if (location.state?.reevaluated) {
        showInfoToast();
        history.replace({ ...location, state: undefined });
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

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  const retrieveRecommendationsAndCarVariantDetails = () => {
    if (!carVariantDetails) {
      setShowLoading(true);
      Promise.all([
        getCarRecommendations({
          onDownloadProgress: handleProgressUpdate(setProgress),
        }),
        getCarVariantDetailsByIdAndCustomCity(id, currentCityOtr),
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
        .catch((e) => {
          resetLoadingState();
          handleCarRecommendationsError(e, history, showToast);
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
    history.push(
      modelDetailsUrl.replace(":id", carVariantDetails?.modelDetail.id || "")
    );
  };

  const goToLoanCalculatorPage = (carVariantDetails: CarVariantDetails) => {
    setShowLoading(true);
    setLoadingTitle("loanCalculatorPage.loadingPage.title");
    getLoanPermutation(
      id,
      carVariantDetails.loanDetail.dpAmount,
      carVariantDetails.loanDetail.tenure,
      {
        onDownloadProgress: handleProgressUpdate(setProgress),
      }
    )
      .then((response: AxiosResponse<LoanPermutationResponse>) => {
        setLoanPermutationResponse(response.data);
        const loanDetails = carVariantDetails.loanDetail;
        const queries = generateQuery({
          [QueryKeys.VariantId]: id,
          [QueryKeys.DpAmount]: loanDetails.dpAmount,
          [QueryKeys.Tenure]: loanDetails.tenure,
          [QueryKeys.LoanRank]: loanDetails.loanRank,
        });
        history.push({
          pathname: loanCalculatorUrl,
          search: queries,
        });
        resetLoadingState();
      })
      .catch(() => {
        showToast();
        resetLoadingState();
      });
  };

  const goToAppointmentPage = () => {
    setLoanDetails({
      id,
      modelId: carVariantDetails?.modelDetail.id,
      loanRank: loanRank || carVariantDetails?.loanDetail.loanRank,
      dpAmount: parseInt(dpAmount) || carVariantDetails?.loanDetail.dpAmount,
      monthlyInstallment:
        parseInt(monthlyInstallment) ||
        carVariantDetails?.loanDetail.monthlyInstallment,
      tenure: parseInt(tenure) || carVariantDetails?.loanDetail.tenure,
    });
    history.push({
      pathname: scheduleAppointmentUrl,
      state: {
        from: variantDetailsUrl.replace(":id", id),
      },
    });
  };

  return (
    <>
      {carVariantDetails ? (
        <>
          <StyledModelDetailsPage>
            <VariantDetailHeader carVariantDetails={carVariantDetails} />
            <StyledBackButton onClick={handleGoBack} />
            <VariantBasicInfo {...carVariantDetails} />
            <StyledVariantBodyContainer>
              <VariantDetailBody
                carVariantDetails={carVariantDetails}
                description={variantDetailsConfig.description}
                specifications={variantDetailsConfig.specifications}
                variantSpecifications={
                  variantDetailsConfig.variantSpecifications.items
                }
                brochure={variantDetailsConfig.variantSpecifications.brochure}
              />
            </StyledVariantBodyContainer>

            <StyledFooter>
              <StyledButtonConfirm
                buttonType={ButtonType.primary1}
                onClick={goToAppointmentPage}
              >
                <LinkLabelSmallSemiBold>
                  {t(variantDetailsConfig.confirmAgent)}
                </LinkLabelSmallSemiBold>
              </StyledButtonConfirm>

              <StyledButtonChange
                buttonType={ButtonType.secondary1}
                onClick={() => {
                  goToLoanCalculatorPage(carVariantDetails);
                }}
              >
                <LinkLabelSmallSemiBold>
                  {t(variantDetailsConfig.loanConfiguration)}
                </LinkLabelSmallSemiBold>
              </StyledButtonChange>
            </StyledFooter>
          </StyledModelDetailsPage>
        </>
      ) : (
        <></>
      )}
      <RenderInfoToast
        type={ToastType.Info}
        message={t("variantDetails.reevaluatedMsg")}
      />
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

const StyledVariantBodyContainer = styled.section`
  margin: 20px 0;
`;
const StyledModelDetailsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.carBg};
  color: ${colors.title};
`;
const StyledFooter = styled.div`
  width: 100%;
  background: ${colors.carBg};
  padding: 0 16px 20px 16px;
`;

const StyledButtonConfirm = styled(Button)`
  width: 100%;
`;
const StyledButtonChange = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const StyledBackButton = styled(FloatingBackButton)`
  top: calc(8px + ${PageHeaderHeight});
`;

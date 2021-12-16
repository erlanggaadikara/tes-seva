import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SurveyFormGender } from "./SurveyFormGender/SurveyFormGender";
import TypeForm from "./TypeForm/TypeForm";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { SurveyFormAge } from "./SurveyFormAge/SurveyFormAge";
import { SurveyFormCashFlow } from "./SurveyFormCashFlow/SurveyFormCashFlow";
import { SurveyFormOccupation } from "./SurveyFormOccupation/SurveyFormOccupation";
import { SurveyFormCity } from "./SurveyFormCity/SurveyFormCity";
import { SurveyFormEducation } from "./SurveyFormEducation/SurveyFormEducation";
import { useTranslation } from "react-i18next";
import { SurveyFormCashFlowAmount } from "./SurveyFormCashFlowAmount/SurveyFormCashFlowAmount";
import { recommendationsUrl } from "routes/routes";
import { getCarRecommendations } from "services/recommendations";
import { SurveyFormDownPayment } from "./SurveyFormDownPayment/SurveyFormDownPayment";
import {
  HTTPResponseStatusCode,
  LocalStorageKey,
  SurveyFormKey,
} from "models/models";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { SurveyFormProperty } from "./SurveyFormProperty/SurveyFormProperty";
import { ToastType, useToast } from "components/Toast/Toast";
import { AxiosResponse } from "axios";
import { CarRecommendationResponse } from "types/types";
import { Loading } from "component/loading/Loading";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { cityList } from "PreApprovalQuestionFlow/QuestionFlowAddress/AddressFormProvince/provinceCityDataProcessor/provinceCityDataProcessor";
import { handleProgressUpdate } from "component/loading/loadingUtils";

const cityFormFieldStep = 4;

export default function SurveyForm() {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentStep, setCurrentStep, removeCurrentStep] =
    useLocalStorage<number>(LocalStorageKey.CurrentStep, 0);
  const surveyFormData = useContextSurveyFormData();
  const patchSurveyFormValue = useContextSurveyFormPatch();

  const [isShowLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setRecommendations } = useContextRecommendations();
  const { showToast, RenderToast } = useToast();

  useEffect(() => {
    if (!currentStep) {
      setCurrentStep(0);
    } else {
      if (
        currentStep > cityFormFieldStep &&
        !cityList.includes(surveyFormData.city?.value as string)
      ) {
        setCurrentStep(cityFormFieldStep);
        patchSurveyFormValue({
          [SurveyFormKey.City]: { value: "", isDataValid: false },
        });
      }
    }
  }, []);

  const handleExitForm = () => {
    removeCurrentStep();
    history.goBack();
  };

  const handleGoNext = () => {
    setCurrentStep((prev: number) => prev + 1);
  };

  const handleGoBack = () => {
    setCurrentStep((prev: number) => prev - 1);
  };

  const handleSubmit = async () => {
    setShowLoading(true);
    getCarRecommendations({
      onDownloadProgress: handleProgressUpdate(setProgress),
    })
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        setTimeout(() => {
          setRecommendations(response.data.carRecommendations || []);
          history.push(recommendationsUrl);
          resetLoadingState();
        }, 400);
      })
      .catch((error) => {
        setTimeout(() => {
          resetLoadingState();
          if (error.response?.status === HTTPResponseStatusCode.BadRequest) {
            setCurrentStep(0);
          } else {
            showToast();
          }
        }, 500);
      });
  };

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  return (
    <>
      <TypeForm
        currentStep={currentStep}
        onExitForm={handleExitForm}
        nextBtnOnClick={handleGoNext}
        backBtnOnClick={handleGoBack}
        onSubmit={handleSubmit}
      >
        <SurveyFormAge key={SurveyFormKey.Age} />
        <SurveyFormGender key={SurveyFormKey.Gender} />
        <SurveyFormOccupation key={SurveyFormKey.Occupation} />
        <SurveyFormEducation key={SurveyFormKey.Education} />
        <SurveyFormCity key={SurveyFormKey.City} />
        <SurveyFormCashFlow key={SurveyFormKey.CashFlow} />
        <SurveyFormCashFlowAmount key={SurveyFormKey.TotalIncome} />
        <SurveyFormDownPayment key={SurveyFormKey.DownPayment} />
        <SurveyFormProperty key={SurveyFormKey.HomeOwnership} />
      </TypeForm>
      <Loading
        progress={progress}
        isShowLoading={isShowLoading}
        message={"surveyForm.loading.message"}
      />
      <RenderToast
        type={ToastType.Error}
        message={t("common.recommendationErrorMessage")}
      />
    </>
  );
}

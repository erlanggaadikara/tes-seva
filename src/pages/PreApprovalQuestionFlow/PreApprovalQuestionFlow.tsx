import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { screenHeight } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { LinkLabelSmallSemiBoldStyle } from "components/typography/LinkLabelSmallSemiBold";
import { SurveyFormOccupation } from "SurveyForm/SurveyFormOccupation/SurveyFormOccupation";
import { Button, ButtonType } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import {
  CityOtrCode,
  LocalStorageKey,
  PreApprovalProgressType,
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
  PreApprovalResultScore,
  SurveyFormKey,
  // QueryKeys,
  // LoanRank,
  LocationStateKey,
} from "models/models";
import { PreApprovalProgress } from "component/PreApprovalProgress/PreApprovalProgress";
import { useHistory, useLocation } from "react-router-dom";
import { QuestionFlowMonthlyIncome } from "./QuestionFlowMonthlyIncome/QuestionFlowMonthlyIncome";
import { QuestionFlowEmail } from "./QuestionFlowEmail/QuestionFlowEmail";
import { QuestionFlowAddress } from "./QuestionFlowAddress/QuestionFlowAddress";
import { ToastType, useToast } from "components/Toast/Toast";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";
import {
  basicCheckFailureUrl,
  preApprovalVerifyKTPUrl,
  newFunnelLoanCalculatorUrl,
} from "routes/routes";
import {
  checkPreApprovalStageOne,
  handlePreApprovalFlowError,
  PreApprovalCheckResult,
  savePreApproval,
} from "services/preApproval";
// import {
//   getCarVariantDetailsByIdAndCustomCity,
//   handleRecommendationsAndCarVariantDetailsUpdate,
// } from 'services/recommendations'
import { AxiosResponse } from "axios";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { SimpleCarVariantDetail } from "types/types";
import { fetchCustomerId } from "utils/httpUtils/customerUtils";
import {
  trackViewPreapprovalQuestionFlow,
  trackSelectPreapprovalOccupationNext,
  trackSelectPreapprovalIncomeNext,
  trackSelectPreapprovalAddressNext,
  trackSelectPreapprovalEmailNext,
  trackViewPreapprovalRejected,
} from "helpers/amplitude/preApprovalEventTracking";
import { DEFAULT_ZIPCODE } from "const/const";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackGAPreApprovalPageView } from "helpers/googleAds";
import { FBPixelStandardEvent } from "helpers/facebookPixel";
import ReactPixel from "react-facebook-pixel";
// import { useContextRecommendations } from 'context/recommendationsContext/recommendationsContext'
// import {
//   getNewFunnelAllRecommendations,
//   getNewFunnelLoanPermutations,
// } from 'services/newFunnel'
// import { useContextCarVariantDetails } from 'context/carVariantDetailsContext/carVariantDetailsContext'
// import { useQuery } from 'hooks/useQuery'
// import { handleProgressUpdate } from 'component/loading/loadingUtils'
import { Loading } from "component/loading/Loading";
// import { useNewLoanPermutation } from 'context/newLoanPermutationContext/newLoanPermutationContext'
import { useCurrentCityOtrFromContext } from "context/currentCityOtrContext/currentCityOtrContext";

export type QuestionFlowSteps =
  | SurveyFormKey.Occupation
  | SurveyFormKey.TotalIncome
  | PreApprovalQuestionsKey.Address
  | PreApprovalQuestionsKey.Email;

export default function PreApprovalQuestionFlow() {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentQuestionKeyIndex, setCurrentQuestionKeyIndex] =
    useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { showToast, RenderToast } = useToast();
  const { RenderToast: RenderToast2 } = useToast();
  const { RenderToast: RenderInfoToast } = useToast();
  const [simpleCarVariantDetails] =
    useLocalStorage<SimpleCarVariantDetail | null>(
      LocalStorageKey.SimpleCarVariantDetails,
      null
    );
  const [progress] = useState(0);
  const [isShowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTitle] = useState("loadingPage.title");
  // const [currentCityOtr, setCurrentCityOtr] = useCurrentCityOtr()
  const { currentCityOtr, setCurrentCityOtr } = useCurrentCityOtrFromContext();

  // const { setRecommendations } = useContextRecommendations()
  // const {
  //   carVariantDetails,
  //   setCarVariantDetails,
  // } = useContextCarVariantDetails()
  // const [shouldMergeQueryData, setShouldMergeQueryData] = useState<boolean>(
  //   false,
  // )
  // const {
  //   dpAmount,
  //   tenure,
  //   monthlyInstallment,
  //   loanRank,
  // }: {
  //   loanRank: LoanRank
  //   dpAmount: string
  //   monthlyInstallment: string
  //   tenure: string
  // } = useQuery([
  //   QueryKeys.DpAmount,
  //   QueryKeys.Tenure,
  //   QueryKeys.MonthlyInstallment,
  //   QueryKeys.LoanRank,
  // ])
  const location = useLocation<
    | {
        [LocationStateKey.Reevaluated]: boolean;
      }
    | undefined
  >();
  let failed = false;
  const message = "Varian ini belum tersedia di kotamu";
  const [sendPreApproval, setSendPreApproval] = useState(false);
  console.log(sendPreApproval);
  // const { selectedNewLoanPermutation } = useNewLoanPermutation()
  const variantId = simpleCarVariantDetails.variantId.toString();

  useAmplitudePageView(() => {
    trackGAPreApprovalPageView();
    ReactPixel.track(FBPixelStandardEvent.PreApprovalView);
  });

  useEffect(() => {
    trackViewPreapprovalQuestionFlow(
      questionFlowComponents[currentQuestionKeyIndex].key
    );
  }, [currentQuestionKeyIndex]);

  const surveyFormData = useContextSurveyFormData();
  const {
    questionFlowForm: {
      [PreApprovalQuestionsAddressKey.City]: { value: city },
      [PreApprovalQuestionsAddressKey.Province]: { value: province },
      [PreApprovalQuestionsAddressKey.ZipCode]: { value: zipCode },
      [PreApprovalQuestionsKey.Email]: { value: email },
    },
  } = useQuestionFlowForm();

  const questionFlowComponents: {
    key: QuestionFlowSteps;
    component: JSX.Element;
  }[] = [
    {
      key: SurveyFormKey.Occupation,
      component: <SurveyFormOccupation handleDisabled={setIsDisabled} />,
    },
    {
      key: SurveyFormKey.TotalIncome,
      component: <QuestionFlowMonthlyIncome handleDisabled={setIsDisabled} />,
    },
    {
      key: PreApprovalQuestionsKey.Address,
      component: <QuestionFlowAddress handleDisabled={setIsDisabled} />,
    },
    {
      key: PreApprovalQuestionsKey.Email,
      component: <QuestionFlowEmail handleDisabled={setIsDisabled} />,
    },
  ];

  // let preApprovalQuestionData = {
  //   ...simpleCarVariantDetails,
  //   occupation: surveyFormData.occupation?.value,
  //   monthlyIncome: Number(surveyFormData.totalIncome?.value),
  //   address: {
  //     province,
  //     city,
  //     zipCode: zipCode?.length > 0 ? zipCode : DEFAULT_ZIPCODE,
  //   },
  //   email,
  // }

  const handleBack = () => {
    currentQuestionKeyIndex === 0
      ? history.goBack()
      : setCurrentQuestionKeyIndex(currentQuestionKeyIndex - 1);
  };

  // const test = () => {
  //   getNewFunnelLoanPermutations(
  //     {
  //       id: variantId,
  //       monthlyIncome: surveyFormData.totalIncome?.value as number,
  //       age: surveyFormData.ageData?.value as string,
  //     },
  //     { onDownloadProgress: handleProgressUpdate(setProgress) },
  //   )
  //     .then((response: AxiosResponse<NewFunnelLoanPermutationsResponse>) => {
  //       onLoanPermutationsBack(response.data.loanPermutations || [])
  //       setIsOpenFullEdit(false)
  //       onEditStateChange && onEditStateChange(EditState.Close)
  //       resetLoadingState()
  //     })
  //     .catch(() => {
  //       onLoanPermutationsBack([])
  //       resetLoadingState()
  //       showToast()
  //     })
  // }

  // const mergeQueryData = (response: CarVariantDetails | undefined) => {
  //   if (response && loanRank != undefined) {
  //     if (location.state?.[LocationStateKey.Reevaluated]) {
  //       showInfoToast()
  //       const state = {
  //         ...location.state,
  //         ...{ [LocationStateKey.Reevaluated]: false },
  //       }
  //       history.replace({ ...location, state: state })
  //     }
  //     setCarVariantDetails({
  //       ...response,
  //       loanDetail: {
  //         loanRank,
  //         tenure: parseInt(tenure),
  //         dpAmount: parseInt(dpAmount),
  //         monthlyInstallment: parseInt(monthlyInstallment),
  //       },
  //     })
  //   }
  // }

  // useEffect(() => {
  //   mergeQueryData(carVariantDetails)
  // }, [shouldMergeQueryData])

  // useEffect(() => {
  //   if (carVariantDetails) {
  //     setShouldMergeQueryData(true)
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('carVariantDetails', carVariantDetails)
  //   console.log(
  //     '!carVariantDetails?.loanDetail',
  //     !carVariantDetails?.loanDetail,
  //   )
  //   if (!carVariantDetails || !carVariantDetails?.loanDetail) {
  //     if (
  //       questionFlowComponents[currentQuestionKeyIndex].key ===
  //       PreApprovalQuestionsKey.Email
  //     ) {
  //       setCurrentQuestionKeyIndex(currentQuestionKeyIndex - 1)
  //       showToast2()
  //       failed = true
  //     }
  //     return
  //   }
  // }, [carVariantDetails])

  // useEffect(() => {
  //   console.log('TRIGGERED')
  //   console.log('preApprovalQuestionData before', preApprovalQuestionData)
  //   console.log(
  //     '!carVariantDetails?.loanDetail',
  //     !carVariantDetails?.loanDetail,
  //   )
  //   if (!carVariantDetails || !carVariantDetails?.loanDetail) {
  //     if (
  //       questionFlowComponents[currentQuestionKeyIndex].key ===
  //       PreApprovalQuestionsKey.Email
  //     ) {
  //       setCurrentQuestionKeyIndex(currentQuestionKeyIndex - 1)
  //       showToast2()
  //       failed = true
  //     }
  //     return
  //   } else {
  //     const simpleCarVariantDetails: SimpleCarVariantDetail = {
  //       modelId: carVariantDetails?.modelDetail.id,
  //       variantId: carVariantDetails?.variantDetail.id,
  //       loanTenure: carVariantDetails?.loanDetail.tenure,
  //       loanDownPayment: carVariantDetails?.loanDetail.dpAmount,
  //       loanMonthlyInstallment:
  //         carVariantDetails?.loanDetail.monthlyInstallment,
  //       loanRank: carVariantDetails?.loanDetail.loanRank,
  //     }

  //     preApprovalQuestionData = {
  //       ...simpleCarVariantDetails,
  //       occupation: surveyFormData.occupation?.value,
  //       monthlyIncome: Number(surveyFormData.totalIncome?.value),
  //       address: {
  //         province,
  //         city,
  //         zipCode: zipCode?.length > 0 ? zipCode : DEFAULT_ZIPCODE,
  //       },
  //       email,
  //     }

  //     const save = async () => {
  //       console.log('preApprovalQuestionData after', preApprovalQuestionData)
  //       try {
  //         setLoading(true)
  //         await savePreApproval(preApprovalQuestionData)
  //         const checkResult: AxiosResponse<PreApprovalCheckResult> = await checkPreApprovalStageOne()
  //         if (checkResult.data.score === PreApprovalResultScore.PASS) {
  //           history.push(preApprovalVerifyKTPUrl)
  //           //Asynchronous method, no need to add 'await'
  //           fetchCustomerId()
  //         } else {
  //           history.replace(basicCheckFailureUrl)
  //           trackViewPreapprovalRejected(
  //             'questions',
  //             checkResult.data.reasonCode,
  //           )
  //         }
  //         setLoading(false)
  //       } catch (e) {
  //         setLoading(false)
  //         handlePreApprovalFlowError('questions', e, history, showToast)
  //       }
  //     }

  //     save()
  //   }
  // }, [sendPreApproval])

  // const resetLoadingState = () => {
  //   setProgress(0)
  //   setShowLoading(false)
  // }

  const handleSubmit = async () => {
    failed = false;
    const preApprovalQuestionData = {
      ...simpleCarVariantDetails,
      occupation: surveyFormData.occupation?.value,
      monthlyIncome: Number(surveyFormData.totalIncome?.value),
      address: {
        province,
        city,
        zipCode: zipCode?.length > 0 ? zipCode : DEFAULT_ZIPCODE,
      },
      email,
    };
    if (
      city !== "" &&
      city?.toString().toLowerCase() != currentCityOtr.toLowerCase()
    ) {
      if (
        currentCityOtr.toLowerCase() === CityOtrCode.jabodetabek &&
        city?.toString().toLowerCase() === CityOtrCode.surabaya
      ) {
        setCurrentCityOtr(CityOtrCode.surabaya);
        // const pathname = newFunnelLoanCalculatorUrl.replace(':id', variantId)
        window.location.href = "/new-funnel-loan-calculator/" + variantId;
        // history.push({
        //   pathname: pathname,
        //   state: {
        //     prevPath: location.pathname,
        //   },
        // })
      } else if (
        currentCityOtr.toLowerCase() === CityOtrCode.surabaya &&
        city?.toString().toLowerCase() !== CityOtrCode.surabaya
      ) {
        setCurrentCityOtr(CityOtrCode.jabodetabek);
        const pathname = newFunnelLoanCalculatorUrl.replace(":id", variantId);
        history.push({
          pathname: pathname,
          state: {
            prevPath: location.pathname,
          },
        });
      }
      // let selectedCity = CityOtrCode.surabaya
      // if (city?.toString().toLowerCase() !== CityOtrCode.surabaya) {
      //   selectedCity = CityOtrCode.jabodetabek
      // }
      // if ()
      // setCurrentCityOtr(selectedCity)
      // const pathname = newFunnelLoanCalculatorUrl.replace(':id', variantId)
      // history.push({
      //   pathname: pathname,
      // })

      // let selectedCity = CityOtrCode.surabaya
      // if (city?.toString().toLowerCase() !== CityOtrCode.surabaya) {
      //   selectedCity = CityOtrCode.jabodetabek
      // }
      // setShowLoading(true)
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

      // Promise.all([
      //   getNewFunnelAllRecommendations(
      //     {
      //       onDownloadProgress: handleProgressUpdate(setProgress),
      //     },
      //     selectedCity,
      //   ),
      //   getCarVariantDetailsByIdAndCustomCity(
      //     preApprovalQuestionData.variantId,
      //     selectedCity,
      //   ),
      // ])
      //   .then(
      //     handleRecommendationsAndCarVariantDetailsUpdate(
      //       setRecommendations,
      //       setCarVariantDetails,
      //     ),
      //   )
      //   .then(() => {
      //     if (carVariantDetails?.loanDetail.dpAmount != undefined) {
      //       failed = true
      //       return
      //     }
      //     setShouldMergeQueryData(true)
      //     resetLoadingState()
      //   })
      //   .catch(() => {
      //     resetLoadingState()
      //     // showToast()
      //   })
    }

    if (failed) {
      return;
    }
    switch (questionFlowComponents[currentQuestionKeyIndex].key) {
      case SurveyFormKey.Occupation:
        trackSelectPreapprovalOccupationNext(
          preApprovalQuestionData.occupation
        );
        break;
      case SurveyFormKey.TotalIncome:
        trackSelectPreapprovalIncomeNext(preApprovalQuestionData.monthlyIncome);
        break;
      case PreApprovalQuestionsKey.Address:
        trackSelectPreapprovalAddressNext({
          ...preApprovalQuestionData.address,
        });
        break;
      case PreApprovalQuestionsKey.Email:
        trackSelectPreapprovalEmailNext();
        break;
      default:
        break;
    }
    if (currentQuestionKeyIndex !== questionFlowComponents.length - 1) {
      setCurrentQuestionKeyIndex(currentQuestionKeyIndex + 1);
    } else {
      if (email !== "") {
        setSendPreApproval(true);
      }
      try {
        setLoading(true);
        await savePreApproval(preApprovalQuestionData);
        const checkResult: AxiosResponse<PreApprovalCheckResult> =
          await checkPreApprovalStageOne();
        if (checkResult.data.score === PreApprovalResultScore.PASS) {
          history.push(preApprovalVerifyKTPUrl);
          //Asynchronous method, no need to add 'await'
          fetchCustomerId();
        } else {
          history.replace(basicCheckFailureUrl);
          trackViewPreapprovalRejected(
            "questions",
            checkResult.data.reasonCode
          );
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        handlePreApprovalFlowError("questions", e, history, showToast);
      }
    }
  };

  return (
    <StyledPage>
      <PreApprovalProgress
        onBackClick={handleBack}
        progressType={PreApprovalProgressType.Questions}
        currentLocation={currentQuestionKeyIndex}
      />
      <StyledContent>
        <StyledStep>
          {currentQuestionKeyIndex + 1}/{questionFlowComponents.length}
        </StyledStep>
        {questionFlowComponents[currentQuestionKeyIndex].component}
      </StyledContent>
      <StyledFooterWrapper>
        <Button
          width="100%"
          buttonType={ButtonType.primary1}
          onClick={handleSubmit}
          disabled={isDisabled}
          loading={loading}
        >
          {t("preApprovalQuestionFlow.submit")}
        </Button>
      </StyledFooterWrapper>
      <RenderInfoToast
        type={ToastType.Info}
        message={t("variantDetails.reevaluatedMsg")}
      />
      <Loading
        isShowLoading={isShowLoading}
        progress={progress}
        message={loadingTitle}
      />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
      <RenderToast2 type={ToastType.Error} message={message} />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  min-height: ${screenHeight}px;
  background: ${colors.offWhite};
  position: relative;
`;

const StyledContent = styled.div`
  padding: 26px 16px 60px;
`;

const StyledStep = styled.div`
  ${LinkLabelSmallSemiBoldStyle};
  color: ${colors.title};
  margin-bottom: 16px;
  font-weight: 600;
`;

const StyledFooterWrapper = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
`;

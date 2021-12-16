import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import {
  CashFlow,
  CashFlowIncomeType,
  HTTPResponseStatusCode,
  LocalStorageKey,
  Property,
  SurveyFormKey,
} from "models/models";
import {
  defaultFormValue,
  FormItem,
} from "hooks/useSurveyFormData/useSurveyFormData";
import {
  CarModelBasicDetailsResponse,
  CarModelDetailsResponse,
  CarRecommendation,
  CarRecommendationResponse,
  CarVariantDetails,
  ErrorResponse,
  ErrorValidationDetail,
  FormControlValue,
  NewFunnelCarVariantDetails,
} from "types/types";
import * as H from "history";
import { saveLocalStorage } from "utils/localstorageUtils";
import { Dispatch, SetStateAction } from "react";
import { getLocalStorage } from "utils/localstorageUtils";

type ControlValue = FormControlValue | boolean;
type FilteredFormItem = { [k in SurveyFormKey]?: ControlValue };

const isFixedIncome = (cashFlowSources: string[] = []): boolean => {
  const cashFlowIncomeType = cashFlowSources.map((cashFlowSource) => {
    switch (cashFlowSource) {
      case CashFlow.Salary:
        return CashFlowIncomeType.Fixed;
      case CashFlow.Earnings:
        return CashFlowIncomeType.Variable;
      case CashFlow.Spouse:
        return undefined;
      case `${CashFlow.Spouse}_${CashFlow.SubMonthlySalary}`:
        return CashFlowIncomeType.Fixed;
      case `${CashFlow.Spouse}_${CashFlow.SubOwnEarnings}`:
        return CashFlowIncomeType.Variable;
      case CashFlow.Parents:
        return undefined;
      case `${CashFlow.Parents}_${CashFlow.SubMonthlySalary}`:
        return CashFlowIncomeType.Fixed;
      case `${CashFlow.Parents}_${CashFlow.SubOwnEarnings}`:
        return CashFlowIncomeType.Variable;
    }
  });
  const filteredCashFlow = cashFlowIncomeType.filter((t) => t);
  const isAllVariableType = filteredCashFlow.every(
    (t) => t === CashFlowIncomeType.Variable
  );
  return !isAllVariableType;
};

const getCurrentCityOtr = () =>
  getLocalStorage<string>(LocalStorageKey.CityOtr);
const city = getCurrentCityOtr();

export const getStoredSurveyFormData = (): FormItem => {
  const dataInLocalstorage = localStorage.getItem(LocalStorageKey.SurveyForm);
  return dataInLocalstorage ? JSON.parse(dataInLocalstorage) : defaultFormValue;
};

export const getAndFilterStoredFormData = () => {
  const formData = getStoredSurveyFormData();
  const filteredFormData: FilteredFormItem = {};
  for (const [key, data] of Object.entries(formData)) {
    let value: ControlValue;
    switch (key) {
      case SurveyFormKey.DownPayment:
        value = parseInt(data?.value as string);
        break;
      case SurveyFormKey.TotalIncome:
        value = parseInt(data?.value as string);
        break;
      case SurveyFormKey.CashFlow:
        value = isFixedIncome(data?.value as string[]);
        break;
      case SurveyFormKey.HomeOwnership:
        value = data?.value === Property.Yes;
        break;
      case SurveyFormKey.Gender:
        value = data?.value?.toString().toUpperCase();
        break;
      default:
        value = data?.value;
        break;
    }
    filteredFormData[key as SurveyFormKey] = value;
  }
  return filteredFormData;
};

export const getCarRecommendations = (config?: AxiosRequestConfig) => {
  const formData = getAndFilterStoredFormData();
  const params = new URLSearchParams();
  city && params.append("city", city as string);
  return API.post(
    endpoints.recommendations,
    {
      monthlyIncome: formData.totalIncome,
      dpAmount: formData.downPayment,
      fixedIncome: formData.cashFlow,
      homeOwnership: formData.homeOwnership,
      age: formData.age,
      gender: formData.gender,
      education: formData.education,
      // seats: formData.seatNumber, // hide for now
    },
    {
      params,
      ...config,
    }
  );
};

export const handleCarRecommendationsError = (
  error: AxiosError<ErrorResponse>,
  history: H.History<unknown>,
  generalErrorHandler: () => void
) => {
  if (error.response?.status === HTTPResponseStatusCode.BadRequest) {
    const details = error.response.data?.details;
    if (details) {
      const errors: ErrorValidationDetail[] =
        details.bodyErrors as ErrorValidationDetail[];
      if (errors[0]?.name === "ValidationError") {
        // go back to survey form first step
        saveLocalStorage(LocalStorageKey.CurrentStep, "0");
        return;
      }
    }
  }
  generalErrorHandler();
};

export const getCarModelDetailsById = (
  id: string,
  config?: AxiosRequestConfig
) => {
  const params = new URLSearchParams();
  city && params.append("city", city as string);
  return API.get(endpoints.modelDetails.replace(":id", id), {
    params,
    ...config,
  });
};

export const getCarVariantDetailsById = (
  id: string,
  config?: AxiosRequestConfig
) => {
  const params = new URLSearchParams();
  city && params.append("city", city as string);
  return API.get(endpoints.variantDetails.replace(":id", id), {
    params,
    ...config,
  });
};

export const getCarVariantDetailsByIdAndCustomCity = (
  id: string,
  customCity: string,
  config?: AxiosRequestConfig
) => {
  const params = new URLSearchParams();
  customCity && params.append("city", customCity as string);
  return API.get(endpoints.variantDetails.replace(":id", id), {
    params,
    ...config,
  });
};

const updateCarModelDetailsWithLoanInfo = (
  recommendations: CarRecommendation[],
  carModelDetails: CarModelBasicDetailsResponse,
  setCarModelDetails: React.Dispatch<
    React.SetStateAction<CarModelDetailsResponse | undefined>
  >
) => {
  carModelDetails &&
    setCarModelDetails(
      mergeModelDetailsWithLoanRecommendations(recommendations, carModelDetails)
    );
};

const updateCarVariantDetailsWithLoanInfo = (
  recommendations: CarRecommendation[],
  carVariantDetails: CarVariantDetails,
  setCarVariantDetails: React.Dispatch<
    React.SetStateAction<CarVariantDetails | undefined>
  >
) => {
  carVariantDetails &&
    setCarVariantDetails(
      mergeVariantDetailsWithLoanRecommendation(
        recommendations,
        carVariantDetails
      )
    );
};

export const handleRecommendationsAndCarModelDetailsUpdate =
  (
    setRecommendations: Dispatch<SetStateAction<CarRecommendation[]>>,
    setCarModelDetails: Dispatch<
      SetStateAction<CarModelDetailsResponse | undefined>
    >
  ) =>
  ([recommendationsResponse, carModelDetailsResponse]: [
    AxiosResponse<CarRecommendationResponse>,
    AxiosResponse<CarModelDetailsResponse>
  ]) => {
    const recommendations =
      recommendationsResponse.data.carRecommendations || [];
    const carModelDetails = carModelDetailsResponse.data;
    setRecommendations(recommendations);
    updateCarModelDetailsWithLoanInfo(
      recommendations,
      carModelDetails,
      setCarModelDetails
    );
  };

export const handleCarModelDetailsUpdate =
  (
    recommendations: CarRecommendation[],
    setCarModelDetails: React.Dispatch<
      React.SetStateAction<CarModelDetailsResponse | undefined>
    >
  ) =>
  (response: AxiosResponse<CarModelBasicDetailsResponse>) => {
    updateCarModelDetailsWithLoanInfo(
      recommendations,
      response.data,
      setCarModelDetails
    );
  };

export const handleCarVariantDetailsUpdate =
  (
    recommendations: CarRecommendation[],
    setCarVariantDetails: React.Dispatch<
      React.SetStateAction<CarVariantDetails | undefined>
    >
  ) =>
  (response: AxiosResponse<CarVariantDetails>) => {
    updateCarVariantDetailsWithLoanInfo(
      recommendations,
      response.data,
      setCarVariantDetails
    );
  };

export const handleRecommendationsAndCarVariantDetailsUpdate =
  (
    setRecommendations: Dispatch<SetStateAction<CarRecommendation[]>>,
    setCarVariantDetails: Dispatch<
      SetStateAction<CarVariantDetails | undefined>
    >
  ) =>
  ([recommendationsResponse, carVariantDetailsResponse]: [
    AxiosResponse<CarRecommendationResponse>,
    AxiosResponse<CarVariantDetails>
  ]) => {
    const recommendations =
      recommendationsResponse.data.carRecommendations || [];
    const carVariantDetails = carVariantDetailsResponse.data;
    setRecommendations(recommendations);
    updateCarVariantDetailsWithLoanInfo(
      recommendations,
      carVariantDetails,
      setCarVariantDetails
    );
  };

export const mergeModelDetailsWithLoanRecommendations = (
  recommendations: CarRecommendation[],
  modelDetails: CarModelBasicDetailsResponse
): CarModelDetailsResponse => {
  const carModelVariantLoans =
    recommendations.find((r) => r.id === modelDetails.id)?.variants || [];
  return {
    ...modelDetails,
    variants: carModelVariantLoans.map((v) => ({
      ...v,
      ...modelDetails.variants.filter((c) => c.id === v.id)[0],
    })),
  };
};

export const mergeVariantDetailsWithLoanRecommendation = (
  recommendations: CarRecommendation[],
  variantDetails: NewFunnelCarVariantDetails
): CarVariantDetails => {
  const { id } = variantDetails.variantDetail;
  const { id: modelId } = variantDetails.modelDetail;
  const carModelVariantLoan = (
    recommendations.find((r) => r.id === modelId)?.variants || []
  ).filter((v) => v.id === id);
  return {
    ...variantDetails,
    loanDetail: carModelVariantLoan[0],
  };
};

export const getLoanPermutation = (
  id: string,
  loanDpAmount: number,
  loanTenure: number,
  config?: AxiosRequestConfig
) => {
  const formData = getAndFilterStoredFormData();
  const params = new URLSearchParams();
  city && params.append("city", city as string);
  return API.post(
    endpoints.loanPermutations.replace(":id", id),
    {
      monthlyIncome: formData.totalIncome,
      loanDpAmount: loanDpAmount,
      loanTenure: loanTenure,
      dpAmount: formData.downPayment,
      fixedIncome: formData.cashFlow,
      homeOwnership: formData.homeOwnership,
      age: formData.age,
      gender: formData.gender,
      education: formData.education,
    },
    {
      params,
      ...config,
    }
  );
};

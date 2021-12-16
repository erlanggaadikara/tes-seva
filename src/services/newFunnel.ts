import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import { FunnelQuery } from "context/funnelQueryContext/funnelQueryContext";
import { AxiosRequestConfig } from "axios";
import { LocalStorageKey, PaymentType, QueryKeys } from "models/models";
import { NewFunnelLoanPermutationsRequest } from "types/types";
import { getLocalStorage } from "utils/localstorageUtils";
import { FormItem } from "context/surveyFormContext/surveyFormContext";

const getSurveyFormData = () =>
  getLocalStorage<FormItem>(LocalStorageKey.SurveyForm);

const getCurrentCityOtr = () =>
  getLocalStorage<string>(LocalStorageKey.CityOtr);
const city = getCurrentCityOtr();

export const getNewFunnelRecommendations = (funnelQuery: FunnelQuery) => {
  const params = new URLSearchParams();
  const {
    downPaymentAmount,
    downPaymentPercentage,
    monthlyInstallment,
    downPaymentType,
    brand,
    bodyType,
    sortBy,
  } = funnelQuery;
  const surveyFormData = getSurveyFormData();
  const totalIncome = surveyFormData?.totalIncome?.value;
  const age = surveyFormData?.age?.value;
  const isDpSelected = downPaymentAmount || downPaymentPercentage;
  const isMonthlySelected = monthlyInstallment;
  if (isDpSelected) {
    params.append("recommendationType", PaymentType.DownPayment);
    params.append("dpType", downPaymentType as string);
    downPaymentAmount &&
      params.append("maxDpAmount", downPaymentAmount as string);
    downPaymentPercentage &&
      params.append("maxDpPercentage", downPaymentPercentage as string);
  }
  if (isMonthlySelected) {
    params.append("recommendationType", PaymentType.MonthlyInstallment);
    params.append("maxMonthlyInstallment", monthlyInstallment as string);
  }
  brand && brand.length > 0 && params.append("brand", brand.join("/"));
  totalIncome && params.append("monthlyIncome", totalIncome as string);
  age && params.append("age", age as string);
  bodyType &&
    bodyType.length > 0 &&
    params.append("bodyType", bodyType.join("/"));
  sortBy && params.append("sortBy", sortBy as string);
  city && params.append("city", city as string);

  return API.get(endpoints.newFunnelRecommendation, { params });
};

export const getNewFunnelRecommendationsByQueries = (
  {
    bodyType,
    brand,
  }: {
    bodyType?: string[];
    brand?: string[];
  },
  config?: AxiosRequestConfig
) => {
  const params = new URLSearchParams();
  const surveyFormData = getSurveyFormData();
  const totalIncome = surveyFormData?.totalIncome?.value;
  const age = surveyFormData?.age?.value;
  bodyType && params.append(QueryKeys.CarBodyType, bodyType.join("/"));
  brand && params.append(QueryKeys.CarBrand, brand.join("/"));
  totalIncome && params.append("monthlyIncome", totalIncome as string);
  age && params.append("age", age as string);
  city && params.append("city", city as string);

  return API.get(endpoints.newFunnelRecommendation, {
    ...config,
    params,
  });
};

export const getNewFunnelAllRecommendations = (
  config?: AxiosRequestConfig,
  customCity?: string
) => {
  const params = new URLSearchParams();
  const surveyFormData = getSurveyFormData();
  const totalIncome = surveyFormData?.totalIncome?.value;
  const age = surveyFormData?.age?.value;
  totalIncome && params.append("monthlyIncome", totalIncome as string);
  age && params.append("age", age as string);
  city && params.append("city", city as string);
  if (customCity) {
    params.set("city", customCity as string);
  }

  return API.get(endpoints.newFunnelRecommendation, {
    ...config,
    params,
  });
};

export const getPopularCars = (config?: AxiosRequestConfig) => {
  const params = new URLSearchParams();
  city && params.append("city", city as string);

  return API.get(endpoints.popularCars, {
    ...config,
    params,
  });
};

export const getNewFunnelLoanPermutations = (
  { id, monthlyIncome, age }: NewFunnelLoanPermutationsRequest,
  config: AxiosRequestConfig
) => {
  const params = new URLSearchParams();
  city && params.append("city", city as string);
  return API.post(
    endpoints.newFunnelLoanPermutations.replace(":id", id),
    {
      monthlyIncome,
      age,
    },
    {
      params,
      ...config,
    }
  );
};

export const getSuggestionsCars = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.variantSuggestions, config);
};

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "utils/api";
import endpoints from "helpers/endpoints";

import { getStoredContactFormData } from "./auth";
import {
  getStoredSurveyFormData,
  getAndFilterStoredFormData,
} from "./recommendations";
import { LocalStorageKey, SessionStorageKey } from "models/models";
import { CarVariantLoan, CustomerInfo } from "types/types";
import { getLocalStorage, saveLocalStorage } from "utils/localstorageUtils";
import { setAmplitudeUserId } from "helpers/amplitude";
import { saveSessionStorage } from "utils/sessionstorageUtils";

export const saveCustomerInfo = (config?: AxiosRequestConfig) => {
  const contactFormData = getStoredContactFormData();
  const surveyFormOriginalData = getStoredSurveyFormData();
  const surveyFormData = getAndFilterStoredFormData();
  const selectedLoan: CarVariantLoan | null = getLocalStorage<CarVariantLoan>(
    LocalStorageKey.SelectedLoan
  );
  const { name, phoneNumber, purchaseTime, contactTime } = contactFormData;
  const {
    age,
    gender,
    occupation,
    education,
    city,
    cashFlow,
    totalIncome,
    downPayment,
    homeOwnership,
    // seatNumber,
  } = surveyFormData;
  return API.post(
    endpoints.createCustomer,
    {
      phoneNumber,
      name,
      age,
      gender,
      occupation,
      education,
      city,
      cashFlow: surveyFormOriginalData.cashFlow?.value,
      fixedIncome: cashFlow,
      monthlyIncome: totalIncome,
      downPayment,
      homeOwnership,
      // seatNumber,
      modelId: selectedLoan?.modelId,
      variantId: selectedLoan?.id,
      loanDownPayment: selectedLoan?.dpAmount,
      loanMonthlyInstallment: selectedLoan?.monthlyInstallment,
      loanRank: selectedLoan?.loanRank,
      loanTenure: selectedLoan?.tenure,
      purchaseTime,
      contactTime,
    },
    config
  );
};

const getCustomerInfo = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.customers, config);
};

export const getCustomerInfoWrapper = (config?: AxiosRequestConfig) => {
  return getCustomerInfo(config).then(
    (response: AxiosResponse<CustomerInfo>) => {
      const customerId = response.data?.id ?? "";
      setAmplitudeUserId(customerId);
      saveLocalStorage(LocalStorageKey.CustomerId, customerId);
      saveSessionStorage(SessionStorageKey.CustomerId, customerId);
      return response;
    }
  );
};

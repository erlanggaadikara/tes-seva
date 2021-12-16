import { AxiosRequestConfig } from "axios";
import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import { LocalStorageKey } from "models/models";

import { defaultContactFormValue } from "hooks/useContactFormData/useContactFormData";

export const getStoredContactFormData = () => {
  const dataInLocalstorage = localStorage.getItem(LocalStorageKey.ContactForm);
  return dataInLocalstorage
    ? JSON.parse(dataInLocalstorage)
    : defaultContactFormValue;
};

export const sendSMS = (
  recaptchaToken: string,
  config?: AxiosRequestConfig
) => {
  const formData = getStoredContactFormData();
  return API.post(
    endpoints.sendSMS,
    {
      phoneNumber: formData.phoneNumber,
      recaptchaToken,
    },
    config
  );
};

export const verifyOTP = (otpCode: string, config?: AxiosRequestConfig) => {
  const formData = getStoredContactFormData();
  return API.post(
    endpoints.verifyOTP,
    {
      code: otpCode,
      phoneNumber: formData.phoneNumber,
    },
    config
  );
};

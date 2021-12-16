import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import { AxiosRequestConfig } from "axios";
import { EkycProgress, EkycStatus, LanguageCode } from "models/models";

export const extractKTPInfo = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.ocr, config);
};

export const startEkyc = (
  language: LanguageCode,
  config?: AxiosRequestConfig
) => {
  return API.get(endpoints.startEkyc, {
    ...config,
    headers: {
      language,
    },
  });
};

export interface EkycStatusResponse {
  status: EkycStatus;
  progress: EkycProgress;
}

export const getEkycStatus = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.ekycStatus, config);
};

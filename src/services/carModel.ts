import { AxiosRequestConfig } from "axios";
import { API } from "utils/api";
import endpoints from "helpers/endpoints";

export const getCarModel = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.carModel, config);
};

export interface GetAccountDetailRequest {
  accessToken: string | null;
  bankId: string | null;
}

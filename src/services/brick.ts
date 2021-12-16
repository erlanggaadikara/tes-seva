import { AxiosRequestConfig } from "axios";
import { API } from "utils/api";
import endpoints from "helpers/endpoints";

export const getBrickPublicToken = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.linkBrick, config);
};

export interface GetAccountDetailRequest {
  accessToken: string | null;
  bankId: string | null;
}

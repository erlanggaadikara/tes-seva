import { AxiosError, AxiosRequestConfig } from "axios";
import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import { ErrorResponse, PreApprovalRequest } from "types/types";
import {
  CustomerPreApprovalStatus,
  HTTPResponseStatusCode,
  LocalStorageKey,
} from "models/models";
import {
  carResultsUrl,
  preApprovalConfirmationUrl,
  preApprovalFailureUrl,
  preApprovalStartUrl,
} from "routes/routes";
import * as H from "history";
import { getCustomerId } from "utils/httpUtils/customerUtils";
import { trackViewPreapprovalRejected } from "helpers/amplitude/preApprovalEventTracking";

export interface PreApprovalNotifyEkycCompletionResult {
  ekycCallbackReceivedAt?: string; // undefined if user still doing eKYC, timestamp when completed or if user exits eKYC
  isCheckFail?: boolean; // error handling: true if unexpected error (server side...), undefined otherwise
}

export interface PreApprovalCheckResult {
  isCheckFail?: boolean;
  score: string;
  reasonCode?: string;
}

export const savePreApproval = (
  preApprovalQuestionData: PreApprovalRequest,
  config?: AxiosRequestConfig
) => {
  return API.post(
    endpoints.preApproval,
    { ...preApprovalQuestionData },
    config
  );
};

export const checkPreApprovalStageOne = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.preApprovalStageOneCheck, config);
};

export const checkPreApprovalStageTwo = (config?: AxiosRequestConfig) => {
  return API.get(endpoints.preApprovalStageTwoCheck, config);
};

export const getPreApprovalResultByCustomId = (
  id: string,
  config?: AxiosRequestConfig
) => {
  return API.get(endpoints.preApprovalResult.replace(":id", id), config);
};

export interface SubmitPreApprovalCalcRequest {
  accessToken: string | null;
  bankId: string | null;
  bankLink: boolean;
  monthlyIncome: number;
}

export const submitPreApprovalCalcRequest = (
  payload: SubmitPreApprovalCalcRequest
) => {
  const { accessToken, bankId, bankLink, monthlyIncome } = payload;
  return API.post(
    endpoints.submitPreApprovalCalcRequest,
    {
      accessToken,
      bankId,
      bankLink,
      monthlyIncome,
    },
    { timeout: 300000 }
  );
};

export const getSelectedSimpleCarVariant = () => {
  const selectedCarVariant = localStorage.getItem(
    LocalStorageKey.SimpleCarVariantDetails
  );
  return selectedCarVariant ? JSON.parse(selectedCarVariant) : null;
};

export type FlowErrorFromType = "questions" | "vida" | "bankLinking" | "final";
export const handlePreApprovalFlowError = async (
  from: FlowErrorFromType,
  error: AxiosError<ErrorResponse>,
  history: H.History<unknown>,
  generalErrorHandler: () => void
) => {
  if (error.response?.status === HTTPResponseStatusCode.Forbidden) {
    const details = error.response.data?.details;
    if (details) {
      const preApprovalStatus: CustomerPreApprovalStatus =
        details?.status as unknown as CustomerPreApprovalStatus;
      switch (preApprovalStatus) {
        case CustomerPreApprovalStatus.Success:
          const id = await getCustomerId();
          id &&
            history.replace(
              preApprovalConfirmationUrl.replace(":customerId", id)
            );
          break;
        case CustomerPreApprovalStatus.Failed:
          history.replace(preApprovalFailureUrl);
          trackViewPreapprovalRejected(from, error.response?.statusText);
          break;
        case CustomerPreApprovalStatus.NotStarted:
        case CustomerPreApprovalStatus.InProgress:
          if (getSelectedSimpleCarVariant()) {
            history.replace(preApprovalStartUrl);
          } else {
            history.replace(carResultsUrl);
          }
          break;
        default:
          generalErrorHandler();
          break;
      }
    }
  } else {
    generalErrorHandler();
  }
};

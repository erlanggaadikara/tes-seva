import { getToken } from "utils/api";
import { CustomerPreApprovalResponse } from "types/types";
import { AxiosResponse } from "axios";
import { getPreApprovalResultByCustomId } from "services/preApproval";
import { CustomerPreApprovalStatus } from "models/models";
import { fetchCustomerId } from "utils/httpUtils/customerUtils";

/**
 * used to disable pre-approval feature when already got pre-approval result or pre-approval is in pending stage
 * @param id customer uuid
 */
export const isPreApproved = async (id?: string): Promise<boolean> => {
  if (getToken() == null) {
    return false;
  }
  try {
    const customerId = id ? id : await fetchCustomerId();
    if (!customerId) {
      return false;
    }
    const status = await getPreApprovalStatus(customerId);
    return (
      status === CustomerPreApprovalStatus.PendingResult ||
      status === CustomerPreApprovalStatus.Success ||
      status === CustomerPreApprovalStatus.Failed
    );
  } catch (e) {
    return false;
  }
};

export const getPreApprovalStatus = async (
  id: string
): Promise<CustomerPreApprovalStatus> => {
  try {
    const preApprovalResult: AxiosResponse<CustomerPreApprovalResponse> =
      await getPreApprovalResultByCustomId(id);
    return (
      preApprovalResult.data?.status ?? CustomerPreApprovalStatus.NotStarted
    );
  } catch (e) {
    return CustomerPreApprovalStatus.NotStarted;
  }
};

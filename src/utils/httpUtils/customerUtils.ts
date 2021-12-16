import { AxiosResponse } from "axios";
import { CustomerInfo } from "types/types";
import { getCustomerInfoWrapper } from "services/customer";
import { LocalStorageKey } from "models/models";
import { getLocalStorage } from "localstorageUtils";

export const fetchCustomerId = async (): Promise<string | null> => {
  try {
    const responseCustomerInfo: AxiosResponse<CustomerInfo> =
      await getCustomerInfoWrapper();
    return responseCustomerInfo.data?.id;
  } catch (e) {
    return null;
  }
};

export const getCustomerId = async () => {
  const customerId = getLocalStorage<string>(LocalStorageKey.CustomerId);
  return customerId ? customerId : await fetchCustomerId();
};

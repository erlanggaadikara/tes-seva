import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import { getStoredContactFormData } from "./auth";
import { AxiosResponse } from "axios";
import urls from "helpers/urls";
import { defaultCSANumber } from "const/const";
import {
  CountryCodePlusSign,
  defaultContactFormValue,
} from "hooks/useContactFormData/useContactFormData";
import { ContactType } from "models/models";

export interface CreateUnverifiedLeadRequest {
  phoneNumber: string;
  maxDp?: number;
  maxMonthlyInstallment?: number;
  name?: string;
  contactType?: ContactType;
}

export const createUnverifiedLead = (
  requestBody: CreateUnverifiedLeadRequest
) => {
  const { phoneNumber, maxDp, maxMonthlyInstallment, name, contactType } =
    requestBody;

  return API.post(endpoints.unverifiedLead, {
    phoneNumber,
    maxDp,
    maxMonthlyInstallment,
    name,
    contactType,
  });
};

interface GetCustomerAssistantResponse {
  crmId: string;
  name: string;
  phoneNumber: string;
}

const getCustomerAssistantDetails = (phoneNumber: string) => {
  return API.post(endpoints.customerAssistantDetails, {
    phoneNumber,
  });
};

export const getCustomerAssistantWhatsAppNumber = async () => {
  let csaWhatsAppNumber = defaultCSANumber;
  try {
    const contactData = getStoredContactFormData();
    const phoneNumber = contactData.phoneNumber;
    if (
      phoneNumber &&
      phoneNumber !== CountryCodePlusSign &&
      phoneNumber !== defaultContactFormValue.phoneNumber
    ) {
      const csaDetails: AxiosResponse<GetCustomerAssistantResponse> =
        await getCustomerAssistantDetails(phoneNumber);
      csaWhatsAppNumber = csaDetails.data.phoneNumber.replace(
        CountryCodePlusSign,
        ""
      );
    }
  } catch (e) {}
  return `${urls.whatsappUrlPrefix}${csaWhatsAppNumber}`;
};

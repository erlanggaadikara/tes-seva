import { generateCityObjectForIndonesia } from "pages/SurveyForm/SurveyFormCity/utils/cityDataProcess/cityDataProcess";
import { CityOptions, ProvinceOptions } from "./cityOptions.en";
import { generateProvinceObjectForIndonesia } from "pages/PreApprovalQuestionFlow/QuestionFlowAddress/AddressFormProvince/provinceCityDataProcessor/provinceCityDataProcessor";

export const cityOptionsIndonesia: Partial<CityOptions> =
  generateCityObjectForIndonesia();

export const provinceOptionsIndonesia: Partial<ProvinceOptions> =
  generateProvinceObjectForIndonesia();

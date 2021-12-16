import { Cities } from "models/cities";
import { generateCityObjectForEnglish } from "pages/SurveyForm/SurveyFormCity/utils/cityDataProcess/cityDataProcess";
import { ProvinceEnum } from "pages/PreApprovalQuestionFlow/QuestionFlowAddress/AddressFormProvince/provinceCityDataProcessor/test/testData.config";

export type CityOptions = { [key in keyof typeof Cities]: string };
export const cityOptionsEnglish: Partial<CityOptions> =
  generateCityObjectForEnglish();

export type ProvinceOptions = { [key in keyof typeof ProvinceEnum]: string };

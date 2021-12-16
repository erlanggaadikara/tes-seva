import { generateSurveyFormCityOptionList } from "SurveyForm/SurveyFormCity/utils/surveyFormCityConfigGenerator/surveyFormCity.config";
import {
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
} from "models/models";

export const surveyFormCityConfig = {
  options: generateSurveyFormCityOptionList(),
  placeholder: `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.City}.placeholder`,
  noOptionText: `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.City}.noOptionText`,
};

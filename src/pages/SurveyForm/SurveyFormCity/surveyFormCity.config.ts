import { generateSurveyFormCityOptionList } from './utils/surveyFormCityConfigGenerator/surveyFormCity.config'

export const surveyFormCityConfig = {
  label: 'surveyForm.fields.city.label',
  options: generateSurveyFormCityOptionList(),
  placeholder: 'surveyForm.fields.city.placeholder',
  noOptionText: 'surveyForm.fields.city.noOptionText',
}

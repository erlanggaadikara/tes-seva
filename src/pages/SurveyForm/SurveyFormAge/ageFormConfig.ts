import { AgeGroup } from 'models/models'

type RadioOptionType = {
  value: string
  label: string
}
interface AgeFormConfig {
  id: string
  label: string
  placeholderLabel: string
  options: RadioOptionType[]
}

export const ageFormConfig: AgeFormConfig = {
  id: 'ageGroup',
  label: 'surveyForm.fields.ageGroup.label',
  placeholderLabel: 'surveyForm.fields.ageGroup.placeholderLabel',
  options: [
    {
      value: AgeGroup.From18to27,
      label: `surveyForm.fields.ageGroup.options.${AgeGroup.From18to27}`,
    },
    {
      value: AgeGroup.From28to34,
      label: `surveyForm.fields.ageGroup.options.${AgeGroup.From28to34}`,
    },
    {
      value: AgeGroup.From35to50,
      label: `surveyForm.fields.ageGroup.options.${AgeGroup.From35to50}`,
    },
    {
      value: AgeGroup.OlderThan50,
      label: `surveyForm.fields.ageGroup.options.${AgeGroup.OlderThan50}`,
    },
  ],
}

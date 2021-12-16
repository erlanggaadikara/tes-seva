import { Education } from 'models/models'
import { CheckboxItemType } from 'components/form/Checkbox/CheckboxItem'

interface OccupationFlowFormConfig {
  id: string
  label: string
  placeholderLabel: string
  options: CheckboxItemType[]
}

export const educationFormConfig: OccupationFlowFormConfig = {
  id: 'education',
  label: 'surveyForm.fields.education.label',
  placeholderLabel: 'surveyForm.fields.education.placeholderLabel',
  options: [
    {
      value: Education.PrimarySchool,
      label: `surveyForm.fields.education.options.${Education.PrimarySchool}`,
      isChecked: false,
    },
    {
      value: Education.SecondarySchool,
      label: `surveyForm.fields.education.options.${Education.SecondarySchool}`,
      isChecked: false,
    },
    {
      value: Education.HighSchool,
      label: `surveyForm.fields.education.options.${Education.HighSchool}`,
      isChecked: false,
    },
    {
      value: Education.BachelorsDegree,
      label: `surveyForm.fields.education.options.${Education.BachelorsDegree}`,
      isChecked: false,
    },
    {
      value: Education.MastersDegree,
      label: `surveyForm.fields.education.options.${Education.MastersDegree}`,
      isChecked: false,
    },
    {
      value: Education.DoctoratesDegree,
      label: `surveyForm.fields.education.options.${Education.DoctoratesDegree}`,
      isChecked: false,
    },
    {
      value: Education.VocationalCertificate,
      label: `surveyForm.fields.education.options.${Education.VocationalCertificate}`,
      isChecked: false,
    },
  ],
}

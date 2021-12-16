import { Occupation } from 'models/models'
import { CheckboxItemType } from 'components/form/Checkbox/CheckboxItem'

interface OccupationFlowFormConfig {
  id: string
  label: string
  placeholderLabel: string
  options: CheckboxItemType[]
}

export const occupationFormConfig: OccupationFlowFormConfig = {
  id: 'occupation',
  label: 'surveyForm.fields.occupation.label',
  placeholderLabel: 'surveyForm.fields.occupation.placeholderLabel',
  options: [
    {
      value: Occupation.DesignerAndArtsProfessional,
      label: `surveyForm.fields.occupation.options.${Occupation.DesignerAndArtsProfessional}`,
      isChecked: false,
    },
    {
      value: Occupation.DoctorAndMedicalWorker,
      label: `surveyForm.fields.occupation.options.${Occupation.DoctorAndMedicalWorker}`,
      isChecked: false,
    },
    {
      value: Occupation.LawProfessional,
      label: `surveyForm.fields.occupation.options.${Occupation.LawProfessional}`,
      isChecked: false,
    },
    {
      value: Occupation.StayAtHomeMother,
      label: `surveyForm.fields.occupation.options.${Occupation.StayAtHomeMother}`,
      isChecked: false,
    },
    {
      value: Occupation.PrivateCompanyEmployee,
      label: `surveyForm.fields.occupation.options.${Occupation.PrivateCompanyEmployee}`,
      isChecked: false,
    },
    {
      value: Occupation.Other,
      label: `surveyForm.fields.occupation.options.${Occupation.Other}`,
      isChecked: false,
    },
    {
      value: Occupation.GovernmentEmployeePNS,
      label: `surveyForm.fields.occupation.options.${Occupation.GovernmentEmployeePNS}`,
      isChecked: false,
    },
    {
      value: Occupation.InformalWorker,
      label: `surveyForm.fields.occupation.options.${Occupation.InformalWorker}`,
      isChecked: false,
    },
    {
      value: Occupation.Student,
      label: `surveyForm.fields.occupation.options.${Occupation.Student}`,
      isChecked: false,
    },
    {
      value: Occupation.TeacherAndProfessorAndResearcher,
      label: `surveyForm.fields.occupation.options.${Occupation.TeacherAndProfessorAndResearcher}`,
      isChecked: false,
    },
    {
      value: Occupation.Retiree,
      label: `surveyForm.fields.occupation.options.${Occupation.Retiree}`,
      isChecked: false,
    },
    {
      value: Occupation.FarmerAndFishermenAndBreeder,
      label: `surveyForm.fields.occupation.options.${Occupation.FarmerAndFishermenAndBreeder}`,
      isChecked: false,
    },
    {
      value: Occupation.PolicemanAndArmyAndSecurity,
      label: `surveyForm.fields.occupation.options.${Occupation.PolicemanAndArmyAndSecurity}`,
      isChecked: false,
    },
    {
      value: Occupation.SelfEmployedAndDistributors,
      label: `surveyForm.fields.occupation.options.${Occupation.SelfEmployedAndDistributors}`,
      isChecked: false,
    },
  ],
}

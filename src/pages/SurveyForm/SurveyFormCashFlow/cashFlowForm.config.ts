import { CashFlow } from 'models/models'
import { CheckboxItemType } from 'components/form/Checkbox/CheckboxItem'

interface CashFlowFormConfig {
  id: string
  label: string
  subtitle: string
  options: CheckboxItemType[]
}

export const cashFlowFormConfig: CashFlowFormConfig = {
  id: 'cashFlow',
  label: 'surveyForm.fields.cashFlow.label',
  subtitle: 'surveyForm.fields.cashFlow.subtitle',
  options: [
    {
      value: CashFlow.Salary,
      label: `surveyForm.fields.cashFlow.options.${CashFlow.Salary}`,
      isChecked: false,
    },
    {
      value: CashFlow.Earnings,
      label: `surveyForm.fields.cashFlow.options.${CashFlow.Earnings}`,
      isChecked: false,
    },
    {
      value: CashFlow.Spouse,
      label: `surveyForm.fields.cashFlow.options.${CashFlow.Spouse}`,
      isChecked: false,
      subOptions: [
        {
          value: CashFlow.Spouse.concat('_', CashFlow.SubMonthlySalary),
          label: `surveyForm.fields.cashFlow.options.${CashFlow.SubMonthlySalary}`,
          isChecked: false,
        },
        {
          value: CashFlow.Spouse.concat('_', CashFlow.SubOwnEarnings),
          label: `surveyForm.fields.cashFlow.options.${CashFlow.SubOwnEarnings}`,
          isChecked: false,
        },
      ],
    },
    {
      value: CashFlow.Parents,
      label: `surveyForm.fields.cashFlow.options.${CashFlow.Parents}`,
      isChecked: false,
      subOptions: [
        {
          value: CashFlow.Parents.concat('_', CashFlow.SubMonthlySalary),
          label: `surveyForm.fields.cashFlow.options.${CashFlow.SubMonthlySalary}`,
          isChecked: false,
        },
        {
          value: CashFlow.Parents.concat('_', CashFlow.SubOwnEarnings),
          label: `surveyForm.fields.cashFlow.options.${CashFlow.SubOwnEarnings}`,
          isChecked: false,
        },
      ],
    },
  ],
}

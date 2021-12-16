import { PurchaseTime } from 'models/models'

type OptionType = {
  value: string
  label: string
}

interface FormConfig {
  id: string
  label: string
  placeholderLabel: string
  options: OptionType[]
}

export const formConfig: FormConfig = {
  id: 'purchaseTime',
  label: 'scheduleAppointmentPage.form.purchaseTime.label',
  placeholderLabel: 'scheduleAppointmentPage.form.purchaseTime.placeholder',
  options: [
    {
      value: PurchaseTime.Within2Weeks,
      label: `scheduleAppointmentPage.form.purchaseTime.options.${PurchaseTime.Within2Weeks}`,
    },
    {
      value: PurchaseTime.Within1Month,
      label: `scheduleAppointmentPage.form.purchaseTime.options.${PurchaseTime.Within1Month}`,
    },
    {
      value: PurchaseTime.Within2Months,
      label: `scheduleAppointmentPage.form.purchaseTime.options.${PurchaseTime.Within2Months}`,
    },
    {
      value: PurchaseTime.InOver2Months,
      label: `scheduleAppointmentPage.form.purchaseTime.options.${PurchaseTime.InOver2Months}`,
    },
  ],
}

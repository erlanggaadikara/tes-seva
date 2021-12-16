import { ContactTime } from 'models/models'

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
  id: 'contactTime',
  label: 'scheduleAppointmentPage.form.contactTime.label',
  placeholderLabel: 'scheduleAppointmentPage.form.contactTime.placeholder',
  options: [
    {
      value: ContactTime.Morning,
      label: `scheduleAppointmentPage.form.contactTime.options.${ContactTime.Morning}`,
    },
    {
      value: ContactTime.Afternoon,
      label: `scheduleAppointmentPage.form.contactTime.options.${ContactTime.Afternoon}`,
    },
    {
      value: ContactTime.Evening,
      label: `scheduleAppointmentPage.form.contactTime.options.${ContactTime.Evening}`,
    },
  ],
}

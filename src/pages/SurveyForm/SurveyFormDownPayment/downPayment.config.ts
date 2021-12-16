interface DownPaymentConfig {
  id: string
  label: string
  subtitle: string
  error: string
  unit: string
}

export const downPaymentConfig: DownPaymentConfig = {
  id: 'downPayment',
  label: 'surveyForm.fields.downPayment.label',
  subtitle: 'surveyForm.fields.downPayment.subtitle',
  error: 'surveyForm.fields.downPayment.error',
  unit: 'surveyForm.fields.downPayment.unit',
}

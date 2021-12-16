import { Environment } from '../../models/models'
export type FeatureToggles = {
  [key in Environment]: FeatureTogglesPair
}
export type FeatureTogglesPair = {
  enableEkycCheck: boolean
  enableNewFunnelLoanCalculator: boolean
}
export const featureToggles: FeatureToggles = {
  [Environment.Localhost]: {
    enableEkycCheck: true,
    enableNewFunnelLoanCalculator: true,
  },
  [Environment.Development]: {
    enableEkycCheck: true,
    enableNewFunnelLoanCalculator: true,
  },
  [Environment.Staging]: {
    enableEkycCheck: true,
    enableNewFunnelLoanCalculator: true,
  },
  [Environment.Production]: {
    enableEkycCheck: true,
    enableNewFunnelLoanCalculator: true,
  },
}

const endpoints = {
  recommendations: '/recommendations',
  modelDetails: '/models/:id',
  variantDetails: '/variants/:id',
  loanPermutations: '/recommendations/variants/:id/loanPermutations',
  newFunnelLoanPermutations:
    '/recommendations/new-funnel/variants/:id/loanPermutations',
  sendSMS: '/auth/otp',
  verifyOTP: '/auth/verification',
  createCustomer: '/customers',
  customers: '/customers/me',
  unverifiedLead: '/unverifiedLeads',
  customerAssistantDetails: '/unverifiedLeads/csaDetails',
  newFunnelRecommendation: '/recommendations/new-funnel',
  startEkyc: '/ekyc/start',
  ocr: '/ekyc/ocr',
  ekycStatus: '/ekyc/status',
  uploadFile: '/customers/me/loan-documents',
  preApproval: '/pre-approval',
  linkBrick: '/brick/authenticate',
  linkBrickRedirect: '/brick/redirect',
  popularCars: '/recommendations/popular-cars',
  submitPreApprovalCalcRequest: '/pre-approval/stage-three',
  preApprovalStageOneCheck: '/pre-approval/stage-one-check',
  preApprovalStageTwoCheck: '/pre-approval/stage-two-check',
  preApprovalResult: '/customer-pre-approval/:id',
  refreshToken: '/auth/token',
  carModel: '/cars?query=',
  variantSuggestions: '/variants?query=',
}

const protectedEndpointsPrefixes = [
  '/customers',
  '/ekyc',
  '/pre-approval',
  '/brick/authenticate',
]

export const shouldCheckAuth = (url: string): boolean =>
  protectedEndpointsPrefixes.some((prefix) => url.startsWith(prefix))

export default endpoints

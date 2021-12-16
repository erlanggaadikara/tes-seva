export enum LanguageCode {
  en = 'en',
  id = 'id',
}

export enum CityOtrCode {
  jabodetabek = 'jabodetabek',
  surabaya = 'surabaya',
}

export enum AgeGroup {
  'From18to27' = '18-27',
  'From28to34' = '28-34',
  'From35to50' = '35-50',
  'OlderThan50' = '>51',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Others = 'Others',
}
export enum IncomeGroup {
  '<2M' = '<2M',
  '2M-4M' = '2M-4M',
  '4M-6M' = '4M-6M',
  '6M-8M' = '6M-8M',
  '8M-10M' = '8M-10M',
  '10M-20M' = '10M-20M',
  '20M-50M' = '20M-50M',
  '50M-75M' = '50M-75M',
  '75M-100M' = '75M-100M',
  '100M-150M' = '100M-150M',
  '150M-200M' = '150M-200M',
  '>200M' = '>200M',
  'Others' = 'OTHERS',
}

export enum CashFlow {
  Salary = 'Salary',
  Earnings = 'Earnings',
  Spouse = 'Spouse',
  Parents = 'Parents',
  SubMonthlySalary = 'MonthlySalary',
  SubOwnEarnings = 'OwnEarnings',
}

export enum CashFlowIncomeType {
  Fixed = 'Fixed',
  Variable = 'Variable',
}

export enum Occupation {
  DesignerAndArtsProfessional = 'Designer & arts professional',
  DoctorAndMedicalWorker = 'Doctor & medical worker',
  LawProfessional = 'Law professional',
  StayAtHomeMother = 'Stay at home mother',
  PrivateCompanyEmployee = 'Employee (private company)',
  Other = 'Other',
  GovernmentEmployeePNS = 'Government employee (PNS)',
  InformalWorker = 'Informal worker',
  Student = 'Student',
  TeacherAndProfessorAndResearcher = 'Teacher, professor & researcher',
  Retiree = 'Retiree',
  FarmerAndFishermenAndBreeder = 'Farmer, fishermen & breeder',
  PolicemanAndArmyAndSecurity = 'Policeman, army & security',
  SelfEmployedAndDistributors = 'Self employed & distributors',
}

export enum Education {
  PrimarySchool = 'SD',
  SecondarySchool = 'SMP',
  HighSchool = 'SMA',
  BachelorsDegree = 'S1',
  MastersDegree = 'S2',
  DoctoratesDegree = 'S3',
  VocationalCertificate = 'D3',
}

export enum Seats {
  LessThanOrEqualTo5Seater = '0',
  MoreThan5Seater = '1',
}
export enum LocalStorageKey {
  ColorNotificationModalShown = 'colorNotificationModalShown',
  Language = 'language',
  SurveyForm = 'surveyForm',
  CurrentStep = 'currentStep',
  ContactForm = 'contactForm',
  SelectedLoan = 'selectedLoan',
  LastOtpSent = 'lastOtpSent',
  LastOtpSentPhoneNumber = 'lastOtpSentPhoneNumber',
  LastLoginTime = 'lastLoginTime',
  Token = 'token',
  SimpleCarVariantDetails = 'simpleCarVariantDetails',
  CustomerId = 'customerId',
  UtmTags = 'utmTags',
  ChunkLoadFailed = 'chunk_failed',
  CityOtr = 'cityOtr',
  SelectedLoanPermutation = 'SelectedLoanPermutation',
}

export enum LoanRank {
  Green = 'Green',
  Yellow = 'Yellow',
  Red = 'Red',
}

export enum LoanRankSeva {
  Red = 'Red',
  Blue = 'Blue',
  Grey = 'Grey',
}
export enum CarTileSize {
  Big = 'Big',
  Small = 'Small',
}

export enum VariantFuelType {
  Diesel = 'Diesel',
  Petrol = 'Bensin',
  Hybrid = 'Hybrid',
}

export enum VariantTransmissionType {
  Manual = 'Manual',
  Automatic = 'Otomatis',
}

export enum VariantBodyType {
  MPV = 'MPV',
  SUV = 'SUV',
  Commercial = 'COMMERCIAL',
  Hatchback = 'HATCHBACK',
  Sedan = 'SEDAN',
  Sport = 'SPORT',
}

export enum Property {
  Yes = 'yes',
  No = 'no',
}

export enum SurveyFormKey {
  Name = 'name',
  Age = 'age',
  Gender = 'gender',
  Occupation = 'occupation',
  Education = 'education',
  City = 'city',
  CashFlow = 'cashFlow',
  TotalIncome = 'totalIncome',
  DownPayment = 'downPayment',
  HomeOwnership = 'homeOwnership',
  SeatNumber = 'seatNumber',
}

export enum VariantSpecificationsType {
  BodyType = 'bodyType',
  FuelType = 'fuelType',
  Transmission = 'Transmission',
  EngineCapacity = 'EngineCapacity',
  CarSeats = 'CarSeats',
  Length = 'length',
}

export enum ContactFormKey {
  Name = 'name',
  PurchaseTime = 'purchaseTime',
  ContactTime = 'contactTime',
  PhoneNumber = 'phoneNumber',
}

export enum PurchaseTime {
  Within2Weeks = 'Within 2 weeks',
  Within1Month = 'Within 1 month',
  Within2Months = 'Within 2 months',
  InOver2Months = 'In over 2 months',
}

export enum ContactTime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening',
}

export enum QueryKeys {
  LoanRank = 'loanRank',
  DpAmount = 'dpAmount',
  Tenure = 'tenure',
  MonthlyInstallment = 'monthlyInstallment',
  ModelId = 'modelId',
  VariantId = 'variantId',
  AdVariation = 'adVariation',
  UtmSource = 'utm_source',
  UtmMedium = 'utm_medium',
  UtmCampaign = 'utm_campaign',
  UtmContent = 'utm_content',
  UtmTerm = 'utm_term',
  UtmId = 'utm_id',
  AdSet = 'adset',
  CarBodyType = 'bodyType',
  CarBrand = 'brand',
  page = 'page',
}

export enum HTTPResponseStatusCode {
  TooManyRequest = 429,
  Unauthorized = 401,
  Forbidden = 403,
  BadRequest = 400,
}

export enum FileFormat {
  Webp = '.webp',
}

export enum PaymentType {
  MonthlyInstallment = 'monthlyInstallment',
  DownPayment = 'downPayment',
  CarModel = 'carModel',
}
export enum DownPaymentType {
  DownPaymentAmount = 'amount',
  DownPaymentPercentage = 'percentage',
}

export enum FunnelQueryKey {
  PaymentType = 'paymentType',
  DownPaymentType = 'downPaymentType',
  MonthlyInstallment = 'monthlyInstallment',
  DownPaymentAmount = 'downPaymentAmount',
  DownPaymentPercentage = 'downPaymentPercentage',
  PhoneNumber = 'phoneNumber',
}

export enum FunnelItemStepAction {
  SurveyContent = 'surveyContent',
  PickCar = 'pickCar',
  TalkToAgents = 'talkToAgents',
  TrackProgress = 'trackProgress',
}

export enum AdVariation {
  FindACar = 'find_a_car',
  FindALoan = 'find_a_loan',
  FindAPromo = 'find_a_promo',
  Concierge = 'concierge',
}

export enum LocationStateKey {
  isCarRecommendationsEmpty = 'isCarRecommendationsEmpty',
  Reevaluated = 'reevaluated',
  IsCarRecommendationsEmpty = 'isCarRecommendationsEmpty',
  OtpSent = 'otpSent',
  IsFromLoginPage = 'isFromLoginPage',
  File = 'file',
  Channel = 'channel',
  IsFromPopularCar = 'isFromPopularCar',
  Base64 = 'base64',
  Blob = 'blob',
}

export enum EkycStatus {
  EkycSuccessful = 'EkycSuccessful',
  EkycInProgress = 'EkycInProgress',
  GeneralError = 'GeneralError',
  EkycProcessCanceled = 'EkycProcessCanceled',
  TransactionTimedOut = 'TransactionTimedOut',
  UserInfoNotValidAndNotMatched = 'UserInfoNotValidAndNotMatched',
}

export enum EkycProgress {
  DemographicValidationInProgress = 'DemographicValidationInProgress',
  BiometricValidationInProgress = 'BiometricValidationInProgress',
  CertificateGenerate = 'CertificateGenerate',
  CVVSentToUser = 'CVVSentToUser',
  ServerCVVDeliveryAcknowledged = 'ServerCVVDeliveryAcknowledged',
}

export enum PreApprovalProgressType {
  Questions = 'questions',
  Files = 'files',
  Bank = 'bank',
}

export enum PreApprovalQuestionsKey {
  Occupation = 'occupation',
  TotalIncome = 'totalIncome',
  Address = 'address',
  Email = 'email',
}

export enum PreApprovalQuestionsAddressKey {
  Province = 'province',
  City = 'city',
  ZipCode = 'zipCode',
}

export enum CameraConfig {
  CameraEnvironment = 'environment',
  UserCamera = 'user',
}
export enum PageFrom {
  CarResult = 'car_results',
  CarResultDetails = 'car_result_details',
  CarResultVariant = 'car_result_variant',
}

export enum UploadChannel {
  Camera = 'camera',
  Gallery = 'gallery',
}

export enum SupportedBrand {
  toyota = 'Toyota',
  daihatsu = 'Daihatsu',
  bmw = 'BMW',
}

export enum PreApprovalResultScore {
  PASS = 'PASS',
  NOT_PASS = 'NOT_PASS',
}

export enum ImageType {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
  WEBP = 'image/webp',
}
export enum RedirectedPage {
  Home = 'home',
  Search = 'search',
  SearchPhone = 'search-phone',
}

export enum ErrorCode {
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
}

export enum CustomerPreApprovalStatus {
  Failed = 'failed',
  Success = 'success',
  InProgress = 'in_progress',
  PendingResult = 'pending_result',
  NotStarted = 'not_started',
}

export enum UTMTags {
  UtmSource = 'utm_source',
  UtmMedium = 'utm_medium',
  UtmCampaign = 'utm_campaign',
  UtmContent = 'utm_content',
  UtmTerm = 'utm_term',
  UtmId = 'utm_id',
  Adset = 'adset',
}

export enum ElementTagName {
  Input = 'INPUT',
  Textarea = 'TEXTAREA',
}

export enum Environment {
  Localhost = 'localhost',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export enum WebviewMessageType {
  BackToNativeFromPreApprovalSuccessPage = 'backToNativeFromPreApprovalSuccessPage',
  Token = 'token',
}

export enum NewFunnelLoanRank {
  Red = 'Red',
  Yellow = 'Yellow',
  Green = 'Green',
  Grey = 'Grey',
}

export enum NewFunnelLoanPermutationsKey {
  DpAmount = 'dpAmount',
  LoanRank = 'loanRank',
  MonthlyInstallment = 'monthlyInstallment',
  Tenure = 'tenure',
  DpPercentage = 'dpPercentage',
}

export enum NewFunnelLoanPermutationsKeySeva {
  DpAmount = 'dpAmount',
  LoanRankSeva = 'loanRankSeva',
  MonthlyInstallment = 'monthlyInstallment',
  Tenure = 'tenure',
  DpPercentage = 'dpPercentage',
}
export enum CameraType {
  BackEN = 'back',
  BackBAHASA = 'belakang',
}

export enum CameraFacingMode {
  front = 'user',
  back = 'environment',
}

export enum EditState {
  Open,
  Close,
}

export enum WebSocketNamespace {
  preApprovalNotifyEkycCompletion = 'pre notify ekyc completion',
  connect = 'connect',
  token = 'token',
}

export enum WebSocketTokenResult {
  success = 'success',
  failed = 'failed',
}

export enum ContactType {
  phone = 'phone',
  whatsApp = 'whatsApp',
}

export enum SizeType {
  Large = 'large',
  Small = 'small',
}

export enum AmplitudeRejectReason {
  DP_Capacity_Not_In_Range = '001',
  Occupation_Blacklisted = '002',
  EKYC_Failed = '004',
  COVADEX_Blacklisted = '005',
  Bank_Link_Result_Fail = '006',
  Unsupported_Province = '007',
}

export enum SessionStorageKey {
  PreviouslyViewed = 'previouslyViewed',
  CustomerId = 'customerId',
}

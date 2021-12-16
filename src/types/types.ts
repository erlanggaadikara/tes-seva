import { IconProps } from "components/icon/iconType";
import {
  CustomerPreApprovalStatus,
  LoanRank,
  UTMTags,
  WebviewMessageType,
  NewFunnelLoanPermutationsKey,
  NewFunnelLoanPermutationsKeySeva,
} from "models/models";

export type FormControlValue = string | number | readonly string[] | undefined;

export interface Option<T extends FormControlValue> {
  label: string;
  value: T;
}

export interface LoanDetail {
  loanRank: LoanRank;
  tenure: number;
  dpAmount: number;
  monthlyInstallment: number;
}

export interface CarResultIndexPage {
  startIndex: number;
  endIndex: number;
}

export interface CarVariantLoan extends LoanDetail {
  id: string;
  modelId?: string;
}

export type CarRecommendation = {
  id: string;
  brand: string;
  model: string;
  image: string;
  numberOfPopulation: number;
  lowestAssetPrice: number;
  highestAssetPrice: number;
  loanRank: string;
  variants: CarVariantLoan[];
  brandAndModel?: string;
  modelAndBrand?: string;
};

export interface CarRecommendationResponse {
  carRecommendations: CarRecommendation[];
}

export interface CarVariant {
  id: string;
  name: string;
  priceValue: number;
  fuelType: string;
  transmission: string;
  engineCapacity: number;
  carSeats: number;
}

export interface CarVariantRecommendation extends CarVariant {
  loanRank: string;
  tenure: number;
  dpAmount: number;
  monthlyInstallment: number;
}

export interface CarModelBasicInfo {
  id: string;
  brand: string;
  model: string;
}

export interface CarModelBasicDetailsResponse extends CarModelBasicInfo {
  variants: CarVariant[];
  images: string[];
}

export interface CarModelDetailsResponse {
  id: string;
  brand: string;
  model: string;
  variants: CarVariantRecommendation[];
  images: string[];
}

export interface VariantDetail {
  id: string;
  name: string;
  priceValue: number;
  fuelType: string;
  transmission: string;
  engineCapacity: number;
  bodyType: string;
  carSeats: number;
  length: number;
  pdfUrl: string;
  images: string[];
  newFunnelMainColorImage: string;
  description: {
    en: string;
    id: string;
  };
}

export interface NewFunnelCarVariantDetails {
  modelDetail: CarModelBasicInfo;
  variantDetail: VariantDetail;
}

export interface CarVariantDetails extends NewFunnelCarVariantDetails {
  loanDetail: LoanDetail;
}

export interface VariantSpecifications {
  label: string;
  title: string;
  icon: (props: IconProps) => JSX.Element;
  content: string;
  contentLabel: string;
}

export interface VariantDetailsInfo {
  discount: string;
  loanEstimate: string;
  downPayment: string;
  price: string;
  priceAmount: string;
  installments: string;
  tenure: string;
  estimatesDes: string;
  insuranceDes: string;
  feesDes: string;
  specifications: string;
  description: string;
  confirmAgent: string;
  loanConfiguration: string;
  loanApplyMessage: string;
}

export interface SMSResponse {
  message: string;
  lastOtpSentTime: number;
}
export interface Token {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  isNewUser: boolean;
  phoneNumber: string;
}

export interface CustomerInfo {
  id: string;
  phoneNumber: string;
  name: string;
  age: string;
  gender: string;
  occupation: string;
  education: string;
  city: string;
  cashFlow: string[];
  fixedIncome: boolean;
  monthlyIncome: number;
  downPayment: number;
  homeOwnership: boolean;
  seatNumber: string[];
  variantId: string;
  modelId: string;
  loanDownPayment: number;
  loanMonthlyInstallment: number;
  loanTenure: number;
  loanRank: string;
  purchaseTime: string;
  contactTime: string;
  createdAt: number;
  variant?: CarVariantDetails;
}

export interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

export interface SimpleCarVariantDetail {
  modelId: string;
  variantId: string;
  loanTenure: number;
  loanDownPayment: number;
  loanMonthlyInstallment: number;
  loanRank: string;
}

export interface QuestionFlowFormProps {
  handleDisabled?: (isDataValid: boolean) => void;
}

export interface PreApprovalRequest {
  monthlyIncome: number;
  loanTenure?: number;
  loanDownPayment?: number;
  loanMonthlyInstallment?: number;
  loanRank?: LoanRank;
  variantId?: string;
  modelId?: string;
  address: {
    city: FormControlValue;
    province: FormControlValue;
    zipCode: string;
  };
  occupation: FormControlValue;
  email: string;
}

export interface CustomerPreApprovalResponse {
  status: CustomerPreApprovalStatus;
  loanTenure: number;
  loanDownPayment: number;
  loanMonthlyInstallment: number;
  modelDetail: CarModelDetailsResponse;
  variantDetail: VariantDetail;
  finishedAt: number;
  finco: string; // 'ACC' | 'TAF'
}

export interface ErrorResponse {
  code?: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ErrorValidationDetail {
  name: string;
  message: string;
}

export interface UTMTagsData {
  [UTMTags.UtmSource]: string | null;
  [UTMTags.UtmMedium]: string | null;
  [UTMTags.UtmCampaign]: string | null;
  [UTMTags.UtmContent]: string | null;
  [UTMTags.UtmTerm]: string | null;
  [UTMTags.UtmId]: string | null;
  [UTMTags.Adset]: string | null;
}

export type WebviewMessageData<T> = {
  type: WebviewMessageType;
  value: T;
};

export interface Params {
  id: string;
}

export interface NewFunnelLoanPermutations {
  [NewFunnelLoanPermutationsKey.DpAmount]: number;
  [NewFunnelLoanPermutationsKey.LoanRank]: string;
  [NewFunnelLoanPermutationsKey.MonthlyInstallment]: number;
  [NewFunnelLoanPermutationsKey.Tenure]: number;
  [NewFunnelLoanPermutationsKey.DpPercentage]: number;
  isDefault?: boolean;
}

export interface NewFunnelLoanPermutationsSeva {
  [NewFunnelLoanPermutationsKeySeva.DpAmount]: number;
  [NewFunnelLoanPermutationsKeySeva.LoanRankSeva]: string;
  [NewFunnelLoanPermutationsKeySeva.MonthlyInstallment]: number;
  [NewFunnelLoanPermutationsKeySeva.Tenure]: number;
  [NewFunnelLoanPermutationsKeySeva.DpPercentage]: number;
  isDefault?: boolean;
}
export interface NewFunnelLoanPermutationsRequest {
  id: string;
  monthlyIncome: number;
  age: string;
}

export interface NewFunnelLoanPermutationsResponse {
  loanPermutations: NewFunnelLoanPermutations[];
}

export interface NewFunnelLoanPermutationsSevaResponse {
  loanPermutations: NewFunnelLoanPermutationsSeva[];
}
export type NewFunnelLoanRankName = {
  name: NewFunnelLoanPermutationsKey;
  value: string;
};

export type CarSuggestions = {
  id: number;
  model: string;
  variant_name: string;
  variant_title: string;
  price_currency: number;
  price_value: number;
  price_formatted_value: number;
};

export interface CarSuggestionsResponse {
  carSuggestion: CarSuggestions[];
}
export interface ParagraphBlogType {
  type: string;
  body: string;
}

export interface PopularBlogType {
  title: string;
  writer: string;
  date: string;
}

export interface RelatedBlogType {
  category: string;
  image: string;
  title: string;
  writer: string;
  date: string;
}

export interface DataBlogType {
  id: string;
  title: string;
  writterAndDate: string;
  headline: string;
  paragraphLists: ParagraphBlogType[];
  popularLists: PopularBlogType[];
  relatedLists: RelatedBlogType[];
}

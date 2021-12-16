import React, { HTMLAttributes } from 'react'
import { SurveyFormProvider } from './surveyFormContext/surveyFormContext'
import { LoanCalculatorProvider } from './loanCalculatorContext/loanCalculatorContext'
import { RecommendationsContextProvider } from './recommendationsContext/recommendationsContext'
import { CarModelDetailsContextProvider } from './carModelDetailsContext/carModelDetailsContext'
import { CarVariantDetailsContextProvider } from './carVariantDetailsContext/carVariantDetailsContext'
import { ContactFormProvider } from './contactFormContext/contactFormContext'
import { LoanPermutationResponseContextProvider } from './loanPermutationContext/loanPermutationContext'
import { LastOtpSentTimeContextProvider } from './lastOtpSentTimeContext/lastOtpSentTimeContext'
import { FunnelQueryContextProvider } from './funnelQueryContext/funnelQueryContext'
import { CarModelBasicDetailsContextProvider } from './carModelBasicDetailsContext/carModelBasicDetailsContext'
import { FunnelFormContextProvider } from './funnelFormContext/funnelFormContext'
import { QuestionFlowContextProvider } from './questionFlowContext/questionFlowContext'
import { PopularCarsContextProvider } from './popularCarsContext/popularCarsContext'
import { CurrentLanguageContextProvider } from './currentLanguageContext/currentLanguageContext'
import { GalleryContextProvider } from './galleryContext/galleryContext'
import { CurrenCityOtrContextProvider } from './currentCityOtrContext/currentCityOtrContext'
import { NewLoanPermutationContextProvider } from './newLoanPermutationContext/newLoanPermutationContext'

const providers: Array<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.JSXElementConstructor<React.PropsWithChildren<any>>
> = [
  SurveyFormProvider,
  LoanCalculatorProvider,
  RecommendationsContextProvider,
  CarModelDetailsContextProvider,
  CarVariantDetailsContextProvider,
  ContactFormProvider,
  LoanPermutationResponseContextProvider,
  LastOtpSentTimeContextProvider,
  FunnelQueryContextProvider,
  CarModelBasicDetailsContextProvider,
  FunnelFormContextProvider,
  QuestionFlowContextProvider,
  PopularCarsContextProvider,
  CurrentLanguageContextProvider,
  GalleryContextProvider,
  CurrenCityOtrContextProvider,
  NewLoanPermutationContextProvider,
]

export const GlobalContextProvider = (props: HTMLAttributes<HTMLElement>) => {
  return (
    <>
      {providers.reduceRight((accumulator, Component) => {
        return <Component>{accumulator}</Component>
      }, props.children)}
    </>
  )
}

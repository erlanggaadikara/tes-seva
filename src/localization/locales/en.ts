import { LanguageMap } from "./types";
import {
  AdVariation,
  AgeGroup,
  CashFlow,
  ContactTime,
  Education,
  FunnelItemStepAction,
  LoanRank,
  NewFunnelLoanRank,
  Occupation,
  PaymentType,
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
  PurchaseTime,
  SurveyFormKey,
  VariantBodyType,
  VariantFuelType,
  VariantTransmissionType,
} from "models/models";
import { questions } from "pages/QuestionsPage/QuestionList/utils/questionsEn.config";
import {
  cityOptionsIndonesia,
  provinceOptionsIndonesia,
} from "./cityOptions/cityOptions.id";
import { TermsAndConditionsParaghraph } from "pages/TermsAndConditions/TermsParaghraphText";
import { PrivacyParaghraph } from "pages/PrivacyPolicy/PrivacyParaghraphText";

export const english: LanguageMap = {
  common: {
    ok: "Ok!",
    cancel: "Cancel!",
    recommendationErrorMessage:
      "Sorry, we’re having trouble displaying your results. Please try again later",
    errorMessage: "Oops.. Something went wrong. Let's try again later.",
    tenureAmount: "{{count}} year",
    tenureAmount_plural: "{{count}} years",
    loadingMsg: "Loading...",
    otpSentError: "Oops.. Something went wrong. Let's try again later.",
    select: "Select",
    contactUsMessage: "Want to speak to our agent?",
    contactUs: "Contact Us",
    monthlyInstallments: "Monthly Instalments",
    downPayment: "Downpayment",
    returnToCarResults: "Return to car results",
    save: "Save",
    skip: "Skip",
    deny: "Deny",
    calculateLoan: "Calculate loan",
    applyNow: "Apply now",
    or: "OR",
    getPreApproval: "Get pre-approval",
    loveThisCar: "Love this car?",
  },
  loanRankText: {
    easy: "Easy",
    maybeDifficult: "Maybe difficult",
    difficult: "Difficult",
  },
  RpPrice: "Rp {{priceValue}}",
  surveyForm: {
    formControl: {
      back: "Back",
      next: "Next",
    },
    formTitle: "Tell us about yourself",
    fields: {
      name: {
        label: "What's your name?",
      },
      gender: {
        label: "What’s your gender?",
        options: {
          male: "Male",
          female: "Female",
        },
      },
      ageGroup: {
        label: "Hello, how old are you?",
        placeholderLabel: "Select",
        options: {
          [AgeGroup.From18to27]: AgeGroup.From18to27,
          [AgeGroup.From28to34]: AgeGroup.From28to34,
          [AgeGroup.From35to50]: AgeGroup.From35to50,
          [AgeGroup.OlderThan50]: AgeGroup.OlderThan50,
        },
      },
      cashFlow: {
        label:
          "For your car budget, what are all the sources of your monthly cashflow that you want to include? ",
        subtitle: "Please select all that apply.",
        options: {
          [CashFlow.Salary]: "My steady monthly salary",
          [CashFlow.Earnings]:
            "My own earnings (business," + " rental," + " freelance, etc.)",
          [CashFlow.Spouse]: "My spouse's income",
          [CashFlow.Parents]: "My parent's income",
          [CashFlow.SubMonthlySalary]: "Steady monthly salary",
          [CashFlow.SubOwnEarnings]:
            "Own earnings (business, rental, freelance, etc.)",
        },
      },
      city: {
        label: "Which city do you live in?",
        // TODO change this when city has english version
        options: cityOptionsIndonesia,
        placeholder: "Start typing",
        noOptionText:
          "Oops this city is not found in Indonesia. Please try typing it again.",
      },
      occupation: {
        label: "What's your occupation?",
        placeholderLabel: "Select",
        options: {
          [Occupation.DesignerAndArtsProfessional]:
            Occupation.DesignerAndArtsProfessional,
          [Occupation.DoctorAndMedicalWorker]:
            Occupation.DoctorAndMedicalWorker,
          [Occupation.LawProfessional]: Occupation.LawProfessional,
          [Occupation.StayAtHomeMother]: Occupation.StayAtHomeMother,
          [Occupation.PrivateCompanyEmployee]:
            Occupation.PrivateCompanyEmployee,
          [Occupation.Other]: Occupation.Other,
          [Occupation.GovernmentEmployeePNS]: Occupation.GovernmentEmployeePNS,
          [Occupation.InformalWorker]: Occupation.InformalWorker,
          [Occupation.Student]: Occupation.Student,
          [Occupation.TeacherAndProfessorAndResearcher]:
            Occupation.TeacherAndProfessorAndResearcher,
          [Occupation.Retiree]: Occupation.Retiree,
          [Occupation.FarmerAndFishermenAndBreeder]:
            Occupation.FarmerAndFishermenAndBreeder,
          [Occupation.PolicemanAndArmyAndSecurity]:
            Occupation.PolicemanAndArmyAndSecurity,
          [Occupation.SelfEmployedAndDistributors]:
            Occupation.SelfEmployedAndDistributors,
        },
      },
      education: {
        label: "What's your level of education?",
        placeholderLabel: "Select",
        options: {
          [Education.PrimarySchool]: "Primary school",
          [Education.SecondarySchool]: "Secondary school",
          [Education.HighSchool]: "High school",
          [Education.BachelorsDegree]: "Bachelor's degree",
          [Education.MastersDegree]: "Master's degree",
          [Education.DoctoratesDegree]: "Doctorate's degree",
          [Education.VocationalCertificate]: "Vocational certificate",
        },
      },
      seats: {
        label: "What size cars are you looking for?",
        subtitle: "Please select all that apply.",
        options: {
          lessThanOrEqualTo5Seater: "≤ 5 seater",
          moreThan5Seater: "> 5 seater",
        },
      },
      cashFlowAmount: {
        label:
          "From all of the sources of income you selected, on average what's the monthly total?",
        subtitle: "You selected: ",
        error: "Oops, amount too low, please increase your amount",
        unit: "Rp",
      },
      downPayment: {
        label: "How much down payment do you have prepared?",
        subtitle:
          'A good downpayment usually <TextSmallBold style="font-family:PoppinsBold;">starts at 20% of the car price</TextSmallBold>.' +
          " For example, a car priced at Rp. 100 million, would have a downpayment which begins at around Rp. 20 million.",
        error: "Oops, amount too low, please increase your amount",
        unit: "Rp",
      },
      property: {
        label:
          "Do you own any property? (house, land, apartment, rental, etc.)",
        options: {
          yes: "Yes",
          no: "No",
        },
      },
    },
    loading: {
      message: "Hold tight, let us select some cars for you!",
    },
  },
  landingPage: {
    title: "Find the best car for your budget, with confidence!",
    subtitle:
      "Fill out our 2 minute survey, so we can find the best fit car and financing options for you. 🙌",
    forwardButtonText: "Ok, let's go!",
    legal: {
      beginText: "By tapping on ‘Ok, let's go!' I accept the",
      termsAndConditions: " Terms & Conditions",
      and: " and ",
      privacyPolicy: "Privacy Policy",
    },
  },
  colorNotificationModal: {
    title:
      'From your survey, we’ve created a <TextSmallBold style="font-family:PoppinsBold;">loan application rating</TextSmallBold>.',
    colorsExplain: {
      green: {
        title: "Easy",
        subtitle: "to apply for this loan",
      },
      yellow: {
        title: "May be difficult",
        subtitle: "to apply for this loan",
      },
      red: {
        title: "Difficult",
        subtitle: "to apply for this loan",
      },
    },
    ratingsMeaning: {
      title: "The ratings are based on:",
      itemFirst:
        'Complexity of <TextSmallBold style="font-family:PoppinsBold;">data needed</TextSmallBold> during the application.',
      itemSecond:
        'Your <TextSmallBold style="font-family:PoppinsBold;">chance of approval</TextSmallBold> based on financial data provided.',
    },
  },
  recommendations: {
    title: "Car options",
    message:
      "Based on your survey results, we have selected the best cars for your budget.",
    noGreenMessage:
      "Based on your survey results, we suggest to increase your DP amount or add additional sources of income that you may have.",
    priceRange: "Rp {{priceRange}} mio",
    popularityLine1: " people",
    popularityLine2: "like you recently got this car",
    otherOptions: {
      title: "Other car options",
      message:
        "The car options below may require a higher downpayment and monthly repayment.",
    },
    button: "Adjust my financial information",
    contactUs: "Contact us",
    viewMore: "View more",
  },
  modelDetails: {
    variantSpecifications: {
      [VariantFuelType.Diesel]: "Diesel",
      [VariantFuelType.Petrol]: "Petrol",
      [VariantFuelType.Hybrid]: "Hybrid",
      [VariantTransmissionType.Automatic]: "Automatic",
      [VariantTransmissionType.Manual]: "Manual",
      engineCapacity: "{{engineCapacity}} cc",
    },
    viewDetails: "View details",
    improveNow: "Get advice",
  },
  variantDetails: {
    discount: "Car price before discount (OTR)",
    loanEstimate: "Loan Estimate",
    downPayment: "DP (Downpayment)",
    priceUnit: "Rp {{price}}jt",
    priceAmount: "Rp {{price}}",
    installments: "Monthly instalments",
    instal: "Monthly instal",
    tenure: "Loan Tenure",
    instalmentFreeBanner: {
      title: "1 Instalment Free ",
      desc: "If you get pre-approved",
    },
    instalmentFreeModal: {
      title: "1 Instalment Free",
      desc: "Use the calculator to configure your loan then apply for instant credit and get 1 month free instalment",
      tc: "Terms & conditions",
      rule1: "Applicable on your 6th month",
      rule2: "Get pre-approved by Torq",
      rule3: "Valid in selected dealerships only",
      applyNow: "Apply now",
      pickACar: "Pick a car",
    },
    estimatesDes: "These are estimates for TAF/ACC leasing companies only.",
    insuranceDes: "Monthly includes average insurance payment.",
    feesDes: "Other fees not yet included.",
    specifications: "Specifications",
    variantSpecifications: {
      bodyType: "Body Type",
      fuel: "Fuel",
      transmission: "Transmission",
      engineCapacity: "Engine capacity",
      engineAmount: "{{amount}}cc",
      carSeats: "Car Seats",
      carSeatsAmount: "{{amount}} Seater",
      length: "Dimensions (length)",
      lengthAmount: "{{amount}}m",
      brochure: "View brochure",
    },
    description: "Description",
    confirmAgent: "Confirm with our agent",
    loanConfiguration: "Change your loan configuration",
    loanApplyMessage: "to apply for this loan",
    variantBodyType: {
      [VariantBodyType.MPV]: "MPV",
      [VariantBodyType.SUV]: "SUV",
      [VariantBodyType.Commercial]: "Commercial",
      [VariantBodyType.Hatchback]: "Hatchback",
      [VariantBodyType.Sedan]: "Sedan",
      [VariantBodyType.Sport]: "Sport",
    },
    variantFuelType: {
      [VariantFuelType.Hybrid]: VariantFuelType.Hybrid,
      [VariantFuelType.Petrol]: "Petrol",
      [VariantFuelType.Diesel]: VariantFuelType.Diesel,
    },
    variantTransmissionType: {
      [VariantTransmissionType.Manual]: VariantTransmissionType.Manual,
      [VariantTransmissionType.Automatic]: "Automatic",
    },
    reevaluatedMsg: "Your loan results have been re-evaluated",
  },
  loanRankIndicator: {
    loanRank: {
      [LoanRank.Green]: "Easy",
      [LoanRank.Yellow]: "Maybe Difficult",
      [LoanRank.Red]: "Difficult",
    },
    loanApplyMessage: "to apply for this loan",
  },
  loanCalculatorPage: {
    calculateResult: {
      monthlyInstallments: "Monthly instalments",
      loanRating: "Loan rating",
    },
    selectTheLoan: "Select this loan",
    addMoreIncome: "Add more income",
    pageTitleSection: {
      [LoanRank.Green]: {
        title: "Your loan configuration looks good. Do you want to adjust it?",
        description:
          "You can adjust your DP and tenure configuration but make sure the loan application rating stays green!",
        instruction: "Change your DP and tenure below:",
      },
      [LoanRank.Yellow]: {
        title: "Oops! This option may be difficult. We can help.",
        description:
          "Try increasing your DP or tenure to lower your monthly instalments.",
        instruction: "Change your DP and tenure below:",
      },
      [LoanRank.Red]: {
        title: "Oops! This option will be difficult. We can help.",
        description:
          "Try increasing your DP or tenure to lower your monthly instalments.",
        instruction: "Change your DP and tenure below:",
      },
    },
    loadingPage: {
      title:
        "Please don’t refresh this page! We are loading your loan options.",
    },
  },
  scheduleAppointmentPage: {
    congrats: "Congratulations! 🎉",
    form: {
      title:
        "Input your contact information and be one step closer to buying your dream car!",
      purchaseTime: {
        label: "When are you looking to purchase this car?",
        placeholder: "Select",
        options: {
          [PurchaseTime.Within2Weeks]: PurchaseTime.Within2Weeks,
          [PurchaseTime.Within1Month]: PurchaseTime.Within1Month,
          [PurchaseTime.Within2Months]: PurchaseTime.Within2Months,
          [PurchaseTime.InOver2Months]: PurchaseTime.InOver2Months,
        },
      },
      contactTime: {
        label: "When is the best time to contact you?",
        placeholder: "Select",
        options: {
          [ContactTime.Morning]: "Morning",
          [ContactTime.Afternoon]: "Afternoon",
          [ContactTime.Evening]: "Evening",
        },
      },
      number: {
        label: "Add your phone number",
      },
      submit: "Speak to our agent",
    },
    loading: {
      message: "Don’t refresh this page! We are booking your appointment.",
    },
  },
  loginPage: {
    title: "Enter your mobile number",
    subtitle: "We will send you a confirmation code.",
    submit: "Next",
    legal: {
      beginText: "By inputting number you agree with our",
      termsAndConditions: " Terms & Conditions",
      and: " and ",
      privacyPolicy: "Privacy Policy",
    },
  },
  otpPage: {
    toastMsg: "An OTP SMS has been sent to your number",
    title: "Enter code sent to your phone",
    message: "We sent it to {{phoneNumber}}",
    errorText: "Incorrect code",
    resendText: "Resend code",
    resendCountdown: "Resend code in: ",
    submit: "Submit",
    error: {
      otp: "We’re sorry. We encountered an error with your OTP verification. Please try again later.",
      customerInfo: "Oops.. Please wait. Let's try again in 2 minutes.",
      tooManyOtpSend: "Oops.. Please wait. Let's try again in 2 minutes.",
    },
  },
  appDownloadPage: {
    carModelDetail: {
      title: "How to get a car with Torq?",
      step1:
        "Take our <LinkLabelMediumSemiBold" +
        ' style="font-family:PoppinsBold;color:#053565">2' +
        " minute</LinkLabelMediumSemiBold> survey",
      step2:
        "View the <LinkLabelMediumSemiBold" +
        ' style="font-family:PoppinsBold;color:#053565">best loan</LinkLabelMediumSemiBold> options for your dream car',
      step3:
        "Talk to our <LinkLabelMediumSemiBold" +
        ' style="font-family:PoppinsBold;color:#053565">dedicated agents</LinkLabelMediumSemiBold> to finalize your car and loan option',
    },
    pageTitle: "Thank you, {{userName}}!",
    description:
      "An authorized Torq agent will contact you to continue the negotiation and application process.",
    downloadTitle: "Want to get 1 instalment free?",
    downloadTip:
      "*Google Play and the Google Play logo are trademarks of Google LLC.",
    documentsDesc: {
      itemOne: "Upload your loan documents on Torq within 48 hours",
      itemTwo: "Get a loan via one of our leasing companies",
      itemThree: "Get cash back after you pay your 6th loan instalment*",
    },
    cashBackTip:
      "*Cash back is paid by crediting funds to your Astrapay wallet, capped to IDR 3M or your monthly loan repayment amount (whichever is lower)",
    retake: "Re-take the survey",
  },
  loadingPage: {
    title: "Please don’t refresh this page! We are generating results for you.",
  },
  questionsPage: {
    questionList: questions,
    title: "Can We help you? ",
  },
  funnelFormPage: {
    channels: {
      [AdVariation.FindACar]: {
        caption: "How would you like to find your dream car?",
        cta: "Find My Car",
      },
      [AdVariation.FindALoan]: {
        caption: "Find deals on car loans and lock in your offer online",
        cta: "Get My Quote",
      },
      [AdVariation.FindAPromo]: {
        caption: "Find the best promotions and offers on new cars online",
        cta: "Search Promotions",
      },
      [AdVariation.Concierge]: {
        caption: "Find the best deals on new cars - we take care of the rest",
        cta: "Search Car Deals",
      },
    },
    funnelForm: {
      subtitle: "All fields are optional",
      monthlyInstallment: "Monthly Instalments",
      downPayment: "Down payment",
      searchBy: "Search by:",
      maxDpLabel: "Input your max Downpayment amount:",
      monthlyInstallmentLabel: "Input your max monthly instalment amount:",
      phoneNumberLabel:
        'Leave your number for an advisor to contact you <TextXSmallMedium style="font-family:Poppins; color:#9EA3AC">(optional)</TextXSmallMedium>',
      buttonAboveLabel: {
        [PaymentType.MonthlyInstallment]:
          "Monthly instalments is based on 60 months term and 20% downpayment",
        [PaymentType.DownPayment]: "Downpayment is based on 60 months term ",
      },
      advancedSearch: "Advanced search",
      supportBy: "Supported by",
    },
  },
  homePageSearch: {
    form: {
      title: "Find the best promos and offers now",
      searchBy: "Search by:",
      maxDpLabel: "Input your max Downpayment amount:",
      monthlyInstallmentLabel: "Input your max monthly instalment amount:",
      buttonAboveLabel: {
        [PaymentType.MonthlyInstallment]:
          "Monthly instalments is based on 60 months term and 20% downpayment",
        [PaymentType.DownPayment]: "Downpayment is based on 60 months term ",
      },
      findButton: "Find me cars",
      supportBy: "Supported by",
      cta: "Find me cars",
    },
    whatsappMsg: "Hello, I’m interested in purchasing a car from Torq",
    browseByBrand: {
      text: "Browse by available brands",
    },
    carBodyType: {
      title: "Browse by body type",
    },
    survey: {
      title: "A car to suit your budget",
      desc: "Take our 2 min survey to find the right cars for your budget.",
      cta: "Take survey",
    },
    promotion: {
      title: "More promos and deals",
    },
    advisor: {
      title: "Speak to an advisor",
      fullName: "Full name",
      desc: "Give us your name and number to speak directly with one of our friendly advisors today.",
      cta: "Send details",
      thanksTitle: "Thanks for sharing your details",
      thanksDesc:
        "One of our friendly advisors will be in contact with you shortly on the number you provided.",
      alertButton: "OK",
    },
    walkingThrough: {
      cta: "Find out more",
      findCar: {
        title: "Find your car and get a loan with Torq",
        desc: "Search from the most popular brands",
      },
      survey: {
        title: "Find the most affordable loan options",
        desc: "Take a 2 minute survey to see what is affordable",
      },
    },
    popularCars: {
      title: "Popular cars on Torq",
      browseMoreCars: "Browse more cars",
    },
  },
  carResultsPage: {
    title:
      '<H2MediumBold style="font-family:PoppinsBold;">Browse</H2MediumBold>' +
      " Cars",
    placeholder: "Search Car",
    message:
      "*Monthly instalments is based on 60 months term and 20% down payment" +
      " deposit",
    monthly: "Monthly Instalments",
    dp: "Downpayment",
    priceRange: "Rp {{priceRange}} jt",
    tenure: "5 years",
    contactUs: "Contact us",
    viewDetails: "View details",
    questionTitle: "Have a question?",
    questionSubtitle:
      "Speak to one of our friendly advisors who will be happy to help",
    surveyTitle: "A car to suit your budget",
    surveySubtitle:
      "Take our 2 min survey to find the right cars for your budget",
    surveyButton: "Take Survey",
    whatsappMessage:
      "Hi, I’m interested in {{carName}} with DP of Rp {{dpRange}} jt and" +
      " monthly instalment of Rp {{monthlyRange}} jt.",
    buttonMessage: "See if you can qualify for a loan",
    button: "Take our 2 minute survey",
    notFound: "We couldn’t find anything...",
    notFoundDesc:
      "Try searching again or adjusting the filters to bring up more car results.",
    notFoundButton: "Browse all Car",
    filterModal: {
      header: "Filters",
      reset: "Reset all",
      monthlyTitle: "Max Monthly Instalment",
      monthlySubtitle: "Pick a suitable price for your monthly instalments",
      downpaymentTitle: "Downpayment",
      downpaymentSubtitle: "Pick a suitable price for your downpayment",
      amount: "Amount",
      amountText: "Input your max downpayment amount",
      percentage: "Percentage",
      percentageText: "Choose a suitable percentage for your downpayment",
      brand: "Brands",
      button: "Show Results",
      body: "Body",
      category: "Category",
      priceRange: "Price range",
    },
  },
  carResultPageSeva: {
    totalResult:
      '<H2MediumBold style="font-family:PoppinsBold;">{{total}} brands new cars</H2MediumBold>',
    sortBy: {
      title: "Sort By",
      price: "Price",
      highToLow: "High To Low",
      lowToHigh: "Low To High",
    },
    freeInstallment: {
      title: "1 Free Instalment",
      subtitle: "if you get pre-approved for your car",
      button: "Find out more",
    },
  },
  funnelBackground: {
    [FunnelItemStepAction.SurveyContent]: {
      step: "01.",
      title: "Survey Content",
      subtitle:
        "Fill out and complete the survey about you and your" +
        " finances. We will recommend the most suitable car for you.",
      buttonTitle: "Fill Out Now",
    },
    [FunnelItemStepAction.PickCar]: {
      step: "02.",
      title: "Pick a Car & Loan Configuration",
      subtitle:
        "We offer the easiest financing plan for you to apply based on your profile. What are you waiting for, let's get your dream car right now!",
      buttonTitle: "Get your car",
    },
    [FunnelItemStepAction.TalkToAgents]: {
      step: "03.",
      title: "Talk to Our Agents",
      subtitle:
        "You can discuss car and financing details with our experienced advisers.",
      buttonTitle: "Start now",
    },
    [FunnelItemStepAction.TrackProgress]: {
      step: "04.",
      title: "Submit & Track Progress",
      subtitle:
        "You can upload the required documents online and monitor every process of your financing application with us.",
    },
    link: {
      termsAndConditions: "Terms & Conditions",
      privacyPolicy: "Privacy Policy",
      contactUs: "Contact Us",
    },
  },
  carVariantsModal: {
    calculateTitle: "Want to use the loan calculator?",
    customizeTitle: "Want to customise your loan?",
    content: "Complete our short survey to customise your loan for your budget",
    cancelButton: "Not now",
    okButton: "Start Survey",
    description: "*free, no commitment",
  },
  shareModal: {
    title: "Share",
  },
  overviewCarVariant: {
    title: "Overview",
    calculateCredit: "Calculate Credit",
    onlineCredit: "Online Credit",
  },
  galeryCarVariant: {
    title: "Galery",
    interior: "Interior",
    exterior: "Exterior",
  },
  newFunnelVariantDetailsPage: {
    customizeLoan: "Customise Loan",
    contactUsMessage: "Want to speak to our agent?",
    contactUs: "Speak to an advisor",
    whatsappMessage:
      "Hi, I’m interested in {{carName}} with DP Rp {{dp}} and monthly" +
      " instalment of Rp {{monthly}}.",
    calculateLoanMessage: "Use our loan calculator to see what you can afford.",
    getPreApprovalMessage: "Find out if you can get pre-approval",
  },
  variantListPage: {
    calculateLoan: "Calculate loan",
    whatsappMessage:
      "Hi, I’m interested in {{carName}} with DP Rp {{dpRange}} jt and" +
      " monthly instalment of Rp {{monthlyRange}} jt.",
    badgeTitle: "Love this car?",
    badgeMessage:
      "Use the loan calculator on any of the models below to check your affordability.",
  },
  preApprovalStartPage: {
    title: "Let's get started!",
    subtitle: "Answer a few questions to find your loan approval chances",
    submit: "Ok",
  },
  preApprovalQuestionFlow: {
    submit: "Next",
    [SurveyFormKey.TotalIncome]: {
      title: "What’s your estimated monthly income?",
      placeholder: "8,500,000",
    },
    [PreApprovalQuestionsKey.Address]: {
      title: "What's your Home Address?",
      [PreApprovalQuestionsAddressKey.Province]: {
        title: "Province",
        placeholder: "Search Province",
        options: provinceOptionsIndonesia,
        noOptionText:
          "Oops, this province is not found in Indonesia. Please check and try again.",
      },
      [PreApprovalQuestionsAddressKey.City]: {
        title: "City",
        placeholder: "Search City",
        noOptionText:
          "Oops, this city is not found in given province. Please check and try again.",
      },
      [PreApprovalQuestionsAddressKey.ZipCode]: {
        title: `Zip code <span style="font-family: PoppinsSemiBold;font-size: 14px;color:#9EA3AC">(Optional)</span>`,
        placeholder: "Eg: 15221",
        errorMessage: "Please input a valid zip code.",
      },
    },
    [PreApprovalQuestionsKey.Email]: {
      title: "What’s your email address?",
      placeholder: "Eg: jon.doe@ymail.com",
    },
  },
  preApprovalIntroModal: {
    title: "Get pre-approved",
    subtitle: "Just complete four simple & secure steps",
    steps: [
      { label: "Verify phone number" },
      { label: "Share your details" },
      { label: "Photograph your KTP" },
      { label: "Verify your income" },
    ],
    secureInfoTitle: "Secure",
    secureInfoDesc: "All information you share is encrpyted and kept private.",
    positiveButton: "Start Now",
  },
  preApprovalProgress: {
    title: "Instant Approval",
    calcRequestPage: {
      title: "Almost done...",
      desc: "Review your steps and submit to see your change for credit approval",
      process: {
        title: "Pre-Approval",
        phoneNo: "Verify phone number",
        share: "Share your details",
        ktp: "Photograph & verify KTP",
        income: "Verify your income",
      },
      cta: "Submit for approval",
    },
    sms: {
      title: "Sending you an SMS",
      desc: "We’re calculating your results, which may take a few minutes. We’ll SMS your results to your registered number.",
      downloadBtn: "Download now",
      downloadTitle: "Ready to buy your car?",
      downloadDesc:
        "Start your loan application now by downloading the Torq app.",
      uploadDocuments: "Upload documents",
    },
    confirm: {
      title: "You’re pre-approved!",
      next: {
        title: "Here’s what you need to do next:",
        preApproved: "Get pre-approved",
        download: "Download TORQ app",
        fillApp: "Fill out loan application",
        upload: "Upload your documents",
        track: "Track your loan status",
      },
      carInfo: {
        title: "Car & loan details",
        loanText: "LOAN ESTIMATE",
        priceDesc: "Car price before discount (OTR)",
      },
      loanInfo: {
        title: "LOAN ESTIMATE",
      },
      tafText1: "These are estimates for TAF/ACC leasing companies only.",
      tafText2: "Monthly includes average insurance payment.",
      tafText3: "Other fees not yet included.",
      startBtn: "Start application",
      chatBtn: "Speak to an advisor",
      whatsAppMessage:
        "Hi, I've been pre-approved for {{carBrand}} {{carModel}} {{carVariant}}, with downpayment {{dp}} and monthly instalment {{monthlyInstalment}} and would like to speak to you in this regard.",
    },
  },
  verifyKTP: {
    title: "Verify KTP",
    subtitle:
      "We’ll send this to the financing company so that they can verify your identity.",
    useCamera: "Use camera",
    uploadFromGallery: "Upload from gallery",
    supportBy: "Supported by",
  },
  imagePreviewPage: {
    title: "Picture captured",
    subTitle:
      "Select this photo if you think its good enough for quality check",
    use: "Use this photo",
    retake: "Retake photo",
  },
  imageQualityCheckPage: {
    title: "Quality check",
    message: "Scanning your document. Please wait..",
    success: {
      message: "Great! Next we will verify your KTP.",
      cta: "Start e-kyc",
      errorMessage:
        "Sorry, you’ve tried too many times today, please try again tomorrow.",
    },
    fail: {
      message: "Oh no! Please reupload your document again.",
      instruction:
        "Make sure your document is not blurry. You may need to select a" +
        " different camera when taking a picture of your document.",
      close: "Close",
    },
  },
  ekycFailurePage: {
    title: "Thanks for applying",
    message:
      "We are unable to process your application online, but one of our advisors will contact you shortly to help.",
  },
  checkFailurePage: {
    title: "Oops!",
    message:
      "We are unable to process your application. Our team will contact you for further process",
    cta: "Browse other cars",
  },
  bankSelectionPage: {
    confirmYourIncome: "Confirm your income",
    yourEstimatedIncome: "Your estimated income:",
    improveTitle: "Improve your approval chances",
    improveContent: "Securely link your bank account to verify your income",
    bankSectionTitle: "SELECT YOUR PRIMARY BANK TO LINK",
    modalContent:
      "Linking your bank account may take some time to process, please do not refresh the page",
    bankNotListed: "Bank not listed",
    linkFailedErrorMessage:
      "Oops! Bank link failed. Please check and try again.",
    supportedBy: "Supported by",
    confirmButton: "Ok",
  },
  camera: {
    tip: "Position the document within the guide lines and change the camera to get a clear picture.",
    frontCamera: "Front camera",
    backCamera: "Back camera",
    camera: "Camera",
  },
  gallery: {
    cancel: "Cancel",
    choose: "Choose",
    imageTypeError:
      "Sorry, we don’t support the file type yet, please use .jpg, .jpeg or .png picture.",
  },
  logoutModal: {
    title: "Logged out!",
    subtitle:
      "For security reasons you have been logged out. Please log in" +
      " to complete your application",
    submit: "Log in",
  },
  newFunnelLoanRank: {
    loadRank: {
      [NewFunnelLoanRank.Red]: "Difficult loan approval",
      [NewFunnelLoanRank.Yellow]: "Tough loan approval",
      [NewFunnelLoanRank.Green]: "Easy loan approval",
      [NewFunnelLoanRank.Grey]: "Easy loan approval",
    },
    monthlyInstallments: "Monthly instalment (Rp)",
    downPayment: "Downpayment (Rp)",
    tenure: "Tenure",
  },
  newFunnelLoanCalculatorPage: {
    editHeader: {
      summarySection: {
        monthlyIncome: "Monthly income",
        age: "Age",
      },
      fullEditSection: {
        monthlyIncome: "What’s your monthly income?",
        age: "What’s your age?",
        button: "Calculate loan",
      },
      loadingModal: {
        title: "Give us a moment...",
        subtitle: "We’re checking your affordability based on your details.",
      },
      title: "Your chances for approval",
    },
    loanCalculatorButton: "Select this credit option",
    affordableCar: {
      greenRankTitle: "Other cars you might like",
      otherRankTitle: "More affordable alternatives",
      monthlyInstallment: "Monthly instalment",
      downPayment: "DownPayment",
      tenure: "Tenure",
      years: "{{tenure}} years",
    },
    whatApp:
      "Hi, I'm interested in {{carName}} with DP Rp {{dp}}, monthly" +
      " instalment of Rp {{monthly}}, and tenure ",
    disclaimer:
      "The DP shown does not include the first monthly instalment and admin fee.",
  },
  contactUs: {
    haveQuestions: "Have some questions?",
    getInTouch: "Get in touch",
    shareContactDetails:
      "Share your contact details and an advisor will contact you.",
    contactOnWhatsApp: "I’d prefer to be contacted on WhatsApp",
    confirmBtn: "Send details",
  },
  contactUsPage: {
    navbar: {
      home: "Home",
      aboutUs: "About Us",
      find: "Find My Car",
    },
    title: "Get closer with us",
    subtitle:
      "Want to know more about us? Don't bother to contact us. Just put your number and we will contact you.",
    form: {
      name: "Name",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number *",
      message: "Message",
      submit: "Submit",
    },
    placeholder: {
      email: "Put your email",
      phone: "Put your phone number",
      message: "Write your message (optional)",
    },
  },
  banner: {
    title: "1 Free Instalment",
    subtitle1: "If you get pre-approved for your car",
    button: "Find out more",
    subtitle2:
      "Applicable on your 6th month. Get pre-approved by Torq. Valid in selected dealerships only.",
  },
  advisorSection: {
    title: "Speak to an advisor",
    subtitle:
      "Share your contact details to speak directly with one of our friendly advisors.",
    fullName: "Full name",
    number: "0000 0000",
    button: "Send details",
    whatsapp: "Contact me on WhatsApp",
  },
  termsAndConditions: {
    title: "Syarat dan Ketentuan Aplikasi TORQ ",
    lastDatePosted: "Terakhir diperbaharui: 3 Juni 2021 ",
    paraghraphfull: TermsAndConditionsParaghraph,
  },
  privacyPolicy: {
    title: "Kebijakan Privasi Aplikasi TORQ ",
    lastDatePosted: "Terakhir diperbaharui: 3 Juni 2021 ",
    paraghraphfull: PrivacyParaghraph,
  },
  articles: {
    title: "Get the latest information",
    seeAll: "See all articles >",
  },
  variantOptions: {
    calculate: "Calculate credit",
    onlineCredit: "Online credit",
  },
  loanCalculatorWidget: {
    title: "Customise your loan to suit you",
    subtitle:
      "Select your car then use our credit calculator to find an affordable loan.",
    textCarousel: "Supported by",
  },
  previousViewedCar: {
    title: "Previously viewed cars",
    monthlyIntsallment: "Monthly instal.",
    dp: "Downpayment",
    loan: "Loan Tenure",
    years: "5 Years",
  },
  funnelFormPageSeva: {
    findCar: "Find the best deals for new cars",
    funnelForm: {
      carModel: "Car Model",
      monthlyInstallment: "Monthly Installment",
      downPayment: "Down Payment",
    },
    placeholder: "Search car model...",
    noOptionText:
      "Oops, this car model is not found. Please check and try again.",
    searchBy: "Search by",
  },
  brochure: "Download PDF brochure",
  loanCalculatorPageSeva: {
    header: "Customise your loan",
    editSection: {
      header: "Your details",
    },
  },
  carDetailsPageSeva: {
    overviewSection: {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  },
};

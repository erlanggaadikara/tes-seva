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
import {
  cityOptionsIndonesia,
  provinceOptionsIndonesia,
} from "./cityOptions/cityOptions.id";
import { questions } from "pages/QuestionsPage/QuestionList/utils/questionsId.config";
import { TermsAndConditionsParaghraph } from "pages/TermsAndConditions/TermsParaghraphText";
import { PrivacyParaghraph } from "pages/PrivacyPolicy/PrivacyParaghraphText";

export const bahasa: LanguageMap = {
  common: {
    ok: "Oke!",
    cancel: "Membatalkan!",
    recommendationErrorMessage:
      "Maaf, kami mengalami masalah untuk menampilkan hasil kamu. Coba lagi nanti, ya",
    errorMessage: "Oops.. Sepertinya terjadi kesalahan. Coba lagi nanti, ya.",
    tenureAmount: "{{count}} tahun",
    loadingMsg: "Memuat...",
    otpSentError: "Oops.. Sepertinya terjadi kesalahan. Coba lagi nanti, ya.",
    select: "Pilih",
    contactUsMessage: "Mau ngbrol dengan agen kami?",
    contactUs: "Hubungi Kami",
    monthlyInstallments: "Cicilan per bulan",
    downPayment: "DP",
    returnToCarResults: "Kembali ke Hasil Pencarian Mobil",
    save: "Simpan",
    skip: "Lewati",
    deny: "Batal",
    calculateLoan: "Hitung simulasi",
    applyNow: "Lamar sekarang",
    or: "ATAU",
    getPreApproval: "Aplikasi Kredit",
    loveThisCar: "Suka sama mobil ini?",
  },
  loanRankText: {
    easy: "Paling mudah",
    maybeDifficult: "Mungkin sulit",
    difficult: "Paling sulit",
  },
  RpPrice: "Rp {{priceValue}}",
  surveyForm: {
    formControl: {
      back: "Sebelumnya",
      next: "Lanjut",
    },
    formTitle: "Ceritakan tentang diri Anda",
    fields: {
      name: {
        label: "Siapa namamu?",
      },
      gender: {
        label: "Kamu adalah seorang?",
        options: {
          male: "Pria",
          female: "Wanita",
        },
      },
      ageGroup: {
        label: "Halo, berapa umur kamu?",
        placeholderLabel: "Pilih",
        options: {
          [AgeGroup.From18to27]: AgeGroup.From18to27,
          [AgeGroup.From28to34]: AgeGroup.From28to34,
          [AgeGroup.From35to50]: AgeGroup.From35to50,
          [AgeGroup.OlderThan50]: AgeGroup.OlderThan50,
        },
      },
      cashFlow: {
        label:
          "Untuk menentukan budget mobil, sumber pendapatan apa yang ingin kamu perhitungkan?",
        subtitle: "Pilih semua yang sesuai.",
        options: {
          [CashFlow.Salary]: "Gaji bulanan tetap",
          [CashFlow.Earnings]:
            "Usaha sendiri (bisnis, warung, kontrakan, dll.)",
          [CashFlow.Spouse]: "Pendapatan pasangan",
          [CashFlow.Parents]: "Pendapatan orang tua",
          [CashFlow.SubMonthlySalary]: "Gaji bulanan tetap",
          [CashFlow.SubOwnEarnings]:
            "Usaha sendiri (bisnis, warung, kontrakan, dll.)",
        },
      },
      city: {
        label: "Di kota apa kamu tinggal?",
        options: cityOptionsIndonesia,
        placeholder: "Mulai ketik",
        noOptionText: "Oops, kota ini tidak ada di Indonesia. Coba ketik lagi.",
      },
      occupation: {
        label: "Apa pekerjaanmu?",
        placeholderLabel: "Pilih",
        options: {
          [Occupation.DesignerAndArtsProfessional]: "Desainer & Pekerja Seni",
          [Occupation.DoctorAndMedicalWorker]: "Dokter & Tenaga Medis",
          [Occupation.LawProfessional]: "Hukum",
          [Occupation.StayAtHomeMother]: "Ibu Rumah Tangga",
          [Occupation.PrivateCompanyEmployee]: "Karyawan Swasta",
          [Occupation.Other]: "Lainnya",
          [Occupation.GovernmentEmployeePNS]: "Pegawai Negri Sipil (PNS)",
          [Occupation.InformalWorker]: "Pekerja Informal",
          [Occupation.Student]: "Pelajar/Mahasiswa",
          [Occupation.TeacherAndProfessorAndResearcher]: "Pengajar & Peneliti",
          [Occupation.Retiree]: "Pensiunan",
          [Occupation.FarmerAndFishermenAndBreeder]:
            "Petani, Nelayan & Peternak",
          [Occupation.PolicemanAndArmyAndSecurity]: "Polisi, ABRI & Keamanan",
          [Occupation.SelfEmployedAndDistributors]: "Wiraswasta & Distributor",
        },
      },
      education: {
        label: "Apa pendidikan terakhirmu?",
        placeholderLabel: "Pilih",
        options: {
          [Education.PrimarySchool]: Education.PrimarySchool,
          [Education.SecondarySchool]: Education.SecondarySchool,
          [Education.HighSchool]: Education.HighSchool,
          [Education.BachelorsDegree]: Education.BachelorsDegree,
          [Education.MastersDegree]: Education.MastersDegree,
          [Education.DoctoratesDegree]: Education.DoctoratesDegree,
          [Education.VocationalCertificate]: Education.VocationalCertificate,
        },
      },
      seats: {
        label: "Berapa kapasitas penumpang yang kamu inginkan?",
        subtitle: "Pilih semua yang sesuai.",
        options: {
          lessThanOrEqualTo5Seater: "≤ 5 penumpang",
          moreThan5Seater: "> 5 penumpang",
        },
      },
      cashFlowAmount: {
        label:
          "Dari semua sumber pendapatan yang kamu pilih, berapa rata-rata total pendapatan kamu per bulannya?",
        subtitle: "Kamu pilih: ",
        error: "Oops, nominal terlalu rendah, tolong tambahkan nominalnya",
        unit: "Rp",
      },
      downPayment: {
        label: "Berapa jumlah uang muka (DP) yang sudah kamu siapkan?",
        subtitle:
          'DP yang disarankan <TextSmallBold style="font-family:PoppinsBold;">mulai dari 20% harga mobil</TextSmallBold>. Contohnya, untuk mobil seharga Rp. 100 juta, DP yang optimal mulai dari sekitar Rp. 20 juta.',
        error: "Oops, nominal terlalu rendah, tolong tambahkan nominalnya",
        unit: "Rp",
      },
      property: {
        label:
          "Apakah kamu memiliki properti? (rumah, tanah, apartemen, kost, dll.)",
        options: {
          yes: "Ya",
          no: "Tidak",
        },
      },
    },
    loading: {
      message: "Sebentar ya, kami pilihkan mobilnya dulu!",
    },
  },
  landingPage: {
    title: "Cari mobil yang pas dengan budget kamu, tanpa ragu!",
    subtitle:
      "Yuk, isi survei 2 menit ini supaya kami bisa carikan mobil yang paling pas dengan budget kamu.\n" +
      " 🙌",
    forwardButtonText: "Yuk, mulai!",
    legal: {
      beginText: "Dengan mengklik 'Yuk, mulai!', saya menyetujui",
      termsAndConditions: "  Syarat",
      and: " & ",
      privacyPolicy: "Ketentuan serta Kebijakan Privasi",
    },
  },
  colorNotificationModal: {
    title:
      'Dari hasil surveimu, kami telah membuat peringkat <TextSmallBold style="font-family:PoppinsBold;">pengajuan kredit</TextSmallBold>.',
    colorsExplain: {
      green: {
        title: "Paling mudah",
        subtitle: "untuk proses pengajuan kredit",
      },
      yellow: {
        title: "Mungkin sulit",
        subtitle: "untuk proses pengajuan kredit",
      },
      red: {
        title: "Paling sulit",
        subtitle: "untuk proses pengajuan kredit",
      },
    },
    ratingsMeaning: {
      title: "Rating ini berdasarkan:",
      itemFirst:
        'Berapa detilnya <TextSmallBold style="font-family:PoppinsBold;">data yang diperlukan</TextSmallBold> saat proses pengajuan.',
      itemSecond:
        '<TextSmallBold style="font-family:PoppinsBold;">Peluang persetujuanmu</TextSmallBold> berdasarkan data keuangan yang kamu berikan.',
    },
  },
  recommendations: {
    title: "Pilihan mobil",
    message:
      "Dari hasil survei, kami pilihkan mobil yang paling pas sesuai anggaranmu.",
    noGreenMessage:
      "Dari hasil survei kamu, kami menyarankan untuk meningkatkan DP kamu atau menambahkan sumber pendapatan lain yang kamu miliki.",
    priceRange: "Rp {{priceRange}} mio",
    popularityLine1: " orang",
    popularityLine2: "yang mirip dengan profilmu baru beli mobil ini",
    otherOptions: {
      title: "Pilihan mobil lain",
      message:
        "Pilihan mobil berikut memperlukan DP dan angsuran yang lebih tinggi.",
    },
    button: "Edit data keuangaanku",
    contactUs: "Hubungi Kami",
    viewMore: "Lihat Lagi",
  },
  modelDetails: {
    variantSpecifications: {
      [VariantFuelType.Diesel]: VariantFuelType.Diesel,
      [VariantFuelType.Petrol]: VariantFuelType.Petrol,
      [VariantFuelType.Hybrid]: VariantFuelType.Hybrid,
      [VariantTransmissionType.Automatic]: "Matic",
      [VariantTransmissionType.Manual]: VariantTransmissionType.Manual,
      engineCapacity: "{{engineCapacity}} cc",
    },
    viewDetails: "Lihat detail",
    improveNow: "Dapatkan Saran",
  },
  variantDetails: {
    discount: "Harga sebelum diskon (OTR)",
    loanEstimate: "Estimasi Kredit",
    downPayment: "DP (Uang muka)",
    priceUnit: "Rp {{price}}jt",
    priceAmount: "Rp {{price}}",
    installments: "Cicilan Per Bulan",
    instal: "Cicilan Per Bulan",
    tenure: "Tenor",
    instalmentFreeBanner: {
      title: "Gratis cicilan 1x ",
      desc: "Jika kamu mendapatkan pre-approval",
    },
    instalmentFreeModal: {
      title: "Gratis cicilan 1x",
      desc: "Gunakan kalkulator untuk mengatur pinjaman kamu, lalu ajukan kredit instan dan dapatkan gratis cicilan 1 bulan",
      tc: "Syarat & Ketentuan",
      rule1: "Dapat digunakan untuk cicilan bulan ke-6",
      rule2: "Dapatkan pre-approval oleh Torq",
      rule3: "Berlaku hanya pada dealer tertentu",
      applyNow: "Ajukan Sekarang",
      pickACar: "Pilih Mobil",
    },
    estimatesDes: "Estimasi hitungan menurut leasing TAF/ACC.",
    insuranceDes:
      "Biaya per bulan sudah termasuk pembayaran asuransi rata-rata.",
    feesDes: "Biaya lainnya belum termasuk.",
    specifications: "Spesifikasi",
    variantSpecifications: {
      bodyType: "Tipe Bodi",
      fuel: "Bahan bakar",
      transmission: "Transmisi",
      engineCapacity: "Kapasitas mesin",
      engineAmount: "{{amount}}cc",
      carSeats: "Jumlah Penumpang",
      carSeatsAmount: "{{amount}} penumpang",
      length: "Dimensi (panjang)",
      lengthAmount: "{{amount}}m",
      brochure: "Lihat brosur",
    },
    description: "Deskripsi",
    confirmAgent: "Konfirmasi dengan agen kami",
    loanConfiguration: "Ubah skema pembiayaan",
    loanApplyMessage: "untuk proses pengajuan kredit",
    variantBodyType: {
      [VariantBodyType.MPV]: "MPV",
      [VariantBodyType.SUV]: "SUV",
      [VariantBodyType.Commercial]: "Komersial",
      [VariantBodyType.Hatchback]: "Hatchback",
      [VariantBodyType.Sedan]: "Sedan",
      [VariantBodyType.Sport]: "Sport",
    },
    variantFuelType: {
      [VariantFuelType.Hybrid]: VariantFuelType.Hybrid,
      [VariantFuelType.Petrol]: VariantFuelType.Petrol,
      [VariantFuelType.Diesel]: VariantFuelType.Diesel,
    },
    variantTransmissionType: {
      [VariantTransmissionType.Manual]: VariantTransmissionType.Manual,
      [VariantTransmissionType.Automatic]: "Matic",
    },
    reevaluatedMsg: "Hasil pinjaman kamu telah dievaluasi ulang",
  },
  loanRankIndicator: {
    loanRank: {
      [LoanRank.Green]: "Paling mudah",
      [LoanRank.Yellow]: "Mungkin sulit",
      [LoanRank.Red]: "Paling sulit",
    },
    loanApplyMessage: "untuk proses pengajuan kredit",
  },
  loanCalculatorPage: {
    calculateResult: {
      monthlyInstallments: "Cicilan Per Bulan",
      loanRating: "Tingkat pengajuan",
    },
    selectTheLoan: "Pilih skema pembiayaan ini",
    addMoreIncome: "Tambah sumber pendapatan lain",
    pageTitleSection: {
      [LoanRank.Green]: {
        title:
          "Skema pembiayaanmu sudah cocok. Apakah masih ada yang ingin kamu ubah?",
        description:
          "Kamu bisa mengubah tenor dan DP, tapi pastikan tingkat pengajuanmu tetap hijau!",
        instruction: "Ganti DP dan tenor kamu di bawah:",
      },
      [LoanRank.Yellow]: {
        title:
          "Oops! Pilihan ini mungking sulit untuk proses pengajuan. Kami bisa membantumu.",
        description:
          "Coba tingkatkan DP atau tenor kamu agar angsuranmu menjadi lebih ringan.",
        instruction: "Ganti DP kamu di bawah:",
      },
      [LoanRank.Red]: {
        title:
          "Oops! Pilihan ini paling sulit untuk proses pengajuan kamu. Yuk, kami bantu.",
        description:
          "Coba tingkatkan DP atau tenor kamu agar angsuranmu menjadi lebih ringan.",
        instruction: "Ganti DP kamu di bawah:",
      },
    },
    loadingPage: {
      title:
        "Jangan segarkan halaman ini, ya! Kami sedang memuat opsi pinjaman untuk kamu.",
    },
  },
  scheduleAppointmentPage: {
    congrats: "Selamat! 🎉",
    form: {
      title:
        "Silahkan masukan informasi kontakmu dan sebentar lagi kamu bisa mendapatkan mobil impianmu!",
      purchaseTime: {
        label: "Kapan kamu berencana untuk membeli mobil ini?",
        placeholder: "Pilih",
        options: {
          [PurchaseTime.Within2Weeks]: "Dalam 2 minggu",
          [PurchaseTime.Within1Month]: "Dalam 1 bulan",
          [PurchaseTime.Within2Months]: "Dalam 2 bulan",
          [PurchaseTime.InOver2Months]: "Lebih dari 2 bulan ",
        },
      },
      contactTime: {
        label: "Kapan waktu terbaik untuk menghubungi kamu?",
        placeholder: "Pilih",
        options: {
          [ContactTime.Morning]: "Pagi",
          [ContactTime.Afternoon]: "Siang",
          [ContactTime.Evening]: "Sore",
        },
      },
      number: {
        label: "Tulis nomor telepon kamu",
      },
      submit: "Diskusi dengan agen kami",
    },
    loading: {
      message:
        "Jangan refresh halaman ini! Kami lagi booking waktu dengan tim agen.",
    },
  },
  loginPage: {
    title: "Masukan nomor handphone Kamu",
    subtitle: "Kami akan mengirimkan kode konfirmasi untuk kamu.",
    submit: "Selanjutnya",
    legal: {
      beginText: "Dengan memasukan nomor telpon, Kamu sudah menyetujui",
      termsAndConditions: "  Syarat dan Ketentuan",
      and: " serta ",
      privacyPolicy: "Kebijakan Privasi",
    },
  },
  otpPage: {
    toastMsg: "OTP telah dikirimkan ke nomor telpon kamu",
    title: "Masukan kode yang terkirim di nomor telpon kamu",
    message: "Kami kirimkan ke {{phoneNumber}}",
    errorText: "Kode salah",
    resendText: "Kirim ulang",
    resendCountdown: "Kirim ulang dalam: ",
    submit: "Ajukan",
    error: {
      otp: "Maaf. Kami mengalami kesulitan untuk verifikasi OTP kamu. Silahkan coba lagi nanti ya.",
      customerInfo: "oops.. Tunggu sebentar ya. Coba lagi dalam 2 menit.",
      tooManyOtpSend: "oops.. Tunggu sebentar ya. Coba lagi dalam 2 menit.",
    },
  },
  appDownloadPage: {
    carModelDetail: {
      title: "Bagaimana cara mendapatkan mobil dengan Torq?",
      step1:
        "Isi survei <LinkLabelMediumSemiBold" +
        ' style="font-family:PoppinsBold;color:#053565">2 menit</LinkLabelMediumSemiBold> kami',
      step2:
        "Lihat opsi <LinkLabelMediumSemiBold" +
        ' style="font-family:PoppinsBold;color:#053565">pinjaman terbaik</LinkLabelMediumSemiBold> untuk mobil impian kamu',
      step3:
        "Ngobrol langsung dengan <LinkLabelMediumSemiBold" +
        ' style="font-family:PoppinsBold;color:#053565">agen khusus</LinkLabelMediumSemiBold> kami tentang pilihan mobil dan pinjaman kamu',
    },
    pageTitle: "Terima kasih, {{userName}}!",
    description:
      "Agen resmi dari Torq akan menghubungi kamu untuk melanjutkan proses penawaran dan pengajuan mobil.",
    downloadTitle: "Mau dapetin gratis 1x cicilan?",
    downloadTip:
      "*Google Play dan logo Google Play merupakan merek dagang Google LLC.",
    documentsDesc: {
      itemOne:
        "Unggah dokumen untuk pengajuan kredit kamu lewat aplikasi Torq dalam waktu 48 jam",
      itemTwo: "Dapatkan kredit dari salah satu perusahaan leasing kami",
      itemThree: "Dapatkan cashback setelah pembayaran cicilan ke 6 kamu",
    },
    cashBackTip:
      "*Cashback maksimal Rp 3 juta atau sejumlah pembayaran cicilan bulanan kamu (jumlah cicilan terendah), dibayarkan dengan menambahkan saldo ke dompet AstraPaymu",
    retake: "Isi ulang survei",
  },
  loadingPage: {
    title:
      "Jangan perbaharui halaman ini! Kami sedang menyiapkan hasil untuk kamu.",
  },
  questionsPage: {
    questionList: questions,
    title: "Ada yang bisa kami bantu?",
  },
  funnelFormPage: {
    channels: {
      [AdVariation.FindACar]: {
        caption: "Bagaimana kamu ingin memulai pencarian mobilmu?",
        cta: "Cari mobil",
      },
      [AdVariation.FindALoan]: {
        caption: "Temukan kredit mobil terbaik secara online",
        cta: "Lihat rincian",
      },
      [AdVariation.FindAPromo]: {
        caption: "Temukan promo terbaik mobil baru secara online",
        cta: "Cari Promo",
      },
      [AdVariation.Concierge]: {
        caption:
          "Temukan harga terbaik untuk mobil baru - urus beli mobil jadi mudah dengan Torq",
        cta: "Cari Promo Mobil",
      },
    },
    funnelForm: {
      subtitle: "Semua pilihan opsional",
      monthlyInstallment: "Cicilan per bulan",
      downPayment: "DP",
      searchBy: "Cari berdasarkan:",
      maxDpLabel: "Masukan jumlah DP maksimal yang kamu inginkan:",
      monthlyInstallmentLabel: "Masukan jumlah cicilan maksimal perbulan:",
      phoneNumberLabel:
        'Tinggalkan nomor ponsel yang dapat kami hubungi <TextXSmallMedium style="font-family:Poppins; color:#9EA3AC">(opsional)</TextXSmallMedium>',
      buttonAboveLabel: {
        [PaymentType.MonthlyInstallment]:
          "Cicilan perbulan berdasarkan jangka waktu 60 bulan dan DP sebesar" +
          " 20%",
        [PaymentType.DownPayment]: "DP berdsasarkan tenor kredit 60 bulan",
      },
      advancedSearch: "Penelusuran lanjutan",
      supportBy: "Didukung oleh",
    },
  },
  homePageSearch: {
    form: {
      title: "Temukan promo dan penawaran sekarang",
      searchBy: "Cari berdasarkan:",
      maxDpLabel: "Masukan jumlah DP maksimal yang kamu inginkan:",
      monthlyInstallmentLabel: "Masukan jumlah cicilan maksimal perbulan:",
      buttonAboveLabel: {
        [PaymentType.MonthlyInstallment]:
          "Cicilan per bulan berdasarkan tenor kredit 60 bulan dan DP sebesar 20%",
        [PaymentType.DownPayment]: "Uang muka berdasarkan hitungan 60 bulan",
      },
      supportBy: "Didukung oleh",
      cta: "Temukan Mobilku",
    },
    whatsappMsg: "Halo, saya tertarik untuk membeli mobil dari Torq",
    browseByBrand: {
      text: "Cari berdasarkan brand yang tersedia",
    },
    carBodyType: {
      title: "Cari berdasarkan Tipe Body:",
    },
    survey: {
      title: "Mobil sesuai budget kamu",
      desc: "Isi survei singkat untuk temukan mobil yang cocok dengan budget kamu",
      cta: "Isi survei",
    },
    promotion: {
      title: "Promo dan penawaran lainnya",
    },
    advisor: {
      title: "Ngobrol langsung dengan agen kami",
      fullName: "Nama lengkap",
      desc: "Tuliskan nama dan nomor ponsel kamu untuk berbicara dengan agen kami.",
      cta: "Ini Kontakku Ya!",
      thanksTitle: "Terima kasih 🙌",
      thanksDesc:
        "Agen kami akan segera menghubungi kamu di nomor telpon yang kamu sediakan",
      alertButton: "Ok",
    },
    walkingThrough: {
      cta: "Temukan mobil Lainnya",
      findCar: {
        title: "Temukan mobil kamu dan dapatkan kreditnya bersama Torq",
        desc: "Cari berdasarkan brand paling populer",
      },
      survey: {
        title: "Temukan pilihan kredit yang paling terjangkau",
        desc: "Ikuti survei 2 menit untuk lihat kredit yang paling terjangkau",
      },
    },
    popularCars: {
      title: "Mobil populer di Torq",
      browseMoreCars: "Cari Mobil Lain",
    },
  },
  carResultsPage: {
    title:
      '<H2MediumBold style="font-family:PoppinsBold;">Cari</H2MediumBold> Mobil',
    placeholder: "Cari Mobil",
    message:
      "*Cicilan per bulan berdasarkan tenor kredit 60 bulan dan DP sebesar 20%",
    monthly: "Cicilan per bulan",
    dp: "DP",
    priceRange: "Rp {{priceRange}} jt",
    tenure: "5 tahun",
    contactUs: "Hubungi kami",
    viewDetails: "Lihat Detail",
    questionTitle: "Punya Pertanyaan?",
    questionSubtitle: "Tanyakan pada penasihat kami yang dapat membantu anda",
    surveyTitle: "Mobil sesuai budget kamu",
    surveySubtitle:
      "Isi survei singkat untuk temukan mobil yang cocok dengan budget kamu",
    surveyButton: "Isi Survey",
    whatsappMessage:
      "Halo, saya tertarik dengan mobil {{carName}} dengan DP sebesar" +
      " Rp {{dpRange}} jt dan cicilan per bulannya Rp {{monthlyRange}} jt.",
    buttonMessage: "Yuk cari tahu kredit apa yang cocok buat kamu",
    button: "Isi survey singkat",
    notFound: "Kami tidak dapat menemukan apapun..",
    notFoundDesc:
      "Silahkan cari lagi atau atur ulang filter untuk menampilkan lebih banyak pilihan mobil",
    notFoundButton: "Cari Semua Mobil",
    filterModal: {
      header: "Filter",
      reset: "Ulang filter",
      monthlyTitle: "Maksimum Cicilan Per Bulan",
      monthlySubtitle: "Pilih cicilan per bulan yang cocok untukmu",
      downpaymentTitle: "DP",
      downpaymentSubtitle: "Pilih DP yang cocok untukmu",
      amount: "Jumlah",
      amountText: "Pilih DP maksimum yang sesuai buat kamu",
      percentage: "%",
      percentageText: "Pilih besaran DP yang sesuai buat kamu",
      brand: "Brand",
      button: "Tampilkan hasil",
      body: "Body",
      category: "Kategori",
      priceRange: "Rentang harga",
    },
  },
  carResultPageSeva: {
    totalResult:
      '<H2MediumBold style="font-family:PoppinsBold;">{{total}} brand mobil baru</H2MediumBold>',
    sortBy: {
      title: "Sortir",
      price: "Harga",
      highToLow: "Tinggi ke rendah",
      lowToHigh: "Rendah ke tinggi",
    },
    freeInstallment: {
      title: "Gratis cicilian 1x",
      subtitle: "Jika telah melakukan pre-approval",
      button: "Temukan mobil lainnya",
    },
  },
  funnelBackground: {
    [FunnelItemStepAction.SurveyContent]: {
      step: "01.",
      title: "Isi Survei",
      subtitle:
        "Kamu hanya perlu isi survei singkat tentang dirimu dan keuanganmu. Kami bantu carikan mobil terbaik untukmu.",
      buttonTitle: "Isi Sekarang",
    },
    [FunnelItemStepAction.PickCar]: {
      step: "02.",
      title: "Pilih Mobil dan Kredit",
      subtitle:
        "Kami akan memberikan rekomendasi kredit yang paling cocok dengan profil kamu. Tunggu apalagi, yuk dapatkan mobil impianmu sekarang!",
      buttonTitle: "Dapatkan mobilmu",
    },
    [FunnelItemStepAction.TalkToAgents]: {
      step: "03.",
      title: "Diskusi dengan Agen Kami",
      subtitle:
        "Kamu bisa berdiskusi langsung dengan agen kami tentang mobil dan kredit yang kamu inginkan.",
      buttonTitle: "Mulai Sekarang",
    },
    [FunnelItemStepAction.TrackProgress]: {
      step: "04.",
      title: "Kirim & Lacak Proses",
      subtitle:
        "Kamu bisa mengunggah dokumen yang diperlukan secara online dan pantau setiap proses pengajuan kreditmu",
    },
    link: {
      termsAndConditions: "Syarat & ketentuan",
      privacyPolicy: "Kebijakan privasi",
      contactUs: "Hubungi kami",
    },
  },
  carVariantsModal: {
    calculateTitle: "Mau coba kalkulator kredit Torq?",
    customizeTitle: "Mau atur kredit kamu?",
    content: "Isi suvei singkat kami untuk mengatur kredit sesuai budget kamu",
    cancelButton: "Nanti saja",
    okButton: "Mulai survei",
    description: "*gratis, tanpa komitmen",
  },
  shareModal: {
    title: "Bagikan",
  },
  overviewCarVariant: {
    title: "Gambaran Singkat",
    calculateCredit: "Hitung Kredit",
    onlineCredit: "Aplikasi Kredit",
  },
  galeryCarVariant: {
    title: "Galeri",
    interior: "Interior",
    exterior: "Eksterior",
  },
  newFunnelVariantDetailsPage: {
    customizeLoan: "Sesuaikan kredit",
    contactUsMessage: "Mau ngobrol langsung dengan agen kami?",
    contactUs: "Ngobrol dengan Agen Kami",
    whatsappMessage:
      "Halo, saya tertarik dengan mobil {{carName}} dengan DP sebesar" +
      " Rp {{dp}} dan cicilan per bulannya Rp {{monthly}}.",
    calculateLoanMessage:
      "Pakai kalkulator kredit buat lihat mobil mana yang cocok dengan budget kamu.",
    getPreApprovalMessage:
      "Yuk lihat kesempatan kamu untuk mendapatkan pre-approval kredit.",
  },
  variantListPage: {
    calculateLoan: "Hitung simulasi",
    whatsappMessage:
      "Halo, saya tertarik dengan mobil {{carName}} dengan DP sebesar" +
      " Rp {{dpRange}} jt dan cicilan per bulannya Rp {{monthlyRange}} jt.",
    badgeTitle: "Suka sama mobil ini?",
    badgeMessage:
      "Yuk coba pakai kalkulator kredit untuk model-model berikut untuk cek keterjangkauan kamu.",
  },
  preApprovalStartPage: {
    title: "Yuk mulai!",
    subtitle:
      "Jawab beberapa pertanyaan ini untuk temukan kesempatan persetujuan kredit kamu",
    submit: "Ok",
  },
  preApprovalQuestionFlow: {
    submit: "Lanjut",
    [SurveyFormKey.TotalIncome]: {
      title: "Berapa estimasi pendapatan per bulan kamu?",
      placeholder: "8.500.000",
    },
    [PreApprovalQuestionsKey.Address]: {
      title: "Di mana alamat rumah kamu?",
      [PreApprovalQuestionsAddressKey.Province]: {
        title: "Provinsi",
        placeholder: "Cari Provinsi",
        options: provinceOptionsIndonesia,
        noOptionText:
          "Oops.. Provinsi ini tidak tersedia nih di Indonesia. Cek dan coba lagi ya!",
      },
      [PreApprovalQuestionsAddressKey.City]: {
        title: "Kota",
        placeholder: "Cari Kota",
        noOptionText:
          "Oops.. Kota tidak tersedia nih di Provinsi ini. Cek dan coba lagi ya!",
      },
      [PreApprovalQuestionsAddressKey.ZipCode]: {
        title: `Kode Pos <span style="font-family: PoppinsSemiBold;font-size: 14px;color:#9EA3AC">(Opsional)</span>`,
        placeholder: "Contoh: 15221",
        errorMessage: "Tolong input kode pos yang sesuai ya",
      },
    },
    [PreApprovalQuestionsKey.Email]: {
      title: "Apa alamat email kamu?",
      placeholder: "Contoh: jon.doe@ymail.com",
    },
  },
  preApprovalIntroModal: {
    title: "Dapatkan Aplikasi Kredit",
    subtitle: "Cukup dengan 4 cara mudah dan aman ",
    steps: [
      { label: "Verifikasi nomor ponsel" },
      { label: "Lengkapi informasimu" },
      { label: "Foto KTP" },
      { label: "Verifikasi pendapatan kamu" },
    ],
    secureInfoTitle: "Aman",
    secureInfoDesc:
      "Semua informasi yang kamu bagikan dienkripsi dan dijaga kerahasiaannya.",
    positiveButton: "Yuk Mulai! ",
  },
  preApprovalProgress: {
    title: "Kredit Instan",
    calcRequestPage: {
      title: "Hampir selesai...",
      desc: "Cek lagi data-data kamu dan ajukan untuk lihat kesempatanmu mendapatkan persetujuan kredit",
      process: {
        title: "Pre-Approval",
        phoneNo: "Verifikasi nomor ponsel",
        share: "Lengkapi informasimu",
        ktp: "Foto dan Verifikasi KTP",
        income: "Verifikasi pendapatan kamu",
      },
      cta: "Ajukan untuk lihat hasil",
    },
    sms: {
      title: "Sedang mengirimkan SMS",
      desc: "Kami sedang menghitung hasil kamu dan akan memakan waktu beberapa menit. Kami akan mengirim hasilnya melalui SMS ke nomor yang sudah terdaftar",
      downloadBtn: "Download sekarang",
      downloadTitle: "Siap buat beli mobil kamu?",
      downloadDesc:
        "Yuk mulai pengajuan kredit kamu sekarang dengan mendownload aplikasi Torq",
      uploadDocuments: "Unggah dokumen",
    },
    confirm: {
      title: "Pre-Approval kamu disetujui!",
      next: {
        title: "Tahap selanjutnya kamu bisa mulai:",
        preApproved: "Dapatkan Pre-Approval",
        download: "Download aplikasi Torq",
        fillApp: "Isi pengajuan kredit",
        upload: "Unggah dokumen yang dibutuhkan",
        track: "Lacak status kredit kamu",
      },
      carInfo: {
        title: "Rincian Mobil & Kredit",
        loanText: "ESTIMASI KREDIT",
        priceDesc: "Harga sebelum diskon (OTR)",
      },
      loanInfo: {
        title: "ESTIMASI KREDIT",
      },
      tafText1:
        "Semua rincian ini diestimasikan untuk perusahaan leasing TAF/ACC.",
      tafText2: "Biaya per bulan termasuk rata-rata pembayaran asuransi.",
      tafText3: "Biaya lain belum termasuk.",
      startBtn: "Mulai Pengajuan",
      chatBtn: "Ngobrol dengan Agen",
      whatsAppMessage:
        "Hallo, Pre-approval saya sudah disetujui untuk {{carBrand}} {{carModel}} {{carVariant}}, dengan DP {{dp}} dan cicilan {{monthlyInstalment}} dan saya ingin ngobrol lebih lanjut terkait permohonan saya ini.",
    },
  },
  verifyKTP: {
    title: "Verifikasi KTP",
    subtitle:
      "Kami akan kirimkan data ini supaya kami bisa memverifikasi identitas kamu",
    useCamera: "Gunakan Kamera",
    uploadFromGallery: "Unggah dari Galeri",
    supportBy: "Didukung oleh",
  },
  imagePreviewPage: {
    title: "Gambar berhasil diambil",
    subTitle: "Gunakan foto ini jika kamu merasa kualitas gambar sudah baik",
    use: "Gunakan foto ini",
    retake: "Foto ulang",
  },
  imageQualityCheckPage: {
    title: "Pemeriksaan kualitas",
    message: "Tunggu sebentar, dokumen kamu sedang diproses",
    success: {
      message: "Hore! selanjutnya kami akan verifikasi KTP kamu",
      cta: "Mulai verifikasi KTP",
      errorMessage:
        "Maaf, sepertinya kamu sudah mencoba terlalu sering hari ini. Coba lagi besok ya!",
    },
    fail: {
      message: "Oops! Tolong unggah ulang dokumen kamu",
      instruction:
        "Pastikan dokumen kamu tidak buram, ya! Kamu mungkin perlu memilih" +
        " kamera yang berbeda saat mengambil gambar untuk dokumenmu.",
      close: "Tutup",
    },
  },
  ekycFailurePage: {
    title: "Terima kasih sudah mendaftar!",
    message:
      "Kami belum bisa lanjutin proses pengajuan kamu nih. Tapi jangan khawatir, agen kami bakalan segera hubungi kamu untuk proses selanjutnya.",
  },
  checkFailurePage: {
    title: "Oops!",
    message:
      "Kami belum bisa melanjutkan proses pengajuan kamu. Tapi jangan khawatir, agen kami akan segera menghubungi kamu untuk proses selanjutnya",
    cta: "Cari mobil lain",
  },
  bankSelectionPage: {
    confirmYourIncome: "Konfirmasi Pendapatan Kamu",
    yourEstimatedIncome: "Estimasi pendapatan kamu:",
    improveTitle: "Yuk tingkatkan peluang persetujuan kreditmu!",
    improveContent:
      "Hubungkan rekening bank kamu secara aman untuk verifikasi pendapatan",
    bankSectionTitle: "PILIH BANK UTAMA KAMU:",
    modalContent:
      "Menghubungkan rekening bank kamu mungkin agak sedikit lama, halaman ini jangan direfresh ya!",
    bankNotListed: "Bank tidak terdaftar",
    linkFailedErrorMessage:
      "Oops! gagal menghubungkan bank. Cek dan coba lagi ya",
    supportedBy: "Didukung oleh",
    confirmButton: "Ok",
  },
  camera: {
    tip: "Posisikan dokumen kamu sesuai garis atau ganti posisi kamera untuk kualitas gambar yang lebih jelas",
    frontCamera: "Kamera Depan",
    backCamera: "Kamera Belakang",
    camera: "Kamera",
  },
  gallery: {
    cancel: "Batal",
    choose: "Pilih",
    imageTypeError:
      "Maaf, kami belum mendukung tipe file ini. Coba pakai tipe gambar .jpg, .jpeg, atau .png ya",
  },
  logoutModal: {
    title: "Kamu keluar dari akunmu...",
    subtitle:
      "Karena alasan keamanan kamu terpaksa keluar.. Coba masuk lagi untuk bisa melengkapi proses pengajuan kamu",
    submit: "Masuk",
  },
  newFunnelLoanRank: {
    loadRank: {
      [NewFunnelLoanRank.Red]: "Pengajuan kredit sulit",
      [NewFunnelLoanRank.Yellow]: "Pengajuan kredit Berat",
      [NewFunnelLoanRank.Green]: "Pengajuan kredit mudah",
      [NewFunnelLoanRank.Grey]: "Pengajuan kredit mudah",
    },
    monthlyInstallments: "Cicilan Per Bulan (Rp)",
    downPayment: "DP (Rp)",
    tenure: "Tenor",
  },
  newFunnelLoanCalculatorPage: {
    editHeader: {
      summarySection: {
        monthlyIncome: "Pendapatan per bulan",
        age: "Umur",
      },
      fullEditSection: {
        monthlyIncome: "Berapa pendapatan per bulan kamu?",
        age: "Berapa umurmu?",
        button: "Hitung Simulasi",
      },
      loadingModal: {
        title: "Tunggu sebentar ya!",
        subtitle: "Kami lagi cek kemampuan kredit yang cocok sama data kamu.",
      },
      title: "Peluang untuk pengajuanmu",
    },
    loanCalculatorButton: "Pilih opsi kredit ini",
    affordableCar: {
      greenRankTitle: "Mobil lain yang mungkin kamu suka",
      otherRankTitle: "Alternatif yang lebih terjangkau",
      monthlyInstallment: "Cicilan Per Bulan",
      downPayment: "DP",
      tenure: "Tenor",
      years: "{{tenure}} tahun",
    },
    whatApp:
      "Halo, saya tertarik dengan {{carName}} dengan DP sebesar Rp {{dp}}," +
      " cicilan per bulannya Rp {{monthly}}, dan tenor ",
    disclaimer:
      "DP di atas belum termasuk angsuran bulan pertama dan biaya admin.",
  },
  contactUs: {
    haveQuestions: "Punya beberapa pertanyaan?",
    getInTouch: "Ngobrol Langsung",
    shareContactDetails:
      "Tulis rincian kontakmu supaya agen kami bisa segera menghubungi kamu.",
    contactOnWhatsApp: "Saya memilih untuk dihubungi via WhatsApp",
    confirmBtn: "Kirim Rincian",
  },
  contactUsPage: {
    navbar: {
      home: "Beranda",
      aboutUs: "Tentang Kami",
      find: "Cari Mobil Kamu",
    },
    title: "Lebih dekat dengan kami",
    subtitle:
      "Ingin tahu lebih jelas tentang layanan kami? Jangan ragu untuk langsung menghubungi kami. Cukup dengan masukkan nomor telepon dan kami akan segera menghubungi kamu.",
    form: {
      name: "Nama",
      firstName: "Nama Awal",
      lastName: "Nama Akhir",
      email: "Email",
      phone: "Nomor Telepon *",
      message: "Pesan",
      submit: "Kirim",
    },
    placeholder: {
      email: "Masukkan email kamu",
      phone: "Nomor telepon kamu",
      message: "Tulis pesanmu (optional)",
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
    title: "Ngobrol langsung dengan agen kami",
    subtitle:
      "Tulis rincian kontakmu supaya agen kami bisa segera menghubungi kamu.",
    fullName: "Nama Lengkap",
    number: "0000 0000",
    button: "Kirim Rincian",
    whatsapp: "Saya memilih untuk dihubungi via WhatsApp",
    contactUsPage: {
      navbar: {
        home: "Beranda",
        aboutUs: "Tentang Kami",
        find: "Cari Mobil Kamu",
      },
    },
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
    findCar: "Temukan penawaran terbaik untuk mobil baru",
    funnelForm: {
      carModel: "Model Mobil",
      monthlyInstallment: "Cicilan per bulan",
      downPayment: "Dp",
    },
    placeholder: "Cari Model Mobil...",
    noOptionText:
      "Oops.. Model mobil ini tidak tersedia nih. Cek dan coba lagi ya!",
    searchBy: "Pencarian berdasarkan",
  },
  brochure: "Download PDF brosur",
  loanCalculatorPageSeva: {
    header: "Sesuaikan pinjaman Anda",
    editSection: {
      header: "Detail Anda",
    },
  },
  carDetailsPageSeva: {
    overviewSection: {
      overview: "Overview",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  },
};

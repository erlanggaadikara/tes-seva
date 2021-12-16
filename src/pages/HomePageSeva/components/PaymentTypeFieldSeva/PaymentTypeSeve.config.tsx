import React from "react";
import { PaymentType } from "models/models";
import { MonthlyInstallment } from "components/icon/MonthlyInstallment/MonthlyInstallment";
import { DownPayment } from "components/icon/DownPayment/DownPayment";
import { OptionProps } from "components/form/SecondaryRadioButton/SecondaryRadioButton";
import { colors } from "styles/colors";
import { CarModelLogo } from "components/icon/CarModel/CarModel";

type PaymentOptionProps = OptionProps<PaymentType>;

interface PaymentTypeConfig {
  options: PaymentOptionProps[];
}

export const paymentTypeConfig: PaymentTypeConfig = {
  options: [
    {
      optionValue: PaymentType.CarModel,
      selectedPrefixIcon: <CarModelLogo color={colors.primary3} />,
      unselectedPrefixIcon: <CarModelLogo color={colors.placeholder} />,
      label: "funnelFormPageSeva.funnelForm.carModel",
      isSelected: false,
    },
    {
      optionValue: PaymentType.DownPayment,
      selectedPrefixIcon: <DownPayment color={colors.primary3} />,
      unselectedPrefixIcon: <DownPayment color={colors.placeholder} />,
      label: "funnelFormPageSeva.funnelForm.downPayment",
      isSelected: false,
    },
    {
      optionValue: PaymentType.MonthlyInstallment,
      selectedPrefixIcon: <MonthlyInstallment color={colors.primary3} />,
      unselectedPrefixIcon: <MonthlyInstallment color={colors.placeholder} />,
      label: "funnelFormPageSeva.funnelForm.monthlyInstallment",
      isSelected: false,
    },
  ],
};

export const paymentTypeConfigMobile = [
  {
    value: "carModel",
    selectedPrefixIcon: <CarModelLogo color={colors.primary3} />,
    unselectedPrefixIcon: <CarModelLogo color={colors.placeholder} />,
    label: "Car Model",
    isSelected: false,
  },
  {
    value: "downPayment",
    selectedPrefixIcon: <DownPayment color={colors.primary3} />,
    unselectedPrefixIcon: <DownPayment color={colors.placeholder} />,
    label: "Down Payment",
    isSelected: false,
  },
  {
    value: "monthlyInstallment",
    selectedPrefixIcon: <MonthlyInstallment color={colors.primary3} />,
    unselectedPrefixIcon: <MonthlyInstallment color={colors.placeholder} />,
    label: "Monthly Installment",
    isSelected: false,
  },
];

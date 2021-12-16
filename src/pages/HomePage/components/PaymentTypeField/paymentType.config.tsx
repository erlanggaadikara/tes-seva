import React from "react";
import { PaymentType } from "models/models";
import { MonthlyInstallment } from "components/icon/MonthlyInstallment/MonthlyInstallment";
import { DownPayment } from "components/icon/DownPayment/DownPayment";
import { OptionProps } from "components/form/SecondaryRadioButton/SecondaryRadioButton";
import { colors } from "styles/colors";

type PaymentOptionProps = OptionProps<PaymentType>;

interface PaymentTypeConfig {
  options: PaymentOptionProps[];
}

export const paymentTypeConfig: PaymentTypeConfig = {
  options: [
    {
      optionValue: PaymentType.DownPayment,
      selectedPrefixIcon: <DownPayment color={colors.primary1} />,
      unselectedPrefixIcon: <DownPayment color={colors.placeholder} />,
      label: "funnelFormPage.funnelForm.downPayment",
      isSelected: false,
    },
    {
      optionValue: PaymentType.MonthlyInstallment,
      selectedPrefixIcon: <MonthlyInstallment color={colors.primary1} />,
      unselectedPrefixIcon: <MonthlyInstallment color={colors.placeholder} />,
      label: "funnelFormPage.funnelForm.monthlyInstallment",
      isSelected: false,
    },
  ],
};

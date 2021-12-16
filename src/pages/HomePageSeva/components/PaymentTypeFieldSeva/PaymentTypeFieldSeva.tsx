import React from "react";
import { FormControlValue } from "types/types";
import { FunnelQueryKey, PaymentType } from "models/models";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { paymentTypeConfig } from "./PaymentTypeSeve.config";
import { SecondaryRadioButton } from "components/form/SecondaryRadioButtonSeva/SecondaryRadioButton";

export const PaymentTypeFieldSeva = () => {
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const handleOnChange = (optionValue: FormControlValue) => {
    console.log(optionValue);
    patchFunnelQuery({
      [FunnelQueryKey.PaymentType]: optionValue,
    });
    if (optionValue === PaymentType.DownPayment) {
      patchFunnelQuery({ [FunnelQueryKey.MonthlyInstallment]: "" });
    } else {
      patchFunnelQuery({ [FunnelQueryKey.DownPaymentAmount]: "" });
    }
  };
  return (
    <SecondaryRadioButton
      value={funnelQuery.paymentType}
      options={paymentTypeConfig.options}
      name={"paymentType"}
      onChoose={handleOnChange}
    />
  );
};

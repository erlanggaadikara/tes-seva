import React, { useEffect } from "react";
import { AddressFormCity } from "./AddressFormCity/AddressFormCity";
import { AddressFormProvince } from "./AddressFormProvince/AddressFormProvince";
import { AddressFormZipCode } from "./AddressFormZipCode/AddressFormZipCode";
import { FormLabel } from "component/FormLabel/FormLabel";
import { useTranslation } from "react-i18next";
import {
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
} from "models/models";
import { QuestionFlowFormProps } from "types/types";
import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";

export const QuestionFlowAddress = ({
  handleDisabled,
}: QuestionFlowFormProps) => {
  const { t } = useTranslation();
  const { questionFlowForm } = useQuestionFlowForm();

  useEffect(() => {
    const {
      [PreApprovalQuestionsAddressKey.Province]: {
        isDataValid: isProvinceValid,
      },
      [PreApprovalQuestionsAddressKey.City]: { isDataValid: isCityValid },
      [PreApprovalQuestionsAddressKey.ZipCode]: {
        value: zipCode,
        isDataValid: isZipCodeValid,
      },
    } = questionFlowForm;
    const isZipStringValid = zipCode ? isZipCodeValid : true;
    handleDisabled &&
      handleDisabled(!(isProvinceValid && isCityValid && isZipStringValid));
  }, [questionFlowForm]);

  return (
    <>
      <FormLabel>
        {t(`preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.title`)}
      </FormLabel>
      <AddressFormProvince />
      <AddressFormCity />
      <AddressFormZipCode />
    </>
  );
};

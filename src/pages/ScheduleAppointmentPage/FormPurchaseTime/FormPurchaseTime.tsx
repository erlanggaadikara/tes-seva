import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "components/form/Select/Select";
import styled from "styled-components";
import { FormLabel } from "FormComponents";

import { formConfig } from "./formConfig";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { ContactFormKey } from "models/models";
import {
  useContextContactFormData,
  useContextContactFormPatch,
} from "context/contactFormContext/contactFormContext";
import { colors } from "styles/colors";

export const FormPurchaseTime = () => {
  const { t } = useTranslation();
  const contactFormData = useContextContactFormData();
  const [purchaseTime, setPurchaseTime] = useState(
    contactFormData.purchaseTime
  );
  const patchContactFormValue = useContextContactFormPatch();

  const handleOnChange = (value: string) => {
    setPurchaseTime(value);
    patchContactFormValue({
      [ContactFormKey.PurchaseTime]: value,
    });
  };
  return (
    <Wrapper>
      <FormLabel>{t(formConfig.label)}</FormLabel>
      <Select
        value={purchaseTime}
        options={formConfig.options}
        name={"purchaseTime"}
        onChoose={(value) => handleOnChange(value as string)}
        placeholder={t(formConfig.placeholderLabel)}
        suffixIcon={DownOutlined}
        floatDropdown={true}
        dropdownBackground={colors.white}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${FormLabel} {
    margin-bottom: 4px;
  }
`;

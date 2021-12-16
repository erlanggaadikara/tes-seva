import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormLabel } from "pages/ScheduleAppointmentPage/FormComponents";

import { formConfig } from "./formConfig";
import { ContactFormKey } from "models/models";
import {
  useContextContactFormData,
  useContextContactFormPatch,
} from "context/contactFormContext/contactFormContext";
import { Input } from "components/form/Input/Input";
import { filterNonDigitCharacters } from "utils/stringUtils";
import { CountryCodePlusSign } from "hooks/useContactFormData/useContactFormData";
import { TextMediumRegular } from "components/typography/TextMediumRegular";

interface FormPhoneNumberProps {
  showDefaultLabel?: boolean;
}

export const isValidPhoneNumber = (value: string) => {
  return /^\d{6,24}$/.test(value.replace(/[+]/gi, ""));
};

export const FormPhoneNumber = ({
  showDefaultLabel = true,
}: FormPhoneNumberProps) => {
  const { t } = useTranslation();
  const contactFormData = useContextContactFormData();
  const savedPhoneNumber = contactFormData.phoneNumber?.replace(
    CountryCodePlusSign,
    ""
  );
  const [phoneNumber, setPhoneNumber] = useState(savedPhoneNumber);
  const patchContactFormValue = useContextContactFormPatch();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = filterNonDigitCharacters(event.target.value);
    setPhoneNumber(phoneNumber);
    patchContactFormValue({
      [ContactFormKey.PhoneNumber]: `${CountryCodePlusSign}${phoneNumber}`,
    });
  };

  const prefixComponent = () => (
    <TextMediumRegular>{CountryCodePlusSign}</TextMediumRegular>
  );

  return (
    <Wrapper>
      {showDefaultLabel && <FormLabel>{t(formConfig.label)}</FormLabel>}
      <Input
        value={phoneNumber}
        type={"tel"}
        onChange={handleOnChange}
        maxLength={24}
        prefixComponent={prefixComponent}
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

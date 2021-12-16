import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormLabel } from "FormComponents";

import { formConfig } from "./formConfig";
import { ContactFormKey } from "models/models";
import {
  useContextContactFormData,
  useContextContactFormPatch,
} from "context/contactFormContext/contactFormContext";
import { Input } from "components/form/Input/Input";

import { filterNonLetterOrSpaceCharacters } from "utils/stringUtils";

export const FormName = () => {
  const { t } = useTranslation();
  const contactFormData = useContextContactFormData();
  const savedNameValue = contactFormData.name;
  const [nameValue, setNameValue] = useState(savedNameValue);
  const patchContactFormValue = useContextContactFormPatch();
  useEffect(() => {
    setNameValue(savedNameValue);
  }, [savedNameValue]);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = filterNonLetterOrSpaceCharacters(event.target.value);
    patchContactFormValue({
      [ContactFormKey.Name]: data,
    });
  };
  return (
    <Wrapper>
      <FormLabel>{t(formConfig.label)}</FormLabel>
      <Input
        value={nameValue}
        type={"text"}
        onChange={handleOnChange}
        maxLength={100}
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

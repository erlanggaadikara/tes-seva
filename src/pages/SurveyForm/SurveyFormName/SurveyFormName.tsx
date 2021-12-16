import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Input } from "components/form/Input/Input";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormLabel } from "component/FormLabel/FormLabel";
import { filterNonLetterOrSpaceCharacters } from "utils/stringUtils";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { nameFormConfig } from "./nameFormConfig";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const SurveyFormName = ({ className }: Props) => {
  const { t } = useTranslation();
  const savedNameValue = useContextSurveyFormData().name?.value;
  const [nameValue, setNameValue] = useState(savedNameValue);
  const patchSurveyFormValue = useContextSurveyFormPatch();
  useEffect(() => {
    setNameValue(savedNameValue);
  }, [savedNameValue]);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = filterNonLetterOrSpaceCharacters(event.target.value);
    patchSurveyFormValue({
      [SurveyFormKey.Name]: { value: data, isDataValid: isDataValid(data) },
    });
  };

  return (
    <Wrapper className={className}>
      <FormLabel>{t(nameFormConfig.label)}</FormLabel>
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
    margin-bottom: 29px;
  }
`;

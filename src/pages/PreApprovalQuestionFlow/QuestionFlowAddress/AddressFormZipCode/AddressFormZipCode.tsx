import React, { ChangeEvent, useEffect, useState } from "react";
import {
  ElementTagName,
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
} from "models/models";
import { AddressFormItemTitle } from "AddressFormItemTitle/AddressFormItemTitle";
import styled from "styled-components";
import { Input } from "components/form/Input/Input";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";

import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";
import { filterNonDigitCharacters, isZipCodeValid } from "utils/stringUtils";
import { InfoCircleOutlined } from "components/icon/InfoCircleOutlined/InfoCircleOutlined";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { getClientHeight } from "utils/componentUtils";

const zipCodeLen = 5;

export const AddressFormZipCode = () => {
  const { t } = useTranslation();
  const { questionFlowForm, patchQuestionFlowForm } = useQuestionFlowForm();
  const [isInputError, setInputError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    questionFlowForm[PreApprovalQuestionsAddressKey.ZipCode].value
  );
  const originHeight = getClientHeight();

  const resizeHandler = () => {
    const resizeHeight = getClientHeight();
    const activeElement = document.activeElement;
    if (resizeHeight < originHeight) {
      if (
        activeElement &&
        (activeElement.tagName === ElementTagName.Input ||
          activeElement.tagName === ElementTagName.Textarea)
      ) {
        setTimeout(() => {
          activeElement.scrollIntoView({ block: "center" });
        }, 0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = filterNonDigitCharacters(event.target.value);
    const isDataValid = isZipCodeValid(result);
    setInputError(!!result && !isDataValid);
    setInputValue(result);
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.ZipCode]: {
        value: result,
        isDataValid: isDataValid,
      },
    });
  };

  const errorText = () => {
    return (
      <StyledErrorText>
        {t(
          `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.ZipCode}.errorMessage`
        )}
      </StyledErrorText>
    );
  };

  const checkValid = () => {
    if (!!inputValue) {
      setInputError(!isZipCodeValid(inputValue));
    }
  };

  return (
    <>
      <AddressFormItemTitle title={PreApprovalQuestionsAddressKey.ZipCode} />
      <StyledInputWrapper>
        <StyledInput
          suffixIcon={isInputError ? () => <InfoCircleOutlined /> : undefined}
          bottomComponent={isInputError ? errorText : undefined}
          isError={isInputError}
          onFocus={checkValid}
          value={inputValue}
          placeholder={t(
            `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${PreApprovalQuestionsAddressKey.ZipCode}.placeholder`
          )}
          maxLength={zipCodeLen}
          type={"tel"}
          onChange={(e) => onChange(e)}
        />
      </StyledInputWrapper>
    </>
  );
};

const StyledInput = styled(Input)<{ value: string; isError: boolean }>`
  border-color: ${({ isError }) => (isError ? colors.error : colors.line)};
  color: ${({ value }) => (value ? colors.title : colors.placeholder)};
  :focus-within {
    border-color: ${({ isError }) =>
      isError ? colors.error : colors.primaryLight1};
    color: ${colors.title};
  }
`;

const StyledErrorText = styled(TextLegalMedium)`
  color: ${colors.error};
  margin-top: 4px;
`;
const StyledInputWrapper = styled.div`
  height: 80px;
`;

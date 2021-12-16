import { useTranslation } from "react-i18next";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { cashFlowAmountFormConfig } from "SurveyFormCashFlowAmount/cashFlowAmountForm.config";
import { InfoCircleOutlined } from "components/icon/InfoCircleOutlined/InfoCircleOutlined";
import styled from "styled-components";
import { Input } from "components/form/Input/Input";
import { colors } from "styles/colors";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { filterNonDigitCharacters, isAmountValid } from "utils/stringUtils";
import { useContextSurveyFormPatch } from "context/surveyFormContext/surveyFormContext";
import { SurveyFormKey } from "models/models";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { replacePriceSeparatorByLocalization } from "utils/numberUtils/numberUtils";

interface AmountInputProps {
  value: string;
  page: SurveyFormKey;
  className?: string;
}

export const CashAmountInput = ({
  value,
  page,
  className,
}: AmountInputProps) => {
  const { currentLanguage } = useCurrentLanguageFromContext();

  const { t } = useTranslation();
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const [isInputError, setInputError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    replacePriceSeparatorByLocalization(value, currentLanguage)
  );
  const [oldInputValue, setOldInputValue] = useState<string>(value);
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue;
    if (!inputRef.current) {
      return;
    }
    const cursorPosition = inputRef.current.selectionStart ?? -1;
    setSelectionStart(cursorPosition);
    const digit = filterNonDigitCharacters(event.target.value);
    const digitWithSeparator = replacePriceSeparatorByLocalization(
      digit,
      currentLanguage
    );
    if (digitWithSeparator === oldInputValue) {
      const newDigit = filterNonDigitCharacters(
        digitWithSeparator.replace(digitWithSeparator[cursorPosition - 1], "")
      );
      newValue = replacePriceSeparatorByLocalization(newDigit, currentLanguage);
      setSelectionStart(cursorPosition - 1);
    } else {
      newValue = digitWithSeparator;
    }
    setInputError(!!newValue && !isAmountValid(digit));
    setInputValue(newValue);
    patchSurveyFormValue({
      [page]: {
        value: digit,
        isDataValid: isAmountValid(digit),
      },
    });
  };

  const moveSelections = (value: number) => {
    if (inputRef.current) {
      inputRef.current.selectionStart = selectionStart + value;
      inputRef.current.selectionEnd = selectionStart + value;
    }
  };

  const checkInputValueLenChange = () => {
    return inputValue.length - oldInputValue?.length;
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const digitString = filterNonDigitCharacters(inputRef.current.value);
    setInputValue(
      replacePriceSeparatorByLocalization(digitString, currentLanguage)
    );
  }, [currentLanguage]);

  useEffect(() => {
    const stayCursorPosition = 0;
    const moveCursorLeft = -1;
    const moveCursorRight = 1;
    if (checkInputValueLenChange() === -1 || checkInputValueLenChange() === 1) {
      if (inputValue[selectionStart - 1] === ".") {
        moveSelections(moveCursorLeft);
      } else {
        moveSelections(stayCursorPosition);
      }
    }
    if (checkInputValueLenChange() === -2) {
      if (selectionStart === 0) {
        moveSelections(stayCursorPosition);
      } else {
        moveSelections(moveCursorLeft);
      }
    }
    if (checkInputValueLenChange() === 2) {
      if (inputValue[selectionStart] === ".") {
        moveSelections(stayCursorPosition);
      } else {
        moveSelections(moveCursorRight);
      }
    }
    setOldInputValue(inputValue);
  }, [inputValue]);

  const onFocus = () => {
    if (!!inputValue) {
      const strWithoutSeparator = filterNonDigitCharacters(inputValue);
      setInputError(!isAmountValid(strWithoutSeparator));
    }
  };

  const prefixComponent = () => {
    return (
      <StyledPrefixText>{t(cashFlowAmountFormConfig.unit)}</StyledPrefixText>
    );
  };
  const errorText = () => {
    return (
      <StyledErrorText>{t(cashFlowAmountFormConfig.error)}</StyledErrorText>
    );
  };

  return (
    <StyledInput
      className={className}
      value={inputValue}
      maxLength={11}
      type={"tel"}
      onChange={onChange}
      prefixComponent={prefixComponent}
      suffixIcon={isInputError ? () => <InfoCircleOutlined /> : undefined}
      bottomComponent={isInputError ? errorText : undefined}
      isError={isInputError}
      onFocus={onFocus}
      ref={inputRef}
      placeholder={t(
        `preApprovalQuestionFlow.${SurveyFormKey.TotalIncome}.placeholder`
      )}
    />
  );
};

const StyledInput = styled(Input)<{ value: string; isError: boolean }>`
  color: ${({ value }) => (value ? colors.title : colors.placeholder)};
  border-color: ${({ isError }) => (isError ? colors.error : colors.line)};
  :focus-within {
    border-color: ${({ isError }) =>
      isError ? colors.error : colors.primaryLight1};
    color: ${colors.title};
  }
`;
const StyledPrefixText = styled(TextMediumRegular)`
  margin-right: 4px;
`;
const StyledErrorText = styled(TextLegalMedium)`
  color: ${colors.error};
  margin-top: 4px;
`;

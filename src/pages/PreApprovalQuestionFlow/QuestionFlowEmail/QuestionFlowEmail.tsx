import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PreApprovalQuestionsKey } from "models/models";
import { FormLabel } from "component/FormLabel/FormLabel";
import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";
import { QuestionFlowFormProps } from "types/types";
import { Input } from "components/form/Input/Input";
import { colors } from "styles/colors";
import { isEmailValid } from "utils/stringUtils";

export const QuestionFlowEmail = ({
  handleDisabled,
}: QuestionFlowFormProps) => {
  const { t } = useTranslation();
  const {
    questionFlowForm: {
      email: { isDataValid, value: emailValue },
    },
    patchQuestionFlowForm,
  } = useQuestionFlowForm();
  const [inputValue, setInputValue] = useState<string>(emailValue);

  useEffect(() => {
    handleDisabled && handleDisabled(!isDataValid);
  }, [isDataValid]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    patchQuestionFlowForm({
      [PreApprovalQuestionsKey.Email]: {
        value,
        isDataValid: !!value && isEmailValid(value),
      },
    });
  };

  return (
    <StyledWrapper>
      <FormLabel>
        {t(`preApprovalQuestionFlow.${PreApprovalQuestionsKey.Email}.title`)}
      </FormLabel>
      <StyledInput
        value={inputValue}
        placeholder={t(
          `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Email}.placeholder`
        )}
        maxLength={320}
        type={"text"}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  ${FormLabel} {
    margin-bottom: 24px;
  }
`;
const StyledInput = styled(Input)<{ value: string }>`
  color: ${({ value }) => (value ? colors.title : colors.placeholder)};
  border-color: ${colors.line};
  :focus-within {
    border-color: ${colors.primary1};
    color: ${colors.title};
  }
`;

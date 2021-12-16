import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { LinkLabelSmallSemiBoldStyle } from "components/typography/LinkLabelSmallSemiBold";
import { colors } from "styles/colors";
import {
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
} from "models/models";

interface AddressFormTitleProps {
  title: PreApprovalQuestionsAddressKey;
}

export const AddressFormItemTitle = ({ title }: AddressFormTitleProps) => {
  const { t } = useTranslation();

  return (
    <StyledTitle
      dangerouslySetInnerHTML={{
        __html: t(
          `preApprovalQuestionFlow.${PreApprovalQuestionsKey.Address}.${title}.title`
        ),
      }}
    />
  );
};

const StyledTitle = styled.div`
  ${LinkLabelSmallSemiBoldStyle};
  color: ${colors.label};
  margin: 24px 0 4px;
`;

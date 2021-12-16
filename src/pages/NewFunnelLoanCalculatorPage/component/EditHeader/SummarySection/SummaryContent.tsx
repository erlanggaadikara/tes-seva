import React from "react";
import styled from "styled-components";
import { LinkLabelLegalSemiBoldStyle } from "components/typography/LinkLabelLegalSemiBold";
import { colors } from "styles/colors";
import { LinkLabelSmallSemiBoldStyle } from "components/typography/LinkLabelSmallSemiBold";
import { FormControlValue } from "types/types";

interface MiniDescriptionProps {
  label: string;
  value: FormControlValue;
}

export const SummaryContent = ({ label, value }: MiniDescriptionProps) => {
  return (
    <StyledMiniDescription>
      <StyledMiniLabel>{label}</StyledMiniLabel>
      <StyledMiniValue>{value}</StyledMiniValue>
    </StyledMiniDescription>
  );
};

const StyledMiniDescription = styled.div`
  display: flex;
  align-items: normal;
  flex-direction: column;
`;

const StyledMiniLabel = styled.div`
  ${LinkLabelLegalSemiBoldStyle};
  color: ${colors.label};
`;

const StyledMiniValue = styled.div`
  ${LinkLabelSmallSemiBoldStyle};
  color: ${colors.title};
`;

import React from "react";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
interface SectionTitleProps {
  title: string;
}
export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <StyledSectionTitle>
      <LinkLabelLargeSemiBold>{title}</LinkLabelLargeSemiBold>
    </StyledSectionTitle>
  );
};
const StyledSectionTitle = styled.div`
  padding-bottom: 16px;
`;

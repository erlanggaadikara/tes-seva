import React from "react";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { colors } from "styles/colors";

interface SectionHeaderProps {
  text: string;
}
export const SectionHeader = ({ text }: SectionHeaderProps) => (
  <StyledContainer>
    <LinkLabelLargeSemiBold>{text}</LinkLabelLargeSemiBold>
    <StyledSeperator />
  </StyledContainer>
);

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 44px;
  padding-bottom: 32px;
  align-items: center;
  text-align: center;
  background-color: ${colors.white};
`;
const StyledSeperator = styled.div`
  margin-top: 18px;
  width: 40px;
  height: 4px;
  background-color: ${colors.secondary};
`;

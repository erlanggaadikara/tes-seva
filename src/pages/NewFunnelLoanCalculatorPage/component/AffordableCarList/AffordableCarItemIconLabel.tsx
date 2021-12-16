import React from "react";
import styled from "styled-components";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { colors } from "styles/colors";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";

interface AffordableCarItemIconLabelProps {
  icon: JSX.Element;
  title: string;
  value: string;
}

export const AffordableCarItemIconLabel = ({
  icon,
  title,
  value,
}: AffordableCarItemIconLabelProps) => {
  return (
    <StyledWrapper>
      <StyledIcon>{icon}</StyledIcon>
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledValue>{value}</StyledValue>
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledIcon = styled.div`
  margin: auto 0;
`;

const StyledContent = styled.div`
  margin-left: 7.5%;
`;

const StyledTitle = styled(LinkLabelLegalSemiBold)`
  display: block;
  color: ${colors.label};
`;

const StyledValue = styled(LinkLabelSmallSemiBold)`
  display: block;
  color: ${colors.title};
`;

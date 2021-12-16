import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

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
      <StyledContent>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
      </StyledContent>
      <StyledValue>{value}</StyledValue>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledIcon = styled.div`
  margin: auto 0;
`;

const StyledContent = styled.div`
  display: flex;
`;

const StyledTitle = styled(TextSmallRegular)`
  display: block;
  color: ${colors.label};
  margin-left: 2vw;
  line-height: 16px;
  margin-left: 2vw;
`;
const StyledValue = styled(LinkLabelSmallSemiBold)`
  display: block;
  color: ${colors.title};
`;

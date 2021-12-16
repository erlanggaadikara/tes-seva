import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  prefixIcon: JSX.Element;
}

export const Badge = ({
  title,
  message,
  prefixIcon,
  ...resetProps
}: BadgeProps) => {
  return (
    <StyledWrapper {...resetProps}>
      <StyledPrefixIcon>{prefixIcon}</StyledPrefixIcon>
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledMessage>{message}</StyledMessage>
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  background: ${colors.inputBg};
  padding: 20px 16px;
  align-items: center;
`;

const StyledPrefixIcon = styled.div`
  margin-right: 16px;
`;
const StyledContent = styled.div`
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledTitle = styled(LinkLabelMediumSemiBold)`
  color: ${colors.title};
`;
const StyledMessage = styled(TextSmallRegular)`
  color: ${colors.body};
`;

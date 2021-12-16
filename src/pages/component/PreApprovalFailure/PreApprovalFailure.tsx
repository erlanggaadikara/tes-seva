import { colors } from "styles/colors";
import React from "react";
import styled from "styled-components";
import { maxPageWidth, screenHeight } from "styles/GlobalStyle";

import { H2MediumBold } from "components/typography/H2MediumBold";
import { CheckFail } from "components/icon/CheckFail/CheckFail";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

interface PreApprovalFailureProps {
  title: string;
  message: string;
  cta?: () => JSX.Element;
}

export const PreApprovalFailure = ({
  title,
  message,
  cta,
}: PreApprovalFailureProps) => {
  return (
    <StyledPage>
      <CheckFail width="70%" height="auto" />

      <div>
        <StyledTitle>{title}</StyledTitle>
        <StyledMessage>{message}</StyledMessage>
      </div>

      {cta && cta()}
    </StyledPage>
  );
};

const StyledPage = styled.div`
  width: 100%;
  background: ${colors.offWhite};
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: ${maxPageWidth};
  height: ${screenHeight}px;
`;

const StyledTitle = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
`;

const StyledMessage = styled(TextSmallRegular)`
  color: ${colors.body};
  text-align: center;
  display: block;
  margin-top: 16px;
`;

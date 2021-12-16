import React from "react";
import styled from "styled-components";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

export const Breadcrumb = () => {
  return (
    <Wrapper>
      <StyledText>
        News & Article / Otomotif / Resmi Meluncur, Daihatsu All New Xenia Punya
        12 Varian
      </StyledText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-left: 100px;

  @media (max-width: 580px) {
    margin-left: 20px;
  }
`;

const StyledText = styled(TextSmallRegular)`
  font-size: 12px;
  padding: 10 px 0;
  margin: 0;
`;

import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { colors } from "styles/colors";
import background from "./test.png";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

export const ArticlesItem = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImage src={background} layout="responsive" />
      </ImageWrapper>
      <ContentWrapper>
        <CategoryWrapper>
          <CategoryText>Review</CategoryText>
        </CategoryWrapper>
        <TitleText>
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </TitleText>
        <TextSmallRegular>September 15 2021</TextSmallRegular>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-bottom: 8px;
  width: 100%;

  @media (max-width: 700px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 8px;
  width: 150px;
  height: 100px;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const CategoryWrapper = styled.div`
  background-color: ${colors.error};
  border-radius: 5px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled(LinkLabelLargeSemiBold)`
  font-size: 80%;
  color: ${colors.white};
`;

const TitleText = styled(LinkLabelLargeSemiBold)`
  font-size: small;
  line-height: normal;
`;

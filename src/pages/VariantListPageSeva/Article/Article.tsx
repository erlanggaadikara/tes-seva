import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import image from "./test.png";
import { Button, ButtonType } from "components/Button/Button";

export const Article = () => {
  return (
    <Wrapper>
      <StyledImage src={image} />
      <ContentWrapper>
        <HeaderText>Expert reviews blogs</HeaderText>
        <CategoryWrapper>
          <CategoryText>Review</CategoryText>
        </CategoryWrapper>
        <Title>Lorem ipsum dolor sit amet, consectetur adipiscing</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </Subtitle>
        <DetailWrapper>
          <Avatar src={image} />
          <DetailText>Autoini | September 2021</DetailText>
        </DetailWrapper>
        <StyledButton
          height={"40px"}
          buttonType={ButtonType.primary1}
          loading={false}
        >
          <StyledButtonText>Read full review</StyledButtonText>
        </StyledButton>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.title};
  position: relative;
  margin: 20px 0;
  width: 100%;

  @media (max-width: 700px) {
    position: static;
    display: flex;
    flex-direction: column;
  }
`;

const HeaderText = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
  margin-top: 10px;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;

  @media (max-width: 700px) {
    position: static;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-top: 20px;
  margin-left: 40px;

  @media (max-width: 700px) {
    width: 90%;
    margin-left: 20px;
  }
`;

const CategoryWrapper = styled.div`
  background-color: ${colors.error};
  border-radius: 5px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CategoryText = styled(LinkLabelLargeSemiBold)`
  font-size: 16px;
  color: ${colors.white};
`;

const Title = styled(LinkLabelLargeSemiBold)`
  font-size: 40px;
  color: ${colors.white};
  margin-bottom: 20px;
  line-height: 48px;
`;

const Subtitle = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 20px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const DetailText = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 15px;
  line-height: 24px;
  margin-left: 20px;
`;

const StyledButton = styled(Button)`
  margin-left: 0;
  margin-bottom: 20px;
  width: 300px;
  background: ${colors.error};

  @media (max-width: 700px) {
    margin-left: auto;
    width: 100%;
  }
`;

const StyledButtonText = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 15px;
`;

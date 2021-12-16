import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import background from "./test.png";
import { useTranslation } from "react-i18next";
import { ArticlesItem } from "./ArticlesItem";
export const Articles = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <HeaderWrapper>
        <LinkLabelLargeSemiBold>{t("articles.title")}</LinkLabelLargeSemiBold>
        <LinkLabelLargeSemiBold>{t("articles.seeAll")}</LinkLabelLargeSemiBold>
      </HeaderWrapper>
      <ContentWrapper>
        <TileWrapper>
          <TileInfoWrapper>
            <CategoryWrapper>
              <CategoryText>Review</CategoryText>
            </CategoryWrapper>
            <TitleText>
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </TitleText>
            <DateText>September 15 2021</DateText>
          </TileInfoWrapper>
        </TileWrapper>
        <ListWrapper>
          <ArticlesItem />
          <ArticlesItem />
          <ArticlesItem />
          <ArticlesItem />
        </ListWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 10vw;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const TileWrapper = styled.div`
  border-radius: 8px;
  background: url("/image/Article/test.png") no-repeat center;
  background-size: cover;
  width: 50%;
  height: 100%;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const TileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 300px;
  margin-left: 20px;
  margin-bottom: 20px;
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
  font-size: 90%;
  color: ${colors.white};
`;

const TitleText = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
`;

const DateText = styled(TextSmallRegular)`
  color: ${colors.white};
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

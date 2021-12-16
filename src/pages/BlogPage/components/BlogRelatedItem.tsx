import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

interface listsType {
  category: string;
  image: string;
  title: string;
  writer: string;
  date: string;
}

interface BlogRelatedItemProps {
  list: listsType;
}

export const BlogRelatedItem = ({ list }: BlogRelatedItemProps) => {
  const BackgroundImage = styled.div`
    background: url(${list.image}) no-repeat center;
    background-size: cover;
    max-width: 100%;
    height: 130px;
    position: relative;
  `;

  return (
    <Wrapper>
      <BackgroundImage>
        <CategoryWrapper>
          <CategoryText>{list.category}</CategoryText>
        </CategoryWrapper>
      </BackgroundImage>
      <TitleWrapper>
        <Title>{list.title}</Title>
      </TitleWrapper>
      <WriterWrapper>
        By <Writer>{list.writer}</Writer>
      </WriterWrapper>
      <DateWrapper>
        <DateInfo>{list.date}</DateInfo>
      </DateWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 80%;
  margin-top: 10px;
  margin-right: 30px;
`;

const CategoryWrapper = styled.div`
  background-color: ${colors.error};
  border-radius: 15px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 10%;
`;

const CategoryText = styled(LinkLabelLargeSemiBold)`
  font-size: 12px;
  color: ${colors.white};
`;

const TitleWrapper = styled.div`
  margin-top: 10px;
`;

const Title = styled(LinkLabelLargeSemiBold)`
  font-size: 14px;
  line-height: 1.43;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WriterWrapper = styled.div`
  margin-top: 5px;
`;

const Writer = styled(TextSmallRegular)`
  font-size: 14px;
  color: ${colors.error};
`;

const DateWrapper = styled.div`
  margin-top: 5px;
`;

const DateInfo = styled(TextSmallRegular)`
  font-size: 14px;
`;

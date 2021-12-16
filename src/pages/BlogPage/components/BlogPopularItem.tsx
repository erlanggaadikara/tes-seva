import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";

interface BlogPopularItemProps {
  title: string;
  writer: string;
  date: string;
}

export const BlogPopularItem = ({
  title,
  writer,
  date,
}: BlogPopularItemProps) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <WriterWrapper>
        By <Writer>{writer}</Writer>
      </WriterWrapper>
      <DateWrapper>
        <DateInfo>{date}</DateInfo>
      </DateWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 10px;
`;

const TitleWrapper = styled.div`
  margin-bottom: 0px;
`;

const Title = styled(LinkLabelLargeSemiBold)`
  font-size: 18px;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WriterWrapper = styled.div`
  margin-bottom: 0px;
`;

const Writer = styled(TextSmallRegular)`
  font-size: 14px;
  color: ${colors.error};
`;

const DateWrapper = styled.div`
  margin-bottom: 00px;
`;

const DateInfo = styled(TextSmallRegular)`
  font-size: 14px;
`;

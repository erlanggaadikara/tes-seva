import React from "react";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { BlogPopularItem } from "./BlogPopularItem";
// import { lists } from 'mock/BlogPopularMock'
import { PopularBlogType } from "types/types";
interface BlogPopularListProps {
  popularBlogList: PopularBlogType[] | undefined;
}

export const BlogPopularList = ({ popularBlogList }: BlogPopularListProps) => {
  const renderList = () => {
    if (popularBlogList) {
      return popularBlogList.map((list, index) => {
        return (
          <ContentWrapper key={index}>
            <StyledNumber key={index}>{index + 1}.</StyledNumber>
            <BlogPopularItem
              key={index}
              title={list.title}
              writer={list.writer}
              date={list.date}
            />
          </ContentWrapper>
        );
      });
    }
  };

  return (
    <>
      {popularBlogList ? (
        <Wrapper>
          <Header>Terpopuler</Header>
          {renderList()}
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 10px;

  @media (max-width: 992px) {
    display: none;
  }
`;

const Header = styled(LinkLabelLargeSemiBold)`
  font-size: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledNumber = styled(LinkLabelLargeSemiBold)`
  font-size: 25px;
`;

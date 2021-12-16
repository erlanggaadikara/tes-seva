import React from "react";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { BlogRelatedItem } from "./BlogRelatedItem";
// import { lists } from 'mock/BlogRelatedMock'
import { RelatedBlogType } from "types/types";

interface BlogRelatedListProps {
  contentWidth: string;
  relatedBlogList: RelatedBlogType[] | undefined;
}

export const BlogRelatedList = ({
  contentWidth,
  relatedBlogList,
}: BlogRelatedListProps) => {
  const renderList = () => {
    if (relatedBlogList) {
      return relatedBlogList.map((list, index) => {
        return <BlogRelatedItem list={list} key={index} />;
      });
    }
  };

  const Wrapper = styled.div`
    max-width: ${contentWidth}px;
    margin-top: 30px;
    margin-bottom: 30px;
  `;

  return (
    <Wrapper>
      <Header>Berita Terkait</Header>
      <ListWrapper>{renderList()}</ListWrapper>
    </Wrapper>
  );
};

const Header = styled(LinkLabelLargeSemiBold)`
  font-size: 20px;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;

  @media (max-width: 765px) {
    grid-template-columns: auto auto;
  }
`;

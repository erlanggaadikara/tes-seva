import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { Pagination } from "./Pagination";
import { DataBlogType } from "types/types";

interface BlogContentProps {
  dataBlog: DataBlogType | undefined;
}

export const BlogContent = ({ dataBlog }: BlogContentProps) => {
  interface IndexPage {
    startIndex: number;
    endIndex: number;
  }
  const [indexPage, setIndexPage] = useState<IndexPage>();
  const itemLimit = 10;
  const paragraphLists = dataBlog?.paragraphLists;

  const generateParagraphSection = () => {
    if (paragraphLists) {
      return paragraphLists
        .slice(indexPage?.startIndex, indexPage?.endIndex)
        .map((paragraph, index) => {
          if (paragraph.type === "paragraph") {
            return <StyledText key={index}>{paragraph.body}</StyledText>;
          } else {
            return <StyledImage src={paragraph.body} key={index} />;
          }
        });
    }
  };

  const changePage = (page: number) => {
    const startIndex = page * itemLimit - itemLimit;
    const endIndex = startIndex + itemLimit;
    setIndexPage({ startIndex, endIndex });
  };

  return (
    <>
      {dataBlog ? (
        <Wrapper>
          <TitleWrapper>
            <Title>{dataBlog.title}</Title>
          </TitleWrapper>
          <WriterAndDateWrapper>
            <WriterAndDate>{dataBlog.writterAndDate}</WriterAndDate>
          </WriterAndDateWrapper>
          <HeadlineWrapper>
            <Headline>{dataBlog.headline}</Headline>
          </HeadlineWrapper>
          {generateParagraphSection()}
          <Pagination
            length={paragraphLists ? paragraphLists.length : 0}
            onChangePage={changePage}
          />
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding-bottom: 20px;
  margin-right: 30px;

  @media (max-width: 992px) {
    margin-right: 0;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled(LinkLabelLargeSemiBold)`
  font-size: 36px;
  color: ${colors.black};
  text-align: justify;
`;

const WriterAndDateWrapper = styled.div`
  margin-bottom: 20px;
`;

const WriterAndDate = styled(TextSmallRegular)`
  font-size: 14px;
`;

const HeadlineWrapper = styled.div`
  margin-bottom: 20px;
`;

const Headline = styled(LinkLabelLargeSemiBold)`
  font-size: 24px;
  color: ${colors.label};
`;

const StyledText = styled.p`
  font-size: 16px;
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const StyledImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`;

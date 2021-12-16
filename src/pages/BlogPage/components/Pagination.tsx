import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { itemLimit, pageLimit } from "const/const";
import { FastForward } from "components/icon/FastForward/FastForward";
import { FastPrevious } from "components/icon/FastPrevious/FastPrevious";
import { Previous } from "components/icon/Previous/Previous";
import { Forward } from "components/icon/Forward/Forward";

interface PaginationProps {
  onChangePage: (page: number) => void;
  length: number;
}

export const Pagination = (props: PaginationProps) => {
  const pages = Math.round(props.length / itemLimit);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const goToNextPage = () => {
    if (currentPage === pages) return;
    setCurrentPage((page) => page + 1);
  };

  const gotToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((page) => page - 1);
  };

  const goToLastPage = () => {
    setCurrentPage(pages);
  };

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    return new Array(pageLimit)
      .fill(pages)
      .map((_, idx) => start + idx + 1)
      .filter((item) => item <= pages);
  };

  useEffect(() => {
    props.onChangePage(currentPage);
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [currentPage]);

  if (props.length === 0 || pages <= 1) return <></>;

  return (
    <StyledPagination>
      <StyledControlButton onClick={gotToFirstPage}>
        <FastPrevious />
      </StyledControlButton>
      <StyledControlButton onClick={goToPreviousPage}>
        <Previous />
      </StyledControlButton>
      {getPaginationGroup().map((item, index) => {
        return (
          <StyledPaginationItem
            key={index}
            onClick={() => changePage(item)}
            isActive={currentPage === item}
          >
            {item}
          </StyledPaginationItem>
        );
      })}
      <StyledControlButton onClick={goToNextPage}>
        <Forward />
      </StyledControlButton>
      <StyledControlButton onClick={goToLastPage}>
        <FastForward />
      </StyledControlButton>
    </StyledPagination>
  );
};

interface StylePaginationItemProps {
  isActive: boolean;
}

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 14px;
`;

const StyledPaginationItem = styled.button<StylePaginationItemProps>`
  width: 50px;
  height: 50px;
  background: ${(props) => (props.isActive ? "#E6E9F1" : colors.white)};
  border: 1.5px solid ${(props) => (props.isActive ? "#E6E9F1" : "#E4E9F1")};
  box-sizing: border-box;
  border-radius: 16px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 769px) {
    margin: 0 2px;
  }
`;

const StyledControlButton = styled.button`
  width: 50px;
  height: 50px;
  background: #ffffff;
  border: 1.5px solid #e4e9f1;
  box-sizing: border-box;
  border-radius: 16px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 769px) {
    margin: 0 2px;
  }
`;

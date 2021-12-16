import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Arrow from "image/Forward.png";
import { isMobileDevice } from "utils/window";

interface OptionCarDesignCarouselProps {
  options: string[];
  onSelectedOption: (item: string) => void;
}

export const OptionCarDesignCarousel = (
  props: OptionCarDesignCarouselProps
) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(3);
  const [currentDesign, setCurrentDesign] = useState<string>(props.options[0]);

  const onClickDirection = (direction: string) => {
    if (direction === "next") {
      if (endIndex === props.options.length) return;
      setStartIndex((prev) => prev + 1);
      setEndIndex((prev) => prev + 1);
    } else {
      if (startIndex === 0 || endIndex === 3) return;
      setStartIndex((prev) => prev - 1);
      setEndIndex((prev) => prev - 1);
    }
  };

  const onClickItem = (item: string, index: number) => {
    setCurrentDesign(item);
    setActiveIndex(index);
  };

  useEffect(() => {
    props.onSelectedOption(currentDesign);
  }, [currentDesign]);

  useEffect(() => {
    if (isMobileDevice) {
      setStartIndex(0);
      setEndIndex(10);
    } else {
      setStartIndex(0);
      setEndIndex(3);
    }
    setActiveIndex(0);
  }, [props.options, isMobileDevice]);

  return (
    <StyledContainer>
      <StyledCarouselWrapper>
        <StyledArrowButton onClick={() => onClickDirection("prev")}>
          <StyledArrow direction={"prev"} src={Arrow} />
        </StyledArrowButton>
        {props.options
          .map((item, index) => (
            <StyledItem
              key={index}
              isSelected={activeIndex === index}
              onClick={() => onClickItem(item, index)}
              src={item}
            />
          ))
          .slice(startIndex, endIndex)}
        <StyledArrowButton onClick={() => onClickDirection("next")}>
          <StyledArrow direction={"next"} src={Arrow} />
        </StyledArrowButton>
      </StyledCarouselWrapper>
    </StyledContainer>
  );
};

interface ItemProps {
  isSelected: boolean;
  onClick?: () => void;
}

interface ArrowProps {
  direction: string;
}

const StyledContainer = styled.div`
  margin: auto;
  display: flex;
  flex: 1;
  width: 100%;
  overflow: auto;
  @media (min-width: 768px) {
    margin: 20px 0;
    display: inline-block;
  }
`;
const StyledCarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const StyledArrowButton = styled.button`
  display: flex;
  align-self: center;
  border: 0;
  @media (max-width: 768px) {
    display: none;
  }
  cursor: pointer;
`;

const StyledArrow = styled.img<ArrowProps>`
  width: 90%;
  height: auto;
  margin: 10px;
  transform: ${({ direction }) =>
    direction === "prev" ? "rotate(0deg)" : "rotate(180deg)"};
  @media (max-width: 768px) {
    transform: ${({ direction }) =>
      direction === "prev" ? "rotate(270deg)" : "rotate(90deg)"};
  }
`;

const StyledItem = styled.img<ItemProps>`
  background: #ffffff;
  border: 2px solid ${({ isSelected }) => (isSelected ? "#002373" : "#E4E9F1")};
  box-sizing: border-box;
  border-radius: 24px;
  width: 260px;
  height: 184px;
  display: flex;
  align-self: center;
  justify-content: center;
  margin: 10px;
  @media (max-width: 768px) {
    width: 100px;
    height: 84px;
  }
  object-fit: cover;
  cursor: pointer;
`;

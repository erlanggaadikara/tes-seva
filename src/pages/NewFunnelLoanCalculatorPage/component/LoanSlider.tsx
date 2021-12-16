import { LoanSliderItem } from "./LoanSliderItem";
import React from "react";
import styled from "styled-components";
import { LoanPickerData } from "./LoanPicker";
import { ZIndex } from "styles/zIndex";
import { colors } from "styles/colors";

interface LoanSliderProps {
  data: LoanPickerData[];
  currentIndex: number;
  width: number;
}

export const LoanSlider = ({ data, width, currentIndex }: LoanSliderProps) => {
  const sliderDefaultConfig = {
    speed: "0.5s",
    delay: 2,
    itemCount: 3,
  };
  const itemWidth = width / sliderDefaultConfig.itemCount;

  return (
    <StyledContent width={width}>
      <StyledPickerBackground />
      <StyledSlider>
        <StyledItemsWrapper
          transitionDuration={sliderDefaultConfig.speed}
          left={-itemWidth * (currentIndex - 1)}
          width={data.length * itemWidth}
        >
          {data.map((item, index) => (
            <LoanSliderItem
              key={index}
              width={itemWidth}
              value={item.label}
              color={item.color}
              isSelected={index === currentIndex}
            />
          ))}
        </StyledItemsWrapper>
      </StyledSlider>
    </StyledContent>
  );
};

const StyledContent = styled.div<{ width: number }>`
  justify-content: space-around;
  align-items: center;
  display: flex;
  height: 50px;
  width: ${({ width }) => width}px;
  z-index: ${ZIndex.Overlay};
`;
const StyledSlider = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: ${ZIndex.Appbar};
`;
const StyledItemsWrapper = styled.ul<{
  width: number;
  left: number;
  transitionDuration: string;
}>`
  height: auto;
  overflow: hidden;
  position: relative;
  left: ${({ left }) => left}px;
  transition: left;
  display: flex;
  flex-direction: row;
  transition-duration: ${({ transitionDuration }) => transitionDuration};
  width: ${({ width }) => width}px;
`;
const StyledPickerBackground = styled.div`
  top: 5px;
  width: 32%;
  height: 40px;
  position: absolute;
  background: ${colors.white};
  box-shadow: 0 0 16px rgba(3, 24, 56, 0.1);
  border-radius: 12px;
`;

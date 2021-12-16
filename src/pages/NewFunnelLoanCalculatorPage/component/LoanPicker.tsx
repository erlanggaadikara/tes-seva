import React, { useEffect, useState } from "react";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import styled from "styled-components";
import graduation from "components/Graduation/Ruler.svg";
import { IconMinus } from "components/icon/IconMinus/IconMinus";
import { IconPlus } from "components/icon/IconPlus/IconPlus";
import { colors } from "styles/colors";
import { LoanSlider } from "./LoanSlider";
import { getClientWidth } from "utils/componentUtils";

export type LoanPickerData = {
  color: string;
  value: number;
  label: string;
};

interface LoanPickerProps {
  tag: string;
  label: string;
  data: LoanPickerData[];
  padding?: number;
  index?: number;
  onSelectedValueChanged?: (tag: string, item: LoanPickerData) => void;
}

export const LoanPicker = ({
  tag,
  label,
  data,
  padding = 16,
  index = 0,
  onSelectedValueChanged,
}: LoanPickerProps) => {
  const iconSize = 24;
  const width = getClientWidth();
  const sliderWidth = width - 2 * iconSize - padding * 2;
  const headerValue = { color: "transparent", label: "", value: 0 };
  const tailValue = { color: "transparent", label: "", value: 0 };
  const sliderData: LoanPickerData[] = [headerValue, ...data, tailValue];
  const headerIndex = 0;
  // The first and last are placeholder data, so subtract three
  const tailIndex = sliderData.length - 3;
  let currentIndex = index + 1;
  const isTailData = () => {
    return index === tailIndex;
  };
  const isHeaderData = () => {
    return index === headerIndex;
  };
  const [minusColor, setMinusColor] = useState<string>(
    isHeaderData() ? colors.placeholder : colors.primary1
  );
  const [plusColor, setPlusColor] = useState<string>(
    isTailData() ? colors.placeholder : colors.primary1
  );

  useEffect(() => {
    updateIndex();
  }, []);

  const updateIndex = () => {
    if (!isTailData() && !isHeaderData()) {
      currentIndex = index + 1;
    }
  };

  const uploadIconColor = () => {
    setPlusColor(isTailData() ? colors.placeholder : colors.primary1);
    setMinusColor(isHeaderData() ? colors.placeholder : colors.primary1);
  };

  useEffect(() => {
    updateIndex();
    uploadIconColor();
  }, [index, data]);

  const onPlusClick = () => {
    if (isTailData()) {
      return;
    }
    currentIndex = currentIndex + 1;
    onSelectedValueChanged &&
      onSelectedValueChanged(tag, sliderData[currentIndex]);
  };

  const onMinusClick = () => {
    if (isHeaderData()) {
      return;
    }
    currentIndex = currentIndex - 1;
    onSelectedValueChanged &&
      onSelectedValueChanged(tag, sliderData[currentIndex]);
  };

  return (
    <>
      <StyledLabel padding={padding} color={colors.title}>
        {label}
      </StyledLabel>
      <StyledPickerWrapper padding={padding}>
        <StyledTop>
          <StyledIconMinus
            color={minusColor}
            onClick={onMinusClick}
            width={iconSize}
            height={iconSize}
          />
          <LoanSlider
            currentIndex={currentIndex}
            data={sliderData}
            width={sliderWidth}
          />
          <StyledIconPlus
            color={plusColor}
            onClick={onPlusClick}
            width={iconSize}
            height={iconSize}
          />
        </StyledTop>
        <StyledBottom>
          <StyledGraduation />
        </StyledBottom>
      </StyledPickerWrapper>
    </>
  );
};

const StyledPickerWrapper = styled.div<{ padding: number }>`
  width: 100%;
  margin-top: ${({ padding }) => padding}px;
  padding: 0 ${({ padding }) => padding}px;
`;
const StyledLabel = styled(LinkLabelSmallSemiBold)<{
  padding: number;
  color: string;
}>`
  color: ${({ color }) => color};
  width: 100%;
  padding: 0 ${({ padding }) => padding}px;
`;
const StyledTop = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;
const StyledBottom = styled.div`
  width: 100%;
  height: 18px;
`;
const StyledGraduation = styled.div`
  width: 100%;
  height: 18px;
  background: transparent url(${graduation}) no-repeat bottom;
  background-size: 100%;
`;
const StyledIconMinus = styled(IconMinus)`
  :hover {
    cursor: pointer;
  }
`;
const StyledIconPlus = styled(IconPlus)`
  :hover {
    cursor: pointer;
  }
`;

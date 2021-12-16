import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControlValue } from "types/types";
import styled from "styled-components";
import { TextXSmallMediumStyle } from "components/typography/TextXSmallMedium";
import { colors, transparent } from "styles/colors";

export interface OptionProps<T extends FormControlValue> {
  optionValue: T;
  label: string;
  isSelected: boolean;
  selectedPrefixIcon: JSX.Element;
  unselectedPrefixIcon: JSX.Element;
}

interface RadiosButtonProps<T extends FormControlValue> {
  value?: FormControlValue;
  options: Array<OptionProps<T>>;
  name?: string;
  onChoose: (value: FormControlValue) => void;
}

interface RadioProps<T> {
  onClick: (option: T) => void;
  isSelected: boolean;
}

export const SecondaryRadioButton = <T extends FormControlValue>({
  options,
  value,
  onChoose,
}: RadiosButtonProps<T>): ReactElement => {
  const getRadioOptions = (
    options: Array<OptionProps<T>>,
    value: FormControlValue
  ) => {
    return options.map((option) => {
      return { ...option, ...{ isSelected: option.optionValue === value } };
    });
  };
  const [radioOptions, setRadioOptions] = useState(() => {
    return getRadioOptions(options, value);
  });
  const { t } = useTranslation();
  const onClick = (optionValue: FormControlValue) => {
    const newRadioOptions = getRadioOptions(radioOptions, optionValue);
    setRadioOptions(newRadioOptions);
    onChoose(optionValue);
  };
  useEffect(() => {
    const newRadioOptions = getRadioOptions(radioOptions, value);
    setRadioOptions(newRadioOptions);
  }, [value]);
  return (
    <StyledButtonContainer>
      {radioOptions?.map(
        (
          {
            isSelected,
            optionValue,
            label,
            selectedPrefixIcon,
            unselectedPrefixIcon,
          },
          index
        ) => {
          return (
            <StyledLabel key={index}>
              <StyledRadio
                onClick={() => onClick(optionValue)}
                isSelected={isSelected}
              >
                <ImageContainer>
                  {isSelected ? selectedPrefixIcon : unselectedPrefixIcon}
                </ImageContainer>
                <StyledTextXSmallMedium>{t(label)}</StyledTextXSmallMedium>
              </StyledRadio>
            </StyledLabel>
          );
        }
      )}
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
`;
const StyledLabel = styled.label`
  width: 48%;
`;
const StyledRadio = styled.div<RadioProps<FormControlValue>>`
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 8px;
  align-items: center;
  height: 64px;
  border: 2px solid
    ${({ isSelected }) => (isSelected ? colors.primaryLight1 : colors.line)};
  color: ${({ isSelected }) =>
    isSelected ? colors.title : colors.placeholder};
  background-color: ${({ isSelected }) =>
    isSelected ? transparent("primaryLight1", 0.05) : colors.white};
`;

const ImageContainer = styled.div`
  padding-right: 8px;
`;
const StyledTextXSmallMedium = styled.div`
  ${TextXSmallMediumStyle};
`;

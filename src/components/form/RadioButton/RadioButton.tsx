import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControlValue } from "types/types";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { TextMediumRegular } from "components/typography/TextMediumRegular";

export interface OptionProps<T extends FormControlValue> {
  optionValue: T;
  image?: JSX.Element;
  label: string;
  isSelected: boolean;
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

export const RadioButton = <T extends FormControlValue>({
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
  return (
    <>
      {radioOptions?.map(({ isSelected, optionValue, image, label }, index) => {
        return (
          <label style={{ display: "block" }} key={index}>
            <StyledRadio
              onClick={() => onClick(optionValue)}
              isSelected={isSelected}
            >
              {image && <ImageContainer>{image}</ImageContainer>}
              {isSelected ? (
                <LinkLabelMediumSemiBold>{t(label)}</LinkLabelMediumSemiBold>
              ) : (
                <TextMediumRegular>{t(label)}</TextMediumRegular>
              )}
            </StyledRadio>
          </label>
        );
      })}
    </>
  );
};

const StyledRadio = styled.div<RadioProps<FormControlValue>>`
  height: 88px;
  border-radius: 12px;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.primaryLight2 : colors.white};
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  color: ${colors.title};
  padding-left: 22px;
  align-items: center;
  padding-right: 22px;
  border: ${({ isSelected }) =>
    `1.5px solid ${isSelected ? colors.primaryLight2 : colors.line}`};
`;

const ImageContainer = styled.div`
  padding-right: 16px;
`;

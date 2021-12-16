import React, {
  ChangeEvent,
  ReactElement,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { FormControlValue, Option } from "types/types";
import styled, { css } from "styled-components";
import { colors, transparent } from "styles/colors";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";
import { IconProps } from "components/icon/iconType";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { createPortal } from "react-dom";
import { screenHeight } from "styles/GlobalStyle";
import { screenSize } from "utils/window";

interface SelectProps<T extends FormControlValue>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option<T>[] | undefined;
  onChoose: (value: FormControlValue) => void;
  placeholder?: string;
  enableSearch?: boolean;
  floatDropdown?: boolean;
  onSearch?: (value: string) => void;
  prefixIcon?: ({ color }: IconProps) => JSX.Element;
  suffixIcon?: ({ color }: IconProps) => JSX.Element;
  errorIcon?: ({ color }: IconProps) => JSX.Element;
  isShowDropDownByValue?: boolean;
  noOptionText?: string;
  dropdownBackground?: string;
  disabled?: boolean;
  isFloatAtBottom?: boolean;
}

interface InputProps {
  inputValue: string;
  hasOptions?: boolean;
  isNoOptionMode?: boolean;
}

export const Select = <T extends FormControlValue>({
  options,
  placeholder,
  value,
  onChoose,
  enableSearch = false,
  floatDropdown = false,
  onSearch,
  prefixIcon,
  suffixIcon,
  isShowDropDownByValue = false,
  errorIcon,
  noOptionText,
  dropdownBackground = colors.white,
  isFloatAtBottom = true,
  disabled,
}: SelectProps<T>): ReactElement => {
  const { t } = useTranslation();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getOptionLabel = (value: FormControlValue) => {
    const labelKey = options?.find((option) => {
      return option.value === value;
    })?.label;
    return t(labelKey || "");
  };
  const [showOptionArea, setShowOptionArea] = useState(false);
  const [inputValue, setInputValue] = useState(
    () => getOptionLabel(value) || ""
  );
  const [isNoOptionMode, setIsNoOptionMode] = useState(false);
  const onSelect = ({ value }: Option<T>) => {
    onChoose(value);
    setInputValue(getOptionLabel(value));
  };
  useEffect(() => setInputValue(getOptionLabel(value)), [value]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    onSearch && onSearch(inputValue);
  };
  const renderDropdown = () => {
    const domEl = document.querySelector("body");
    const rect = inputRef.current?.getBoundingClientRect();

    const dropdownComponent = (
      <StyledOptionArea
        bgColor={dropdownBackground}
        floatDropdown={floatDropdown}
      >
        {options?.map((option, index) => (
          <StyledOption
            key={index}
            isSelected={t(option.label) === inputValue}
            onMouseDown={() => {
              onSelect(option);
            }}
          >
            {enableSearch ? option.label : t(option.label)}
          </StyledOption>
        ))}
      </StyledOptionArea>
    );
    return floatDropdown && domEl
      ? createPortal(
          <StyledFloatDropdown rect={rect} isFloatAtBottom={isFloatAtBottom}>
            {dropdownComponent}
          </StyledFloatDropdown>,
          domEl
        )
      : dropdownComponent;
  };
  const noOptionFoundWithInputValue = inputValue && options?.length == 0;
  return (
    <SelectContainer>
      <SelectAndIconContainer
        ref={inputRef}
        inputValue={inputValue}
        hasOptions={options && options?.length > 0}
        isNoOptionMode={isNoOptionMode && inputValue !== ""}
      >
        {prefixIcon ? (
          <StyledPrefixIconContainer>
            <span className={"defaultPrefixIcon"}>
              {prefixIcon({ color: colors.placeholder })}
            </span>
            <span className={"selectedPrefixIcon"}>
              {prefixIcon({ color: colors.title })}
            </span>

            <span className={"focusedPrefixIcon"}>
              {prefixIcon({ color: colors.primary1 })}
            </span>
          </StyledPrefixIconContainer>
        ) : null}
        <StyledSelect
          value={inputValue}
          type="text"
          onBlur={() => {
            setTimeout(() => {
              setShowOptionArea(false);
            }, 100);
            setIsNoOptionMode(true);
          }}
          onFocus={() => {
            setShowOptionArea(true);
            setIsNoOptionMode(true);
          }}
          onChange={handleInputChange}
          readOnly={!enableSearch}
          placeholder={placeholder || t("common.select")}
          inputValue={inputValue}
          disabled={disabled}
        />
        {suffixIcon && options && options.length > 0 && (
          <StyledSuffixIconContainer isOpen={showOptionArea}>
            <span className={"defaultSuffixIcon"}>
              {suffixIcon({ color: colors.placeholder })}
            </span>
            <span className={"focusedSuffixIcon"}>
              {suffixIcon({ color: colors.primary1 })}
            </span>
          </StyledSuffixIconContainer>
        )}
        {errorIcon && noOptionFoundWithInputValue && (
          <StyledErrorIconContainer>
            {errorIcon({ color: colors.error })}
          </StyledErrorIconContainer>
        )}
      </SelectAndIconContainer>
      {showOptionArea &&
        options &&
        options.length > 0 &&
        (!isShowDropDownByValue || !!inputValue) &&
        renderDropdown()}

      {noOptionFoundWithInputValue && isNoOptionMode && (
        <StyledOptionArea
          bgColor={dropdownBackground}
          floatDropdown={floatDropdown}
        >
          <NoOptionText>
            <TextLegalMedium>{t(noOptionText || "")}</TextLegalMedium>
          </NoOptionText>
        </StyledOptionArea>
      )}
    </SelectContainer>
  );
};

const StyledSelect = styled.input<InputProps>`
  ${TextMediumRegularStyle};
  height: 56px;
  width: 100%;
  border: none;
  border-radius: 16px;
  padding-right: 22px;
  padding-left: 12px;
  &::placeholder {
    color: ${colors.placeholder};
  }
  :focus {
    &::placeholder {
      color: ${colors.placeholder};
    }
  }
  @media (max-width: ${screenSize.mobileS}) {
    height: 40px;
  }
`;

const selectedStyle = css`
  background-color: ${transparent("red", 0.25)};
  color: ${colors.title};
  font-weight: 600;
`;

const StyledOption = styled.div<{ isSelected: boolean }>`
  ${TextMediumRegularStyle};
  height: 50px;
  width: 100%;
  border-radius: 15px;
  :hover {
    ${selectedStyle}
  }
  ${({ isSelected }) => isSelected && selectedStyle};
  flex-shrink: 0;
  line-height: 50px;
  padding: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  :not(:last-child) {
    margin-bottom: 2px;
  }
  text-align: left;
`;
const NoOptionText = styled.div`
  width: 100%;
  border-radius: 15px;
  padding: 12px 5px;
`;

interface DropdownProps {
  rect: DOMRect;
  isFloatAtBottom: boolean;
}

const StyledFloatDropdown = styled.div<DropdownProps>`
  position: absolute;
  ${({ isFloatAtBottom }) =>
    isFloatAtBottom ? StyledFloatAtBottomCss : StyledFloatAtTopCss};
  left: ${({ rect }) => rect.left}px;
  width: ${({ rect }) => rect.width}px;
  z-index: 100;
  background: ${colors.white};
  box-shadow: 0 8px 16px rgba(17, 17, 17, 0.04);
  border-radius: 15px;
`;

const StyledFloatAtTopCss = css<{ rect: DOMRect }>`
  bottom: ${({ rect }) => screenHeight - rect.top - window.scrollY + 16}px;
`;

const StyledFloatAtBottomCss = css<{ rect: DOMRect }>`
  top: ${({ rect }) => window.scrollY + rect.bottom}px;
`;

const StyledOptionArea = styled.div<{
  bgColor: string;
  floatDropdown: boolean;
}>`
  width: 100%;
  max-height: ${({ floatDropdown }) =>
    floatDropdown ? "288px" : screenHeight > 650 ? "245px" : "195px"};
  overflow: scroll;
  background: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 16px ${transparent("title", 0.1)};
  border-radius: 16px;
  margin-top: 13px;
  div:first-child {
    margin-top: 13px;
  }
  padding: 0 12px 12px;
`;

const StyledSuffixIconContainer = styled.div<{ isOpen: boolean }>`
  margin-right: 10px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `};
`;
const StyledErrorIconContainer = styled.div`
  margin-right: 10px;
`;

const StyledPrefixIconContainer = styled.div`
  margin-left: 12px;
  padding-right: 6px;
`;

const SelectContainer = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SelectAndIconContainer = styled.div<InputProps>`
  width: 100%;
  position: relative;
  border-radius: 16px;
  border: 1px solid ${colors.placeholder};
  background-color: ${colors.white};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  ${StyledPrefixIconContainer} {
    .focusedPrefixIcon {
      display: none;
    }
    .defaultPrefixIcon {
      display: ${({ inputValue }) =>
        inputValue === "" ? "inline-block" : "none"};
    }
    .selectedPrefixIcon {
      display: ${({ inputValue }) =>
        inputValue === "" ? "none" : "inline-block"};
    }
  }
  ${StyledSuffixIconContainer} {
    .focusedSuffixIcon {
      display: none;
    }
    .defaultSuffixIcon {
      display: inline-block;
    }
  }
  border-color: ${({ hasOptions, isNoOptionMode }) =>
    !hasOptions && isNoOptionMode ? colors.error : colors.primaryLight1};
  :focus-within {
    border-color: ${({ hasOptions, isNoOptionMode }) =>
      !hasOptions && isNoOptionMode ? colors.error : colors.error};
    input {
      color: ${colors.title};
    }

    ${StyledSuffixIconContainer} {
      .focusedSuffixIcon {
        display: inline-block;
      }
      .defaultSuffixIcon {
        display: none;
      }
    }
    ${StyledPrefixIconContainer} {
      .focusedPrefixIcon {
        display: inline-block;
      }
      .defaultPrefixIcon,
      .selectedPrefixIcon {
        display: none;
      }
    }
  }
`;

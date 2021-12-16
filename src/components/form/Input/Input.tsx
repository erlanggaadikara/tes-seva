import React, { InputHTMLAttributes, ReactElement, ForwardedRef } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  suffixIcon?: () => JSX.Element;
  prefixComponent?: () => JSX.Element;
  prefixMarginRight?: number;
  bottomComponent?: () => JSX.Element;
  height?: number;
}

const noForwardRefInput = (
  {
    type,
    onFocus,
    onBlur,
    prefixComponent,
    suffixIcon,
    bottomComponent,
    prefixMarginRight = 0,
    height = 54,
    ...restProps
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement => {
  return (
    <StyledContainer>
      <StyledInputArea {...restProps} height={height}>
        {prefixComponent && prefixComponent()}
        <StyledInput
          type={type}
          ref={ref}
          {...restProps}
          onFocus={onFocus}
          onBlur={onBlur}
          prefixMarginRight={prefixMarginRight}
        />
        {suffixIcon && suffixIcon()}
      </StyledInputArea>
      {bottomComponent && bottomComponent()}
    </StyledContainer>
  );
};
export const Input = React.forwardRef(noForwardRefInput);

const StyledContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
`;
const StyledInputArea = styled.div<{ height: number }>`
  padding-left: 12px;
  padding-right: 12px;
  height: ${({ height }) => height}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${colors.white};
  border: 1.5px solid ${colors.line};
  border-radius: 16px;
  :focus-within {
    border-color: ${colors.primaryLight1};
  }
`;
const StyledInput = styled.input<{ prefixMarginRight: number }>`
  ${TextMediumRegularStyle};
  margin-left: ${({ prefixMarginRight }) => prefixMarginRight}px;
  width: 100%;
  border: 0;
  padding: 0;
  color: ${colors.title};
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  ::placeholder {
    color: ${colors.placeholder};
    ${TextMediumRegularStyle}
  }
`;

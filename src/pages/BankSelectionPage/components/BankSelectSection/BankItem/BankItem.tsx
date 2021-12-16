import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors, transparent } from "styles/colors";
export interface BankItemProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  width?: string;
  name?: string;
  children?: React.ReactChild;
}
export const BankItem = ({
  imageUrl,
  width,
  children,
  ...restProps
}: BankItemProps) => {
  return (
    <StyledBankItem {...restProps}>
      {imageUrl && <img src={imageUrl} alt="bank" width={width} />}
      {children}
    </StyledBankItem>
  );
};
const StyledBankItem = styled.div`
  width: 156px;
  height: 140px;
  background: ${colors.white};
  box-shadow: 0 1px 16px ${transparent("title", 0.1)};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;

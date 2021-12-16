import React from "react";
import styled from "styled-components";
import { IconProps } from "components/icon/iconType";
import { TextLegalMedium } from "components/typography/TextLegalMedium";

export interface SpecificationItemProps {
  icon: (props: IconProps) => JSX.Element;
  description: string;
}

export const SpecificationItem = ({
  icon,
  description,
}: SpecificationItemProps) => {
  return (
    <StyledSpecificationItem>
      <StyledIcon>{icon({ width: "24px", height: "24px" })}</StyledIcon>

      <TextLegalMedium>{description}</TextLegalMedium>
    </StyledSpecificationItem>
  );
};
const StyledSpecificationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledIcon = styled.div`
  margin-bottom: 4px;
`;

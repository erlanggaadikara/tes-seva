import React from "react";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import styled from "styled-components";
import { IconProps } from "components/icon/iconType";
import { colors } from "styles/colors";

export interface SpecificationItemProps {
  title: string;
  icon: (props: IconProps) => JSX.Element;
  content: string;
}

export const SpecificationItem = ({
  title,
  content,
  icon,
}: SpecificationItemProps) => {
  return (
    <StyledItemWrapper>
      <StyledTitle>
        <LinkLabelLegalSemiBold>{title}</LinkLabelLegalSemiBold>
      </StyledTitle>
      <StyledIcon>{icon({ color: colors.label })}</StyledIcon>
      <StyledContent>
        <LinkLabelXSmallSemiBold>{content}</LinkLabelXSmallSemiBold>
      </StyledContent>
    </StyledItemWrapper>
  );
};

const StyledItemWrapper = styled.div`
  min-width: 95px;
  min-height: 95px;
  background: ${colors.offWhite};
  border: 1px solid ${colors.line};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  margin-bottom: 14px;
  padding-left: 6px;
  padding-right: 6px;
  justify-content: space-between;
`;
const StyledTitle = styled.div`
  padding: 14px 0 0 0;
  align-self: center;
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${colors.placeholder};
`;
const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 12px 0;
  color: ${colors.title};
`;
const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0 6px 0;
`;

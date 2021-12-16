import React from "react";
import styled from "styled-components";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { colors, transparent } from "styles/colors";
import { Pen } from "components/icon/Pen/Pen";
interface EditableProps {
  title: string;
  value: string | number;
  width?: string;
}
export const Editable = ({ title, value, width = "100%" }: EditableProps) => {
  return (
    <StyledEditable width={width}>
      <StyledTextSection>
        <StyledTitle>
          <LinkLabelMediumSemiBold>{title}</LinkLabelMediumSemiBold>
        </StyledTitle>
        <StyledValue>{value}</StyledValue>
      </StyledTextSection>
      <StyledIconSection>
        <Pen />
      </StyledIconSection>
    </StyledEditable>
  );
};
const StyledEditable = styled.section<Pick<EditableProps, "width">>`
  width: ${({ width }) => width};
  display: flex;
  justify-content: space-between;
  background: ${colors.white};
  box-shadow: 0 1px 16px ${transparent("title", 0.1)};
  border-radius: 16px;
`;
const StyledTextSection = styled.div`
  width: 86%;
  padding: 22px;
`;
const StyledIconSection = styled.div`
  width: 13%;
  padding: 16px 16px 0 0;
`;
const StyledTitle = styled.p`
  margin-bottom: 13px;
`;
const StyledValue = styled(TextSmallRegular)`
  color: ${colors.label};
  display: block;
`;

import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";

interface FiledSectionProps extends HTMLAttributes<HTMLDivElement> {
  fieldLabel: string;
}

export const FiledSection = ({ children, fieldLabel }: FiledSectionProps) => {
  const { t } = useTranslation();
  return (
    <StyledFieldSection>
      <StyledFieldLabel
        dangerouslySetInnerHTML={{
          __html: t(fieldLabel),
        }}
      />

      {children}
    </StyledFieldSection>
  );
};
const StyledFieldSection = styled.section`
  text-align: left;
  margin-bottom: 24px;
`;
const StyledFieldLabel = styled(TextLegalRegular)`
  margin-bottom: 10px;
  display: block;
  color: ${colors.body};
`;

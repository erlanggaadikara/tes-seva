import React, { ReactElement } from "react";
import styled from "styled-components";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { UncheckedSquareOutlined } from "components/icon/UncheckedSquareOutlined/UncheckedSquareOutlined";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { CheckboxItemType } from "./CheckboxItem";
import { TextXSmallMediumStyle } from "components/typography/TextXSmallMedium";

interface SubCheckboxItemProps {
  itemData: CheckboxItemType;
  onItemClick?: (value: CheckboxItemType) => void;
}

export const SubCheckboxItem = ({
  itemData,
  onItemClick,
}: SubCheckboxItemProps): ReactElement => {
  const { t } = useTranslation();
  const { value, isChecked, label } = itemData;
  const labelLocalize = t(label);
  const onClick = () => {
    !!onItemClick
      ? onItemClick({
          value,
          label,
          isChecked: !isChecked,
        })
      : null;
  };
  return (
    <StyledContainer onClick={onClick}>
      <StyledIcon>
        {isChecked ? <CheckedSquareOutlined /> : <UncheckedSquareOutlined />}
      </StyledIcon>
      <StyledTextArea isChecked={isChecked}>{labelLocalize}</StyledTextArea>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  &:hover {
    cursor: pointer;
  }
`;
const StyledIcon = styled.div`
  margin-left: 16px;
  margin-right: 12px;
  width: 24px;
  height: 24px;
`;
const StyledTextArea = styled.div<{ isChecked: boolean }>`
  padding: 12px 16px 12px 16px;
  width: 100%;
  border-radius: 12px;
  border: ${(props) =>
    `1.5px solid ${props.isChecked ? colors.primaryLight2 : colors.line}`};
  background: ${(props) =>
    props.isChecked ? colors.primaryLight2 : colors.white};
  color: ${colors.title};
  ${TextXSmallMediumStyle}
`;

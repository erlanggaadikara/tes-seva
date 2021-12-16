import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { UncheckedSquareOutlined } from "components/icon/UncheckedSquareOutlined/UncheckedSquareOutlined";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import { SubCheckboxItem } from "./SubCheckboxItem";

interface CheckboxItemProps {
  itemData: CheckboxItemType;
  onItemClick?: (value: CheckboxItemType) => void;
  showIcon: boolean;
}

interface StyledContainerProps {
  isChecked: boolean;
  showIcon: boolean;
}

export type CheckboxItemType = {
  value: string;
  label: string;
  isChecked: boolean;
  image?: () => ReactElement;
  subOptions?: CheckboxItemType[];
};

export const CheckboxItem = ({
  itemData,
  onItemClick,
  showIcon,
}: CheckboxItemProps): ReactElement => {
  const { t } = useTranslation();
  const { value, label, isChecked, image, subOptions } = itemData;
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
    <div>
      <StyledContainer
        key={value}
        isChecked={isChecked}
        onClick={onClick}
        showIcon={showIcon}
      >
        {showIcon && (
          <StyledIcon>
            {isChecked ? (
              <CheckedSquareOutlined />
            ) : (
              <UncheckedSquareOutlined />
            )}
          </StyledIcon>
        )}
        {image && <ImageContainer>{image()}</ImageContainer>}
        <StyledTextArea isChecked={isChecked}>{labelLocalize}</StyledTextArea>
      </StyledContainer>

      {/*sub options*/}
      {isChecked &&
        subOptions?.map((data) => {
          return (
            <SubCheckboxItem
              key={data.value}
              itemData={data}
              onItemClick={onItemClick}
            />
          );
        })}
    </div>
  );
};
const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 88px;
  border-radius: 12px;
  border: ${(props) =>
    `1.5px solid ${props.isChecked ? colors.primaryLight2 : colors.line}`};
  background: ${(props) =>
    props.isChecked ? colors.primaryLight2 : colors.white};
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const StyledIcon = styled.div`
  margin-left: 14px;
  margin-right: 12px;
  width: 24px;
  height: 24px;
`;
const StyledTextArea = styled.div<{ isChecked: boolean }>`
  margin-right: 12px;
  ${({ isChecked }) => (isChecked ? CheckedStyle : UncheckedStyle)}
`;
const UncheckedStyle = css`
  color: ${colors.title};
  ${TextMediumRegularStyle}
`;
const CheckedStyle = css`
  color: ${colors.title};
  ${LinkLabelMediumSemiBoldStyle}
`;
const ImageContainer = styled.div`
  padding: 0 16px 0 22px;
`;

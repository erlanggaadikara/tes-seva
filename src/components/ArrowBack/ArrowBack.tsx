import React from "react";
import { ArrowLeftOutlined } from "components/icon/ArrowLeftOutlined/ArrowLeftOutlined";
import { colors } from "styles/colors";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface ArrowBackProps {
  backUrl?: string;
  onClick?: () => void;
  fill?: string;
}

export const ArrowBack = ({
  backUrl,
  onClick,
  fill = colors.primary1,
  ...restProps
}: ArrowBackProps) => {
  const history = useHistory();

  const handleGoBack = () => {
    backUrl ? history.push(backUrl) : history.goBack();
  };

  return (
    <StyledWrapper onClick={!onClick ? handleGoBack : onClick} {...restProps}>
      <ArrowLeftOutlined width={24} height={24} color={fill} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

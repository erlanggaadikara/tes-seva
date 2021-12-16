import React from "react";
import { ArrowLeftOutlined } from "components/icon/ArrowLeftOutlined/ArrowLeftOutlined";
import { colors } from "styles/colors";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { CarVariantLoan } from "types/types";
import { LocalStorageKey } from "models/models";
import { variantListUrl } from "routes/routes";

interface ArrowBackProps {
  backUrl?: string;
  onClick?: () => void;
  fill?: string;
}

export const ArrowBack2 = ({
  fill = colors.primary1,
  ...restProps
}: ArrowBackProps) => {
  const history = useHistory();
  const [selectedLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    history.push(variantListUrl.replace(":id", selectedLoanDetails.modelId));
  };

  return (
    <StyledWrapper onClick={handleClick} {...restProps}>
      <ArrowLeftOutlined width={24} height={24} color={fill} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

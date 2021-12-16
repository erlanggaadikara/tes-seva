import { Button, ButtonType } from "components/Button/Button";
import { WhatsAppIcon } from "components/icon/WhatsApp/WhatsAppIcon";
import { colors } from "styles/colors";
import React from "react";
import styled from "styled-components";

interface WhatAppButtonProps {
  text: string;
}
export const WhatAppButton = ({ text }: WhatAppButtonProps) => {
  const onWhatAppButtonClick = () => {
    // TODO
  };

  return (
    <StyledContactButtonWrapper>
      <StyledContactButton
        buttonType={ButtonType.primary1}
        onClick={onWhatAppButtonClick}
      >
        {text}
      </StyledContactButton>
      <StyledIconWrapper>
        <WhatsAppIcon color={colors.white} />
      </StyledIconWrapper>
    </StyledContactButtonWrapper>
  );
};
const StyledContactButtonWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
  position: relative;
`;
const StyledContactButton = styled(Button)`
  width: 100%;
`;
const StyledIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 32px;
  top: 10px;
`;

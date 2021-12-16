import { IconButton } from "components/IconButton/IconButton";
import { ButtonType } from "components/Button/Button";
import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { WhatsAppIcon } from "components/icon/WhatsApp/WhatsAppIcon";
import { useTranslation } from "react-i18next";
import { TextMediumRegular } from "components/typography/TextMediumRegular";

interface WhatsAppContactUsProps {
  onContactUsClick: () => void;
  loading: boolean;
  showDescription?: boolean;
  disabled?: boolean;
  buttonText?: string;
}

export const WhatsAppContactUs = ({
  onContactUsClick,
  loading,
  showDescription = true,
  disabled = false,
  buttonText = "common.contactUs",
}: WhatsAppContactUsProps) => {
  const { t } = useTranslation();

  const whatsAppIcon = () => {
    return (
      <StyledIconWrapper
        background={disabled ? colors.label : colors.secondary}
      >
        <WhatsAppIcon color={colors.white} />
      </StyledIconWrapper>
    );
  };

  return (
    <>
      {showDescription && (
        <StyledButtonMessage>
          {t("common.contactUsMessage")}
        </StyledButtonMessage>
      )}
      <IconButton
        width="100%"
        disabled={disabled}
        buttonType={ButtonType.primary1}
        onClick={disabled ? undefined : onContactUsClick}
        suffixIcon={whatsAppIcon}
        loading={loading}
      >
        {t(buttonText)}
      </IconButton>
    </>
  );
};

const StyledButtonMessage = styled(TextMediumRegular)`
  color: ${colors.label};
  margin-bottom: 10px;
  padding: 0 8px;
  text-align: center;
`;

const StyledIconWrapper = styled.div<{ background: string }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ background }) => background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

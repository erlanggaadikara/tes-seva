import React from "react";
import styled from "styled-components";
import { useModal } from "components/Modal/Modal";
import { LinkLabelLargeSemiBoldStyle } from "components/typography/LinkLabelLargeSemiBold";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";
import { Button, ButtonType } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { maxPageWidth } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { Close } from "components/icon/Close/Close";
interface DialogModalProps {
  title?: string;
  desc?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isNeedCancelButton?: boolean;
  confirmButtonLoading?: boolean;
  shouldCloseOnConfirm?: boolean;
  modalImage?: JSX.Element;
  isCloseIconShow?: boolean;
}

export const useDialogModal = () => {
  const { showModal, hideModal, RenderModal } = useModal();
  const { t } = useTranslation();
  const DialogModal = ({
    title,
    desc,
    confirmButtonText = t("common.ok"),
    cancelButtonText = t("common.cancel"),
    onConfirm = hideModal,
    onCancel = hideModal,
    isNeedCancelButton,
    confirmButtonLoading,
    shouldCloseOnConfirm = true,
    modalImage,
    isCloseIconShow,
  }: DialogModalProps) => {
    const onClickOK = (e: React.MouseEvent) => {
      e.stopPropagation();
      onConfirm && onConfirm();
      shouldCloseOnConfirm && hideModal();
    };
    const onClickCancel = (e: React.MouseEvent) => {
      e.stopPropagation();
      onCancel && onCancel();
      hideModal();
    };
    return (
      <RenderModal blur={"22.8438px"}>
        <StyledContainer>
          <StyledContent>
            {isCloseIconShow && (
              <StyledCloseIcon onClick={onClickCancel}>
                <Close color={colors.primary1} />
              </StyledCloseIcon>
            )}
            {title && <StyledTitle>{title}</StyledTitle>}
            {modalImage}
            <StyledDesc>{desc}</StyledDesc>
            <StyledButton
              buttonType={ButtonType.primary1}
              onClick={onClickOK}
              loading={confirmButtonLoading}
            >
              {confirmButtonText}
            </StyledButton>
            {isNeedCancelButton && (
              <StyledButton
                buttonType={ButtonType.subtle}
                onClick={onClickCancel}
              >
                {cancelButtonText}
              </StyledButton>
            )}
          </StyledContent>
        </StyledContainer>
      </RenderModal>
    );
  };

  return { DialogModal, hideModal, showModal };
};

const StyledContainer = styled.div`
  width: ${maxPageWidth};
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 16px;
`;

const StyledContent = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  text-align: center;
  flex: 1;
  padding: 24px 24px 12px;
  position: relative;
`;
const StyledTitle = styled.p`
  ${LinkLabelLargeSemiBoldStyle};
  margin: 40px 23px;
`;
const StyledDesc = styled.p`
  ${TextMediumRegularStyle};
  margin: 35px 0 30px 0;
  color: ${colors.label};
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 12px;
`;
const StyledCloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

import React, { HTMLAttributes, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { CloseOutlined } from "components/icon/CloseOutlined/CloseOutlined";
import { createPortal } from "react-dom";
import { maxPageWidth } from "styles/GlobalStyle";
import { isMobileDevice } from "utils/window";

export enum ToastType {
  Error = "Error",
  Success = "Success",
  Info = "Info",
}

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  type: ToastType;
  message: string;
  onClose?: () => void;
  isDismissible?: boolean;
  duration?: number; // in seconds
}

const MILLISECONDS_IN_A_SECOND = 1000;

const ToastComponent = ({
  type,
  message,
  isDismissible = true,
  onClose = () => ({}),
  duration = 5,
}: ToastProps) => {
  const domEl = document.querySelector("body");
  if (!domEl) return null;

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, duration * MILLISECONDS_IN_A_SECOND);
  }, []);

  return createPortal(
    <StyledToastContainer>
      <StyledToastWrapper type={type} hasCloseIcon={isDismissible}>
        <TextLegalMedium>{message}</TextLegalMedium>
        {isDismissible && (
          <StyledCloseButton onClick={onClose}>
            <CloseOutlined color={colors.offWhite} />
          </StyledCloseButton>
        )}
      </StyledToastWrapper>
    </StyledToastContainer>,
    domEl
  );
};

const Toast = React.memo(ToastComponent);

export const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = () => setIsVisible(true);
  const hideToast = () => setIsVisible(false);

  const RenderToast = ({ ...props }: ToastProps) => (
    <>{isVisible && <Toast onClose={hideToast} {...props} />}</>
  );

  return {
    showToast,
    hideToast,
    RenderToast,
  };
};

interface ToastWrapperProps {
  type: ToastType;
  hasCloseIcon: boolean;
}

const StyledToastContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: ${maxPageWidth};
  z-index: 1000;

  ${isMobileDevice
    ? css`
        bottom: 0;
      `
    : css`
        top: 0;
      `};
`;

const ErrorStyle = css`
  background: ${colors.error};
`;

const SuccessStyle = css`
  background: ${colors.success};
`;

const InfoStyle = css`
  background: ${colors.body};
`;
const StyledToastWrapper = styled.div<ToastWrapperProps>`
  width: 100%;
  min-height: 72px;
  color: ${colors.offWhite};
  display: flex;
  justify-content: space-around;
  padding: 25px 16px;

  ${({ type }) => {
    switch (type) {
      case ToastType.Error:
        return ErrorStyle;
      case ToastType.Success:
        return SuccessStyle;
      case ToastType.Info:
        return InfoStyle;
      default:
        return InfoStyle;
    }
  }}

  ${({ hasCloseIcon }) =>
    hasCloseIcon &&
    css`
      justify-content: space-between;
      align-items: center;
    `};
`;

const StyledCloseButton = styled.div`
  :hover {
    cursor: pointer;
  }
`;

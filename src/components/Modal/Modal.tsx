import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import { colors, transparent as colorsTransparent } from "styles/colors";
import { ZIndex } from "styles/zIndex";

interface ModalProps {
  children?: React.ReactChild;
  onClose?: () => void;
  width?: string;
  className?: string;
  transparent?: boolean;
  background?: string;
  blur?: string;
}

const ModalComponent = ({
  children,
  className,
  transparent = false,
  background = colorsTransparent("placeholder", 0.3),
  blur = "8px",
}: ModalProps) => {
  const domEl = document.querySelector("body");
  if (!domEl) return null;

  return createPortal(
    <Container
      className={className}
      transparent={transparent}
      background={background}
      blur={blur}
    >
      {children}
    </Container>,
    domEl
  );
};
export const Modal = React.memo(ModalComponent);

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // prevent page scrolling when modal is open
    document.body.style.overflow = isVisible ? "hidden" : "unset";
  }, [isVisible]);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  const RenderModal = ({ children, ...restProps }: ModalProps) => (
    <>
      {isVisible && (
        <Modal onClose={hideModal} {...restProps}>
          {children}
        </Modal>
      )}
    </>
  );

  return {
    showModal,
    hideModal,
    RenderModal,
    isVisible,
  };
};

type StyleProps = Pick<ModalProps, "transparent" | "background" | "blur">;

const Container = styled.div<StyleProps>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZIndex.Modal};
  overflow-y: scroll;

  ${({ transparent, background }) =>
    transparent
      ? css`
          background: ${colors.white};
          opacity: 0;
        `
      : css`
          background: ${background};
        `};
  backdrop-filter: ${({ blur }) => `blur(${blur})`};
  display: flex;
  justify-content: center;
`;

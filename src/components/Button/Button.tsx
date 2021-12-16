import React, { ButtonHTMLAttributes, useMemo } from "react";
import styled, { css, keyframes } from "styled-components";
import { colors, transparent } from "styles/colors";
import {
  LinkLabelSmallSemiBold,
  LinkLabelSmallSemiBoldStyle,
} from "components/typography/LinkLabelSmallSemiBold";
import { Loading } from "components/icon/Loading/Loading";
import { useTranslation } from "react-i18next";

export enum ButtonType {
  primary1 = "primary1",
  primary2 = "primary2",
  secondary1 = "secondary1",
  secondary2 = "secondary2",
  secondary3 = "secondary3",
  subtle = "subtle",
  red = "red",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  width?: number | string;
  height?: number | string;
  loading?: boolean;
}

export const Button = ({
  children,
  width,
  height = "50px",
  loading,
  buttonType = ButtonType.primary1,
  ...restProps
}: ButtonProps) => {
  const { t } = useTranslation();
  const getLoadingColor = () => {
    switch (buttonType) {
      case ButtonType.primary1:
        return colors.offWhite;
      case ButtonType.primary2:
      case ButtonType.secondary2:
        return colors.title;
      case ButtonType.secondary1:
        return colors.primary1;
      case ButtonType.secondary3:
        return colors.title;
      case ButtonType.red:
        return colors.white;
      default:
        return colors.offWhite;
    }
  };
  const hoverColor = useMemo(() => {
    switch (buttonType) {
      case ButtonType.primary1:
        return colors.primary2;
      case ButtonType.primary2:
      case ButtonType.secondary3:
        return colors.secondaryLight;
      case ButtonType.secondary2:
        return colors.secondaryLight;
      case ButtonType.secondary1:
        return colors.primaryLight3;
      case ButtonType.red:
        return colors.primaryLight3;
      default:
        return colors.primary2;
    }
  }, [buttonType]);

  const getLoadingComponent = (buttonType: ButtonType) => {
    return buttonType !== ButtonType.subtle ? (
      <StyledLoading color={getLoadingColor()} />
    ) : (
      <LinkLabelSmallSemiBold>{t("common.loadingMsg")}</LinkLabelSmallSemiBold>
    );
  };

  return (
    <StyledButton
      width={width}
      height={height}
      buttonType={buttonType}
      $loading={loading}
      hoverColor={hoverColor}
      {...restProps}
    >
      {loading ? getLoadingComponent(buttonType) : children}
    </StyledButton>
  );
};

const borderWidth = "8px";

const hoverStyle = (hoverColor: string) => css`
  :hover:enabled {
    :after {
      position: absolute;
      top: -${borderWidth};
      right: -${borderWidth};
      bottom: -${borderWidth};
      left: -${borderWidth};
      content: "";
      border-radius: 24px;
      opacity: 0.8;
      border: ${borderWidth} solid ${hoverColor};
    }
  }
`;

const Primary1Style = (loading: boolean, hoverColor: string) => css`
  background: ${colors.primary1};
  color: ${colors.white};
  border: none;

  ${!loading && hoverStyle(hoverColor)}

  :active {
    background: ${colors.title};
    color: ${colors.white};
  }

  :disabled {
    background: ${colors.placeholder};
    color: ${colors.background};
  }
`;
const Primary2Style = (loading: boolean, hoverColor: string) => css`
  background: ${colors.secondary};
  color: ${colors.title};
  border: none;

  ${!loading && hoverStyle(hoverColor)}

  :active {
    background: ${colors.secondaryText};
    color: ${colors.title};
  }

  :disabled {
    background: ${colors.secondaryLight};
    color: ${colors.placeholder};
  }
`;
const Secondary1Style = (loading: boolean, hoverColor: string) => css`
  color: ${colors.primary1};
  background: ${colors.white};
  border: 2px solid ${colors.primaryLight1};

  ${!loading && hoverStyle(hoverColor)}

  :active {
    color: ${colors.primary1};
    background: ${colors.white};
    border: 2px solid ${colors.primaryLight1};
  }

  :disabled {
    color: ${colors.label};
    background: ${transparent("white", 0.5)};
    border: 2px solid ${colors.label};
  }
`;
const Secondary2Style = (loading: boolean, hoverColor: string) => css`
  color: ${colors.title};
  background: ${colors.white};
  border: 2px solid ${colors.secondary};

  ${!loading && hoverStyle(hoverColor)}

  :active {
    background: ${colors.white};
    color: ${colors.title};
    border: 2px solid ${colors.secondary};
  }

  :disabled {
    color: ${colors.label};
    background: ${transparent("white", 0.5)};
    border: 2px solid ${colors.label};
  }
`;
const Secondary3Style = (loading: boolean, hoverColor: string) => css`
  color: ${colors.title};
  background: ${colors.white};
  border: 2px solid ${colors.primary1};

  ${!loading && hoverStyle(hoverColor)}

  :active {
    background: ${colors.white};
    color: ${colors.title};
    border: 2px solid ${colors.secondary};
  }

  :disabled {
    color: ${colors.label};
    background: ${transparent("white", 0.5)};
    border: 2px solid ${colors.label};
  }
`;
const SubtleStyle = (loading: boolean) => css`
  color: ${colors.primary1};
  background: none;
  border: none;

  ${!loading &&
  css`
    :hover {
      background: ${colors.primary2};
      opacity: 0.8;
      border: ${borderWidth} solid ${colors.primary2};
      border-radius: 40px;
      padding: 0 20px;
    }
  `}

  :active {
    color: ${colors.primary1};
  }

  :disabled {
    color: ${colors.label};
  }
`;

const ButtonRedStyle = (loading: boolean, hoverColor: string) => css`
  background: ${colors.red};
  color: ${colors.white};
  border: none;
  margin-top: -4vh;
  @media (max-width: 700px) {
    height: 38px;
    margin-top: 5vh;
    background-size: contain;
  }
  ${!loading && hoverStyle(hoverColor)}

  :active {
    background: ${colors.secondaryText};
    color: ${colors.title};
  }

  :disabled {
    background: ${colors.secondaryLight};
    color: ${colors.placeholder};
  }
`;
const StyledButton = styled.button<{
  width?: number | string;
  height?: number | string;
  buttonType: ButtonType;
  $loading?: boolean;
  hoverColor: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;

  :hover {
    cursor: pointer;
  }
  :disabled {
    cursor: default;
  }

  ${LinkLabelSmallSemiBoldStyle}

  ${({ buttonType, $loading = false, hoverColor }) => {
    switch (buttonType) {
      case ButtonType.primary1:
        return Primary1Style($loading, hoverColor);
      case ButtonType.primary2:
        return Primary2Style($loading, hoverColor);
      case ButtonType.secondary1:
        return Secondary1Style($loading, hoverColor);
      case ButtonType.secondary2:
        return Secondary2Style($loading, hoverColor);
      case ButtonType.secondary3:
        return Secondary3Style($loading, hoverColor);
      case ButtonType.red:
        return ButtonRedStyle($loading, hoverColor);
      case ButtonType.subtle:
        return SubtleStyle($loading);
      default:
        return Primary1Style($loading, hoverColor);
    }
  }}
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoading = styled(Loading)`
  animation: ${rotate} 1s linear infinite;
`;

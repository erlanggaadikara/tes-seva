import React from "react";
import { HTMLAttributes } from "react";
import { Placeholder } from "components/icon/Placeholder/Placeholder";
import styled from "styled-components";

interface PlaceholderImageProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

export const PlaceholderImage = ({
  width = "100%",
  height = "100%",
  backgroundColor = "radial-gradient(50% 50% at 50% 50%, rgba(44, 44, 44, 0.79) 0%, #2C2C2C 100%)",
  ...restProps
}: PlaceholderImageProps) => {
  return (
    <StyledPlaceholderContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      {...restProps}
    >
      <Placeholder />
    </StyledPlaceholderContainer>
  );
};

const StyledPlaceholderContainer = styled.div<PlaceholderImageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ backgroundColor }) => backgroundColor};
`;

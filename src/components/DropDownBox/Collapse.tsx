import React, { HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  collapseTitle: JSX.Element;
  suffixIcon?: () => JSX.Element;
  suffixIconRotatingDegree?: number;
  content?: JSX.Element;
  onClick?: () => void;
  isExpanded?: boolean;
  onExpand?: () => void;
}

export const Collapse = ({
  collapseTitle,
  suffixIcon,
  onClick,
  content,
  isExpanded,
  onExpand,
  suffixIconRotatingDegree = 180,
  ...restProps
}: CollapseProps) => {
  const [isExpandedLocal, setIsExpandedLocal] = useState<boolean | undefined>(
    false
  );
  useEffect(() => {
    setIsExpandedLocal(isExpanded);
  }, [isExpanded]);
  useEffect(() => {
    if (isExpandedLocal) {
      onExpand && onExpand();
    }
  }, [isExpandedLocal]);

  const handleClick = () => {
    setIsExpandedLocal(!isExpandedLocal);
    onClick && onClick();
  };

  return (
    <StyledContainer {...restProps} onClick={handleClick}>
      <StyledHeader>
        {collapseTitle}
        {suffixIcon && (
          <StyledIcon
            isExpanded={isExpandedLocal}
            suffixIconRotatingDegree={suffixIconRotatingDegree}
          >
            {suffixIcon()}
          </StyledIcon>
        )}
      </StyledHeader>
      {isExpandedLocal && content && <StyledBody>{content}</StyledBody>}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 76px;
  background: ${colors.white};
  justify-content: flex-start;
  padding: 0 16px;
  color: ${colors.title};
`;
const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 0 0;
`;

const StyledIcon = styled.div<{
  isExpanded?: boolean;
  suffixIconRotatingDegree?: number;
}>`
  transition: all 0.3s ease-in-out;
  transform: rotate(
    ${({ isExpanded, suffixIconRotatingDegree }) =>
      isExpanded ? `-${suffixIconRotatingDegree}deg` : "0deg"}
  );
`;
const StyledBody = styled.div`
  padding: 14px 0 24px 0;
`;

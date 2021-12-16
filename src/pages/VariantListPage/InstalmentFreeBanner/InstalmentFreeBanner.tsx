import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBoldStyle } from "components/typography/LinkLabelLargeSemiBold";
import background from "./images/bannerBg.png";
import { TextXSmallMedium } from "components/typography/TextXSmallMedium";
import { useTranslation } from "react-i18next";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { SizeType } from "models/models";

interface InstalmentFreeBannerProps {
  onClick: () => void;
  size?: SizeType;
  className?: string;
}

export const InstalmentFreeBanner = ({
  onClick,
  size = SizeType.Large,
  className,
}: InstalmentFreeBannerProps) => {
  const { t } = useTranslation();
  return (
    <StyledWrapper className={className} onClick={onClick}>
      <StyledImg src={background} />
      <StyledContentWrapper>
        <StyledTitle size={size}>
          {t("variantDetails.instalmentFreeBanner.title")}
        </StyledTitle>
        <StyledDesc>
          *{t("variantDetails.instalmentFreeBanner.desc")}
        </StyledDesc>
      </StyledContentWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  background: transparent;
`;

const StyledTitle = styled.div<{ size: SizeType }>`
  ${({ size }) =>
    size === SizeType.Large
      ? LinkLabelLargeSemiBoldStyle
      : LinkLabelMediumSemiBoldStyle};
  color: ${colors.white};
`;
const StyledDesc = styled(TextXSmallMedium)`
  color: ${colors.white};
  width: 60%;
`;

const StyledContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 24px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  background: transparent;
`;

import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useTranslation } from "react-i18next";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { CarTileSize, LoanRank, VariantTransmissionType } from "models/models";
import { CarVariantRecommendation } from "types/types";
import { LoanRankIndicator } from "components/LoanRankIndicator/LoanRankIndicator";
import { Fuel } from "components/icon/Fuel/Fuel";
import { ManualTransmission } from "components/icon/Transmission/ManualTransmission";
import { Engine } from "components/icon/Engine/Engine";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { ButtonWithCenterTextAndIconTail } from "components/ButtonWithCenterTextAndIconTail/ButtonWithCenterTextAndIconTail";
import { ArrowRightOutlined } from "components/icon/ArrowRightOutlined/ArrowRightOutlined";
import { AutomaticTransmission } from "components/icon/Transmission/AutomaticTransmission";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";
interface VariantTileProps extends HTMLAttributes<HTMLDivElement> {
  variant: CarVariantRecommendation;
  size?: CarTileSize;
}

export const CarVariantTile = ({
  variant,
  onClick,
  size = CarTileSize.Big,
}: VariantTileProps) => {
  const { t } = useTranslation();
  const [formattedPrice] = useFormattedPrice(variant.priceValue);
  const loanRank: LoanRank =
    LoanRank[variant.loanRank as keyof typeof LoanRank];
  const isBigSizeTile = size === CarTileSize.Big;
  const buttonTextMap = {
    [LoanRank.Red]: "modelDetails.improveNow",
    [LoanRank.Yellow]: "modelDetails.improveNow",
    [LoanRank.Green]: "modelDetails.viewDetails",
  };
  return (
    <StyledVariantTile
      key={variant.id}
      isBigSize={isBigSizeTile}
      onClick={onClick}
    >
      <StyledTileHeader isBigSize={isBigSizeTile}>
        <StyledVariantName>{variant.name}</StyledVariantName>
        <StyledVariantPriceValue>{formattedPrice}</StyledVariantPriceValue>
      </StyledTileHeader>
      <LoanRankIndicator
        loanRank={loanRank}
        speedometerRadius={isBigSizeTile ? 24 : 20}
        speedometerLineWidth={isBigSizeTile ? 8 : 7}
      />
      <StyledSpecifications>
        <StyledSpecItem>
          <Fuel />
          <StyledSpecItemValue>
            {t(`modelDetails.variantSpecifications.${variant.fuelType}`)}
          </StyledSpecItemValue>
        </StyledSpecItem>
        <StyledSpecItem>
          {VariantTransmissionType.Automatic === variant.transmission ? (
            <AutomaticTransmission />
          ) : (
            <ManualTransmission />
          )}
          <StyledSpecItemValue>
            {t(`modelDetails.variantSpecifications.${variant.transmission}`)}
          </StyledSpecItemValue>
        </StyledSpecItem>
        <StyledSpecItem>
          <Engine />
          <StyledSpecItemValue>
            {t(`modelDetails.variantSpecifications.engineCapacity`, {
              engineCapacity: variant.engineCapacity,
            })}
          </StyledSpecItemValue>
        </StyledSpecItem>
      </StyledSpecifications>
      <ButtonWithCenterTextAndIconTail
        width={"100%"}
        height={"44px"}
        borderRadius={"16px"}
        text={buttonTextMap[loanRank]}
        icon={<ArrowRightOutlined />}
      />
    </StyledVariantTile>
  );
};

interface TileProps {
  isBigSize: boolean;
}

const StyledVariantTile = styled.div<TileProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ isBigSize }) =>
    isBigSize
      ? css`
          width: 100%;
          padding: 22px 16px;
          box-shadow: 0 32px 64px rgba(17, 17, 17, 0.08);
        `
      : css`
          width: 240px;
          padding: 16px;
        `}

  &:not(:last-child) {
    margin-bottom: 16px;
  }
  color: ${colors.body};
  background: ${colors.white};
  border-radius: 16px;
`;

const StyledVariantName = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
`;

const StyledTileHeader = styled.div<TileProps>`
  width: 100%;
  margin-bottom: 18px;

  ${StyledVariantName} {
    ${({ isBigSize }) =>
      !isBigSize &&
      css`
        display: inline-block;
        min-height: 56px;
      `}
  }
`;

const StyledVariantPriceValue = styled(TextSmallRegular)`
  display: block;
  margin-top: 3px;
`;

const StyledSpecifications = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0;
  min-width: 208px;
  flex-wrap: wrap;
`;

const StyledSpecItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSpecItemValue = styled(TextLegalMedium)`
  margin-left: 5px;
`;

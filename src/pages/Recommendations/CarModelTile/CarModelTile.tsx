import React, { HTMLAttributes, MouseEventHandler, useRef } from "react";
import AnimatedNumber from "animated-number-react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { CarRecommendation } from "types/types";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useTranslation } from "react-i18next";
import { formatPriceNumber } from "utils/numberUtils/numberUtils";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import {
  LinkLabelMediumSemiBold,
  LinkLabelMediumSemiBoldStyle,
} from "components/typography/LinkLabelMediumSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import {
  LinkLabelXSmallSemiBold,
  LinkLabelXSmallSemiBoldStyle,
} from "components/typography/LinkLabelXSmallSemiBold";
import { MoreThanThreeHundredPeopleIcon } from "components/icon/MoreThanThreeHundredPeoplecomponents/icon/MoreThanThreeHundredPeopleIcon";
import { TenToFiftyPeopleIcon } from "components/icon/TenToFiftyPeoplecomponents/icon/TenToFiftyPeopleIcon";
import { OneHundredToThreeHundredPeopleIcon } from "components/icon/OneHundredToThreeHundredPeoplecomponents/icon/OneHundredToThreeHundredPeopleIcon";
import { CarTileSize, LoanRank } from "models/models";
import { LoanRankIndicator } from "components/LoanRankIndicator/LoanRankIndicator";
import { getLoanRankBgColor } from "utils/DetailsDataProcess";
import useVisibility from "hooks/useVisibility/useVisibility";
import { FiftyToOneHundredPeopleIcon } from "components/icon/FiftyToOneHundredPeoplecomponents/icon/FiftyToOneHundredPeopleIcon";
import { LessThanTenPeopleIcon } from "components/icon/LessThanTenPeoplecomponents/icon/LessThanTenPeopleIcon";
import { ButtonWithCenterTextAndIcon } from "components/ButtonWithCenterTextAndcomponents/icon/ButtonWithCenterTextAndIcon";
import { Call } from "components/icon/Call/Call";
import { ArrowRightOutlined } from "components/icon/ArrowRightOutlined/ArrowRightOutlined";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { WebpPicture } from "components/WebpPicture/WebpPicture";

interface CarTileProps extends HTMLAttributes<HTMLDivElement> {
  recommendation: CarRecommendation;
  size?: CarTileSize;
  onModelClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onClickContactUs: MouseEventHandler<HTMLDivElement>;
}

const AnimationDuration = 660;

export const CarModelTile = ({
  recommendation,
  onModelClick,
  onClickContactUs,
  size = CarTileSize.Big,
}: CarTileProps) => {
  const { t } = useTranslation();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const isVisible = useVisibility(ref);

  const priceRange = `${formatPriceNumber(
    recommendation.lowestAssetPrice
  )}-${formatPriceNumber(recommendation.highestAssetPrice)}`;

  const loanRank: LoanRank =
    LoanRank[recommendation.loanRank as keyof typeof LoanRank];
  const isBigSizeTile = size === CarTileSize.Big;

  const formatValue = (value: string) => parseInt(value);

  const isNumOfPeopleLessThanTen = recommendation.numberOfPopulation < 10;

  const lessThanTenText = "<10";

  const getPeopleIconByNumberOfPopulation = (numberOfPopulation: number) => {
    if (numberOfPopulation > 300) {
      return <MoreThanThreeHundredPeopleIcon />;
    }
    if (numberOfPopulation >= 100) {
      return <OneHundredToThreeHundredPeopleIcon />;
    }
    if (numberOfPopulation >= 50) {
      return <FiftyToOneHundredPeopleIcon />;
    }
    if (numberOfPopulation >= 10) {
      return <TenToFiftyPeopleIcon />;
    }
    return <LessThanTenPeopleIcon />;
  };

  return (
    <StyledCarModelTile>
      <CarTile
        key={`${recommendation.brand}-${recommendation.model}`}
        isBigSize={isBigSizeTile}
        onClick={onModelClick}
      >
        <CarTileHeader isBigSize={isBigSizeTile}>
          <WebpPicture
            src={recommendation.image}
            fallbackImage={
              <CarImage
                src={recommendation.image}
                alt="car image"
                $isBigSize={isBigSizeTile}
                useIntersectionObserver={true}
                threshold={415}
              />
            }
          />
          <CarTitle>
            <CarBrandName>
              {`${recommendation.brand} ${recommendation.model}`}
            </CarBrandName>
            <CarPriceRange>
              {t(`recommendations.priceRange`, {
                priceRange: priceRange,
              })}
            </CarPriceRange>
          </CarTitle>
        </CarTileHeader>
        <CarTileBody
          bgColor={getLoanRankBgColor(loanRank)}
          isBigSize={isBigSizeTile}
        >
          <CarPopularity ref={ref}>
            <div>
              {isBigSizeTile ? (
                <LinkLabelMediumSemiBold>
                  {isNumOfPeopleLessThanTen ? (
                    lessThanTenText
                  ) : (
                    <StyledMediumAnimatedNumber
                      value={isVisible ? recommendation.numberOfPopulation : 0}
                      duration={AnimationDuration}
                      formatValue={formatValue}
                    />
                  )}
                  {t(`recommendations.popularityLine1`)}
                </LinkLabelMediumSemiBold>
              ) : (
                <LinkLabelXSmallSemiBold>
                  {isNumOfPeopleLessThanTen ? (
                    lessThanTenText
                  ) : (
                    <StyledSmallAnimatedNumber
                      value={isVisible ? recommendation.numberOfPopulation : 0}
                      duration={AnimationDuration}
                      formatValue={formatValue}
                    />
                  )}

                  {t(`recommendations.popularityLine1`)}
                </LinkLabelXSmallSemiBold>
              )}
              <br />
              <LinkLabelLegalSemiBold>
                {t(`recommendations.popularityLine2`)}
              </LinkLabelLegalSemiBold>
            </div>
            <PeopleIconWrapper>
              {getPeopleIconByNumberOfPopulation(
                recommendation.numberOfPopulation
              )}
            </PeopleIconWrapper>
          </CarPopularity>
          <StyledLoanRankIndicator>
            <LoanRankIndicator
              loanRank={loanRank}
              speedometerRadius={30}
              speedometerLineWidth={9}
              isBigSize={isBigSizeTile}
              reverse={true}
            />
          </StyledLoanRankIndicator>
        </CarTileBody>
      </CarTile>
      <StyledButtonContainer>
        <ButtonWithCenterTextAndIcon
          text={"recommendations.contactUs"}
          width={"49.8%"}
          height={"40px"}
          icon={<Call />}
          borderRadius={"0 0 0 16px"}
          onClick={onClickContactUs}
        />
        <ButtonWithCenterTextAndIcon
          text={"recommendations.viewMore"}
          width={"49.8%"}
          height={"40px"}
          icon={<ArrowRightOutlined />}
          borderRadius={"0 0 16px 0"}
          onClick={onModelClick}
        />
      </StyledButtonContainer>
    </StyledCarModelTile>
  );
};

interface TileProps {
  isBigSize: boolean;
}

const CarTile = styled.div<TileProps>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ isBigSize }) =>
    isBigSize
      ? css`
          width: 100%;
          padding-top: 20px;
          box-shadow: 0 32px 64px rgba(17, 17, 17, 0.08);
        `
      : css`
          width: 249px;
          padding-top: 12px;
        `};
  color: ${colors.body};
  background: ${colors.white};
  border-radius: 16px 16px 0 0;
`;

const CarBrandName = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
`;

const CarTileHeader = styled.div<TileProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;

  ${CarBrandName} {
    ${({ isBigSize }) =>
      !isBigSize &&
      css`
        display: inline-block;
        min-height: 56px;
      `}
  }
`;

const CarImage = styled(LazyLoadImage)<{ $isBigSize: boolean }>`
  object-fit: cover;
  ${({ $isBigSize }) =>
    $isBigSize
      ? css`
          width: 225px;
          height: 147px;
        `
      : css`
          width: 149px;
          height: 101px;
        `}
`;

const CarTitle = styled.div`
  text-align: center;
`;

const CarPriceRange = styled(TextSmallRegular)`
  display: block;
  margin-top: 3px;
`;

const CarTileBody = styled.div<{ bgColor: string; isBigSize: boolean }>`
  background: ${({ bgColor }) => bgColor};
  ${({ isBigSize }) =>
    isBigSize
      ? css`
          padding: 15px 24px 20px;
        `
      : css`
          padding: 12px;
        `}
`;

const CarPopularity = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(92, 114, 108, 0.15);
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PeopleIconWrapper = styled.div`
  width: 70px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
`;

const StyledLoanRankIndicator = styled.div`
  padding-top: 15px;
`;

const StyledMediumAnimatedNumber = styled(AnimatedNumber)`
  ${LinkLabelMediumSemiBoldStyle}
`;

const StyledSmallAnimatedNumber = styled(AnimatedNumber)`
  ${LinkLabelXSmallSemiBoldStyle}
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StyledCarModelTile = styled.section`
  border-radius: 16px;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

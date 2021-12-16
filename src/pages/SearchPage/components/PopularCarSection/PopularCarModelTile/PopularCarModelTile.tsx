import React, {
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { CarRecommendation } from "types/types";
import { useTranslation } from "react-i18next";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { formatPriceNumber } from "utils/numberUtils/numberUtils";
import { colors } from "styles/colors";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlaceholderImage } from "components/PlaceholderImage/PlaceholderImage";
import useVisibility from "hooks/useVisibility/useVisibility";
interface CarTileProps extends HTMLAttributes<HTMLDivElement> {
  carModel: CarRecommendation;
  onModelClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onVisible: (visible: boolean) => void;
  containerRef?: React.MutableRefObject<HTMLElement>;
}
export const PopularCarModelTile = ({
  carModel,
  onModelClick,
  onVisible,
  ...restProps
}: CarTileProps) => {
  const { t } = useTranslation();
  const carTileRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carTileWidth = carTileRef.current?.clientWidth ?? 0;
  const [loaded, setLoaded] = useState(false);
  const isVisible = useVisibility(carTileRef, {
    threshold: 0.6,
  });
  useEffect(() => {
    onVisible(isVisible);
  }, [isVisible]);

  const carPriceRange = `${formatPriceNumber(
    carModel.lowestAssetPrice
  )}-${formatPriceNumber(carModel.highestAssetPrice)}`;

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <StyledCarTileWrapper {...restProps} ref={carTileRef}>
      <CarTile onClick={onModelClick}>
        <CarTileHeader width={carTileWidth}>
          {!loaded && <StyledPlaceholder />}
          <WebpPicture
            src={carModel.image}
            fallbackImage={
              <CarImage
                src={carModel.image}
                alt="car image"
                useIntersectionObserver={true}
                threshold={415}
                onLoad={handleImageLoaded}
              />
            }
          />
          <CarTitle>
            <TextMediumRegular>{`${carModel.brand} ${carModel.model}`}</TextMediumRegular>
            <CarPriceRange>
              {t(`carResultsPage.priceRange`, {
                priceRange: carPriceRange,
              })}
            </CarPriceRange>
          </CarTitle>
        </CarTileHeader>
      </CarTile>
    </StyledCarTileWrapper>
  );
};

const StyledCarTileWrapper = styled.div`
  border-radius: 8px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
  width: 100%;
`;

const CarTile = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${colors.body};
  background: ${colors.white};
  border-radius: 16px;
  overflow: hidden;
`;

const CarTileHeader = styled.div<{ width: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  min-height: 176px;
  height: ${({ width }) => Math.floor(width * 0.54)}px;
`;

const StyledPlaceholder = styled(PlaceholderImage)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CarImage = styled(LazyLoadImage)`
  object-fit: cover;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const CarTitle = styled.div`
  width: 100%;
  color: white;
  background: linear-gradient(5.43deg, #000000 16.66%, rgba(0, 0, 0, 0) 92.41%);
  padding: 2px 12px 8px;
  position: absolute;
  bottom: 0;
  text-align: left;
`;

const CarPriceRange = styled(LinkLabelMediumSemiBold)`
  display: block;
  margin-top: 2px;
`;

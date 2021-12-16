import React, {
  HTMLAttributes,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import styled from "styled-components";
import { colors } from "styles/colors";
import { CarRecommendation } from "types/types";
import { useTranslation } from "react-i18next";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import { PlaceholderImage } from "components/PlaceholderImage/PlaceholderImage";
import { Toyota } from "components/icon/Toyota/Toyota";
import { Daihatsu } from "components/icon/Daihatsu/Daihatsu";
import { BMW } from "components/icon/BMW/BMW";
import {
  getDpRange,
  getMonthlyInstallmentRange,
  getModelPriceRange,
} from "utils/carModelUtils/carModelUtils";
import { LoanInfo } from "pages/component/LoanInfo/LoanInfo";
import { getCustomerAssistantWhatsAppNumber } from "services/lead";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";

interface CarTileProps extends HTMLAttributes<HTMLDivElement> {
  carModel: CarRecommendation;
  onModelClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}
export const CarModelTile = ({
  carModel,
  onModelClick,
  ...restProps
}: CarTileProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useCurrentLanguageFromContext();
  const carTileRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carTileWidth = carTileRef.current?.clientWidth ?? 0;

  const [loaded, setLoaded] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);

  const carPriceRange = getModelPriceRange(carModel);
  const dpRange = getDpRange(carModel.variants, currentLanguage);

  const monthlyInstallmentRange = getMonthlyInstallmentRange(
    carModel.variants,
    currentLanguage
  );

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  const goToWhatsApp = async () => {
    if (!carModel) return;
    const { brand, model } = carModel;
    const carName = `${brand} ${model}`;
    const message = t("carResultsPage.whatsappMessage", {
      carName,
      dpRange: dpRange,
      monthlyRange: monthlyInstallmentRange,
    });
    setLoadingWhatsApp(true);
    const whatsAppUrl = await getCustomerAssistantWhatsAppNumber();
    setLoadingWhatsApp(false);
    window.open(`${whatsAppUrl}?text=${encodeURI(message)}`, "_blank");
  };

  return (
    <StyledCarTileWrapper {...restProps} ref={carTileRef}>
      <CarTile onClick={onModelClick}>
        <CarTileHeader width={carTileWidth}>
          {!loaded && <StyledPlaceholder />}
          <WebpPicture
            src={carModel.image}
            fallbackImage={<CarImage src={carModel.image} alt="car image" />}
          />
          <StyledTitleWrapper>
            <StyledIcon>
              {
                {
                  Toyota: <Toyota />,
                  Daihatsu: <Daihatsu />,
                  BMW: <BMW />,
                }[carModel.brand]
              }
            </StyledIcon>
            <CarTitle>
              <TextMediumRegular>{`${carModel.brand} ${carModel.model}`}</TextMediumRegular>
              <CarPriceRange>
                {t(`carResultsPage.priceRange`, {
                  priceRange: carPriceRange,
                })}
              </CarPriceRange>
            </CarTitle>
          </StyledTitleWrapper>
        </CarTileHeader>
        <LoanInfo
          monthlyInstallment={t(`carResultsPage.priceRange`, {
            priceRange: monthlyInstallmentRange,
          })}
          downPayment={t(`carResultsPage.priceRange`, {
            priceRange: dpRange,
          })}
          tenure={t(`carResultsPage.tenure`)}
        />
      </CarTile>
      <StyledButtonContainer>
        <StyledButton
          width={"47%"}
          height={"40px"}
          buttonType={ButtonType.primary1}
          loading={loadingWhatsApp}
          onClick={goToWhatsApp}
        >
          <LinkLabelSmallSemiBold>
            {t(`carResultsPage.contactUs`)}
          </LinkLabelSmallSemiBold>
        </StyledButton>
        <Button
          width={"47%"}
          height={"40px"}
          buttonType={ButtonType.secondary1}
          onClick={onModelClick}
        >
          <LinkLabelSmallSemiBold>
            {t(`carResultsPage.viewDetails`)}
          </LinkLabelSmallSemiBold>
        </Button>
      </StyledButtonContainer>
    </StyledCarTileWrapper>
  );
};

const StyledCarTileWrapper = styled.div`
  border-radius: 8px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
`;

const CarTile = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${colors.body};
  background: ${colors.white};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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

const CarImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const CarTitle = styled.div`
  width: 60%;
  color: white;
  padding: 2px 12px 8px;
`;

const CarPriceRange = styled(LinkLabelMediumSemiBold)`
  display: block;
  margin-top: 2px;
`;
const StyledButtonContainer = styled.div`
  width: 100%;
  background: ${colors.white};
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const StyledButton = styled(Button)`
  background: ${colors.primary1};
`;

const StyledIcon = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 10px;
  margin: 5px;
`;

const StyledTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;
  background: linear-gradient(5.43deg, #000000 16.66%, rgba(0, 0, 0, 0) 92.41%);
  padding: 5px;
`;

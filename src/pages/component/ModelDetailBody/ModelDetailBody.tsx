import { colors } from "styles/colors";
import React from "react";
import styled from "styled-components";
import { CarModelBasicDetailsResponse, CarVariant } from "types/types";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { formatPriceNumber } from "utils/numberUtils/numberUtils";
import { useTranslation } from "react-i18next";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { Line } from "components/Line/Line";

interface ModelDetailHeaderProps {
  carModelDetails: CarModelBasicDetailsResponse;
  discount: string;
}

export const ModelDetailBody = ({
  carModelDetails,
  discount,
}: ModelDetailHeaderProps) => {
  const { t } = useTranslation();
  const documentsRestrictions = [
    "appDownloadPage.carModelDetail.step1",
    "appDownloadPage.carModelDetail.step2",
    "appDownloadPage.carModelDetail.step3",
  ];
  const getPriceRange = (variants: CarVariant[]) => {
    const priceArray: number[] = variants.map((item) => item.priceValue);
    const lowestAssetPrice = Math.min(...priceArray);
    const highestAssetPrice = Math.max(...priceArray);
    return { lowestAssetPrice, highestAssetPrice };
  };
  const { lowestAssetPrice, highestAssetPrice } = getPriceRange(
    carModelDetails.variants
  );
  const priceRange = `${formatPriceNumber(
    lowestAssetPrice
  )}-${formatPriceNumber(highestAssetPrice)}`;

  return (
    <StyledBody>
      <StyledCarSubtitle>
        {carModelDetails.brand.concat(" ", carModelDetails.model)}
      </StyledCarSubtitle>
      <StyledPrice>
        {t(`recommendations.priceRange`, {
          priceRange: priceRange,
        })}
      </StyledPrice>
      <StyledPriceDes>
        <TextLegalMedium>{t(discount)}</TextLegalMedium>
      </StyledPriceDes>
      <StyledContent>
        <StyledContentTitle>
          {t("appDownloadPage.carModelDetail.title")}
        </StyledContentTitle>
        <StyledDocumentsSection>
          {documentsRestrictions.map((item, index) => {
            return (
              <StyledDocumentItem key={index}>
                <StyledDocmentIcon>
                  <StyledCircle>
                    <LinkLabelLargeSemiBold>
                      {`${index + 1}`}
                    </LinkLabelLargeSemiBold>
                  </StyledCircle>
                  {index !== documentsRestrictions.length - 1 && (
                    <StyledLine
                      width={"1px"}
                      height={"54px"}
                      background={colors.primary1}
                    />
                  )}
                </StyledDocmentIcon>
                <StyledDocumentText>
                  <LinkLabelMediumSemiBold
                    dangerouslySetInnerHTML={{ __html: t(item) }}
                  />
                </StyledDocumentText>
              </StyledDocumentItem>
            );
          })}
        </StyledDocumentsSection>
      </StyledContent>
    </StyledBody>
  );
};

const StyledBody = styled.div`
  width: 100%;
  background: ${colors.carBg};
  padding: 0 16px;
`;
const StyledCarSubtitle = styled(LinkLabelLargeSemiBold)`
  width: 100%;
  color: ${colors.label};
  margin-bottom: 8px;
`;
const StyledPrice = styled(H2MediumBold)`
  display: block;
  margin-bottom: 2px;
  color: ${colors.title};
`;
const StyledPriceDes = styled.div`
  width: 100%;
  color: ${colors.placeholder};
  margin-bottom: 24px;
`;
const StyledContent = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  margin-bottom: 24px;
`;
const StyledContentTitle = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
  padding: 22px 0 40px;
`;
const StyledDocumentsSection = styled.div`
  padding: 0 15px 24px;
`;
const StyledDocumentItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StyledDocmentIcon = styled.div`
  width: 32px;
`;
const StyledCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${colors.primary1};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLine = styled(Line)`
  margin: 0 auto;
`;
const StyledDocumentText = styled.div`
  width: 100%;
  text-align: left;
  margin-left: 8px;
  color: ${colors.label};
`;

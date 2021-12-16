import React, { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { CarTileSize, NewFunnelLoanRank } from "models/models";
import { getTenureFormatted } from "utils/translationFormatter";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { CarVariantRecommendation } from "types/types";
import {
  transformToJtWithTargetDecimal,
  transformToJtWithTwoDecimal,
} from "utils/numberUtils/numberUtils";
import { LoanInfo } from "component/LoanInfo/LoanInfo";
import { SpecificationList } from "SpecificationList/SpecificationList";
import {
  trackSelectCarResultVariantCalculateLoan,
  trackSelectCarResultVariantCalculateLoanCancel,
  trackSelectCarResultVariantCalculateLoanStart,
} from "helpers/amplitude/newFunnelEventTracking";
import { trackViewV2LoanCalculatorSurvey } from "helpers/amplitude/newLoanCalculatorEventTracking";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import background from "./images/background.png";
import { ArrowRightOutlined } from "components/icon/ArrowRightOutlined/ArrowRightOutlined";
import { Button, ButtonType } from "components/Button/Button";
import { CarVariantsModal } from "component/CarVariantsModal/CarVariantsModal";
import { newFunnelLoanCalculatorUrl } from "routes/routes";
import getCurrentEnvironment from "helpers/environments";
import { useHistory } from "react-router-dom";
import { NewFunnelLoanRankComponent } from "component/NewFunnelLoanRank/NewFunnelLoanRankComponent";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";

interface VariantTileProps extends HTMLAttributes<HTMLDivElement> {
  variant: CarVariantRecommendation;
  variantIndex: number;
  size?: CarTileSize;
  onClickToVariantDetailsPage: () => void;
  onGetPreapprovalButtonClick: () => void;
  showPreApprovalButton?: boolean;
}

export const CarVariantItem = ({
  variant,
  onClickToVariantDetailsPage,
  onGetPreapprovalButtonClick,
  variantIndex,
  showPreApprovalButton: showPreApprovalButton = true,
}: VariantTileProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { currentLanguage } = useCurrentLanguageFromContext();
  const carResultParameter = useCarResultParameter();
  const [isShowModal, setShowModal] = useState(false);
  const [formattedPrice] = useFormattedPrice(variant.priceValue);
  const getSelectedCarResultVariant = () => {
    const { id, name, priceValue, monthlyInstallment, dpAmount, tenure } =
      variant;
    const carVariantParameters = {
      variantID: id,
      variantName: name,
      variantPrice: priceValue,
      variantMonthlyInstallments: monthlyInstallment,
      variantDownPayment: dpAmount,
      variantTenure: tenure,
    };

    return {
      variantIndex: variantIndex + 1,
      ...carResultParameter,
      ...carVariantParameters,
    };
  };
  const enableNewFunnelLoanCalculator =
    getCurrentEnvironment.featureToggles.enableNewFunnelLoanCalculator;

  const selectCarResultVariant = getSelectedCarResultVariant();
  const hideLoanModal = () => {
    setShowModal(false);
    trackSelectCarResultVariantCalculateLoanCancel(selectCarResultVariant);
  };

  const openLoanModal = () => {
    trackSelectCarResultVariantCalculateLoan(selectCarResultVariant);
    setShowModal(true);
  };
  const onLoanModalConfirm = () => {
    trackSelectCarResultVariantCalculateLoanStart(selectCarResultVariant);
  };
  const onCalculateLoanClick = () => {
    trackSelectCarResultVariantCalculateLoanStart(selectCarResultVariant);
    if (enableNewFunnelLoanCalculator) {
      const { id: variantId } = variant;
      trackViewV2LoanCalculatorSurvey("car_result_details");
      const pathname = newFunnelLoanCalculatorUrl.replace(":id", variantId);
      history.push({
        pathname: pathname,
      });
    }
  };

  return (
    <StyledVariantTile key={variant.id}>
      <StyledTileHeader onClick={onClickToVariantDetailsPage}>
        <div>
          <TextSmallRegular>{variant.name}</TextSmallRegular>
          <p>
            <LinkLabelMediumSemiBold>{formattedPrice}</LinkLabelMediumSemiBold>
          </p>
        </div>
        <StyledTitleRight>
          <ArrowRightOutlined width={24} height={24} color={colors.primary1} />
        </StyledTitleRight>
      </StyledTileHeader>
      <StyledVariantDetailsSection>
        {variant.loanRank && (
          <NewFunnelLoanRankComponent
            loanRank={variant.loanRank as NewFunnelLoanRank}
            borderTopRadius={16}
            borderBottomRadius={0}
          />
        )}
        <div onClick={onClickToVariantDetailsPage}>
          <StyledSpecifications>
            <SpecificationList specifications={variant} />
          </StyledSpecifications>
          <StyledLoanInfo>
            <LoanInfo
              monthlyInstallment={transformToJtWithTwoDecimal(
                variant.monthlyInstallment,
                currentLanguage
              )}
              downPayment={transformToJtWithTargetDecimal(
                variant.dpAmount,
                currentLanguage
              )}
              tenure={getTenureFormatted(t, variant.tenure)}
            />
          </StyledLoanInfo>
        </div>
        <StyledButtonSection>
          <Button
            width={showPreApprovalButton ? "47%" : "100%"}
            height={"44px"}
            buttonType={ButtonType.primary2}
            onClick={
              enableNewFunnelLoanCalculator
                ? onCalculateLoanClick
                : openLoanModal
            }
          >
            {t("variantListPage.calculateLoan")}
          </Button>
          {showPreApprovalButton && (
            <Button
              width={"47%"}
              height={"44px"}
              buttonType={ButtonType.secondary2}
              onClick={onGetPreapprovalButtonClick}
            >
              {t("common.getPreApproval")}
            </Button>
          )}
        </StyledButtonSection>
      </StyledVariantDetailsSection>
      <CarVariantsModal
        isShowCarVariantsModal={isShowModal}
        hideCarVariantsModal={hideLoanModal}
        type="calculate"
        onConfirm={onLoanModalConfirm}
      />
    </StyledVariantTile>
  );
};

const StyledVariantTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
  color: ${colors.body};
  border-radius: 16px;
`;
const StyledTileHeader = styled.div`
  width: 100%;
  padding: 22px 16px 38px;
  color: ${colors.white};
  background: url(${background}) no-repeat center;
  background-size: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledVariantDetailsSection = styled.section`
  background: ${colors.white};
  border-radius: 16px;
  margin-top: -16px;
`;
const StyledSpecifications = styled.section`
  padding: 20px 38px;
  border-bottom: 1px solid ${colors.inputBg};
`;
const StyledLoanInfo = styled.section`
  padding: 0 0;
`;
const StyledButtonSection = styled.section`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;
const StyledTitleRight = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

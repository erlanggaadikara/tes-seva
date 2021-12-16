import React, { HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Button, ButtonType } from "components/Button/Button";
import { trackVariantDetailsEvent } from "variantDetailsUtils/variantDetailsUtils";
import {
  trackSelectCarVariantDetailsCoupon,
  trackSelectCarResultVariantDetailsCustomizeLoanCancel,
} from "helpers/amplitude/newFunnelEventTracking";
import { CarVariantDetails } from "types/types";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { useTranslation } from "react-i18next";
import { isPreApproved } from "preApprovalUitls";
import getCurrentEnvironment from "helpers/environments";
import { CarVariantsModal } from "component/CarVariantsModal/CarVariantsModal";
import { InstalmentFreeBanner } from "VariantListPage/InstalmentFreeBanner/InstalmentFreeBanner";
import { useInstalmentFreeModal } from "VariantListPage/InstalmentFreeModal/InstalmentFreeModal";
import { SizeType } from "models/models";

interface LoveThisCarSectionProps extends HTMLAttributes<HTMLDivElement> {
  onClickApplyNow?: () => void;
  carVariantDetails: CarVariantDetails;
  onContactUsClick: () => void;
  loading: boolean;
}

export const LoveThisCarSection = ({
  onClickApplyNow,
  carVariantDetails,
  onContactUsClick,
  loading,
}: LoveThisCarSectionProps) => {
  const [canApplyPreApproval, setCanApplyPreApproval] = useState(false);
  const carResultParameter = useCarResultParameter();
  const [isShowCalculateLoanModal, setIsShowCalculateLoanModal] =
    useState(false);
  const { t } = useTranslation();
  // const history = useHistory()
  const enableNewFunnelLoanCalculator =
    getCurrentEnvironment.featureToggles.enableNewFunnelLoanCalculator;
  const {
    InstalmentFreeModal,
    showModal: showInstalmentFreeModal,
    hideModal: hideInstalmentFreeModal,
  } = useInstalmentFreeModal();

  const hideCalculateLoanModal = () => {
    setIsShowCalculateLoanModal(false);
    //TODO Need to Change amplitude event
    trackVariantDetailsEvent({
      carVariantDetails,
      carResultParameter,
      trackFunction: trackSelectCarResultVariantDetailsCustomizeLoanCancel,
    });
  };
  const onConfirmCalculateLoamModal = () => {
    console.log("onConfirmCalculateLoamModal");
    //TODO Need to Add amplitude event
  };

  const onInstalmentFreeBannerClick = () => {
    showInstalmentFreeModal();
    const { id, name, priceValue } = carVariantDetails.variantDetail;
    const { monthlyInstallment, dpAmount, tenure } =
      carVariantDetails.loanDetail;
    const carVariantParameters = {
      variantID: id,
      variantName: name,
      variantPrice: priceValue,
      variantMonthlyInstallments: monthlyInstallment,
      variantDownPayment: dpAmount,
      variantTenure: tenure,
    };
    trackSelectCarVariantDetailsCoupon({
      ...carResultParameter,
      ...carVariantParameters,
    });
  };

  const onInstalmentFreeModalButtonClick = () => {
    hideInstalmentFreeModal();
    if (canApplyPreApproval) {
      onClickApplyNow && onClickApplyNow();
    }
  };

  useEffect(() => {
    isPreApproved()
      .then((isPreApproved) => setCanApplyPreApproval(!isPreApproved))
      .catch(() => setCanApplyPreApproval(true));
  }, []);

  return (
    <StyledLoveThisCarSection>
      <StyledInstalmentFreeWrapper>
        <InstalmentFreeBanner
          onClick={onInstalmentFreeBannerClick}
          size={SizeType.Small}
        />
      </StyledInstalmentFreeWrapper>
      <StyledApplyNowSection>
        {canApplyPreApproval && (
          <StyledGetPreApprovalButton onClick={onClickApplyNow} width={"100%"}>
            {t("common.getPreApproval")}
          </StyledGetPreApprovalButton>
        )}
        <Button
          onClick={onContactUsClick}
          width={"100%"}
          buttonType={ButtonType.secondary1}
          loading={loading}
        >
          {t("newFunnelVariantDetailsPage.contactUs")}
        </Button>
      </StyledApplyNowSection>
      {!enableNewFunnelLoanCalculator && (
        <CarVariantsModal
          isShowCarVariantsModal={isShowCalculateLoanModal}
          hideCarVariantsModal={hideCalculateLoanModal}
          type="calculate"
          onConfirm={onConfirmCalculateLoamModal}
        />
      )}
      <InstalmentFreeModal
        buttonTitle={
          canApplyPreApproval
            ? t("variantDetails.instalmentFreeModal.applyNow")
            : t("variantDetails.instalmentFreeModal.pickACar")
        }
        onButtonClick={onInstalmentFreeModalButtonClick}
      />
    </StyledLoveThisCarSection>
  );
};
const StyledLoveThisCarSection = styled.section`
  background: ${colors.inputBg};
  padding: 16px;
  border-radius: 16px;
`;
const StyledInstalmentFreeWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
`;
const StyledApplyNowSection = styled.div`
  margin-bottom: 16px;
`;
const StyledGetPreApprovalButton = styled(Button)`
  margin-bottom: 16px;
`;

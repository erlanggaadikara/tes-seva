import { Button, ButtonType } from "components/Button/Button";
import {
  LocationStateKey,
  NewFunnelLoanPermutationsKey,
  NewFunnelLoanRank,
} from "models/models";
import {
  NewFunnelCarVariantDetails,
  NewFunnelLoanPermutations,
} from "types/types";
import React, { useEffect, useState } from "react";
import { loginUrl, preApprovalStartUrl } from "routes/routes";
import { tracSelectV2LoanCalculatorSpeak } from "helpers/amplitude/newLoanCalculatorEventTracking";
import { WhatsAppContactUs } from "component/WhatsAppContactUs/WhatsAppContactUs";
import { colors } from "styles/colors";
import { convertSlashesInStringToVerticalLines } from "utils/stringUtils";
import { getCustomerAssistantWhatsAppNumber } from "services/lead";
import { getModelName } from "utils/carModelUtils/carModelUtils";
import { getToken } from "utils/api";
import styled from "styled-components";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { useHistory } from "react-router";
import { useInstalmentFreeModal } from "pages/VariantListPage/InstalmentFreeModal/InstalmentFreeModal";
import { usePreApprovalIntroModal } from "component/PreApprovalIntroModal/usePreApprovalIntroModal";
import { useTranslation } from "react-i18next";
import { isPreApproved } from "pages/preApprovalUitls";
import background from "./images/ModalBg.png";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";

interface NewFunnelLoanCalculatorBottomProps {
  carVariantDetails: NewFunnelCarVariantDetails;
  data: NewFunnelLoanPermutations;
}

export const NewFunnelLoanCalculatorBottom = ({
  carVariantDetails,
  data,
}: NewFunnelLoanCalculatorBottomProps) => {
  const { dpAmount, loanRank, monthlyInstallment, tenure } = data;
  const { t } = useTranslation();
  const history = useHistory();
  const { showModal: showPreapprovalModal, PreApprovalIntroModal } =
    usePreApprovalIntroModal();
  const { InstalmentFreeModal } = useInstalmentFreeModal();
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [showProApprovalButton, setShowProApprovalButton] = useState(false);

  useEffect(() => {
    isPreApproved()
      .then((isPreApproved) => setShowProApprovalButton(!isPreApproved))
      .catch(() => setShowProApprovalButton(true));
  }, []);

  const formValue = useContextSurveyFormData();
  const { age, totalIncome } = formValue;
  const goToWhatsApp = async () => {
    if (!carVariantDetails) {
      return;
    }
    const {
      variantDetail: { name },
    } = carVariantDetails;
    const modelName = getModelName(carVariantDetails.modelDetail);
    const message = t("newFunnelLoanCalculatorPage.whatApp", {
      carName: `${modelName}, ${convertSlashesInStringToVerticalLines(name)}`,
      dp: dpAmount,
      monthly: monthlyInstallment,
    });
    const finalMessage = message.concat(
      t("common.tenureAmount", {
        count: tenure,
      }),
      "."
    );
    setLoadingWhatsApp(true);
    const whatsAppUrl = await getCustomerAssistantWhatsAppNumber();
    setLoadingWhatsApp(false);
    window.open(`${whatsAppUrl}?text=${encodeURI(finalMessage)}`, "_blank");

    tracSelectV2LoanCalculatorSpeak({
      loanRank: loanRank as NewFunnelLoanRank,
      age: String(age?.value),
      income: Number(totalIncome?.value),
      monthlyInstallments: monthlyInstallment,
      downPayment: dpAmount,
      tenure,
    });
  };

  const onInstalmentFreeModalButtonClick = () => {
    if (showProApprovalButton) {
      showPreapprovalModal();
    }
  };

  const onPreApprovalIntroStartButtonClick = () => {
    gotoTargetPage();
  };

  const gotoTargetPage = () => {
    if (getToken()) {
      goTopPreApprovalStartPage();
    } else {
      goToLoginPage();
    }
  };

  const goToLoginPage = () => history.push(loginUrl);

  const goTopPreApprovalStartPage = () =>
    history.push({
      pathname: preApprovalStartUrl,
      state: { [LocationStateKey.IsFromLoginPage]: true },
    });

  const createButton = (loanRank: NewFunnelLoanRank) => {
    switch (loanRank) {
      case NewFunnelLoanRank.Green:
        return (
          <>
            <StyledInstalmentFreeBanner>
              <StyledTextWrapper>
                <StyledTextLegal>
                  {t("variantDetails.instalmentFreeBanner.title")}
                  {t("variantDetails.instalmentFreeBanner.desc")}
                </StyledTextLegal>
              </StyledTextWrapper>
              <StyledButtonBanner>
                <Button
                  width={"100%"}
                  onClick={onInstalmentFreeModalButtonClick}
                  buttonType={ButtonType.red}
                >
                  {t("variantDetails.instalmentFreeModal.applyNow")}
                </Button>
              </StyledButtonBanner>
              <PreApprovalIntroModal
                onPositiveButtonClick={onPreApprovalIntroStartButtonClick}
              />
            </StyledInstalmentFreeBanner>
          </>
        );
      case NewFunnelLoanRank.Red:
      case NewFunnelLoanRank.Yellow:
      case NewFunnelLoanRank.Grey:
      default:
        return (
          <WhatsAppContactUs
            showDescription={false}
            onContactUsClick={goToWhatsApp}
            loading={loadingWhatsApp}
            buttonText={"newFunnelVariantDetailsPage.contactUs"}
          />
        );
    }
  };

  return (
    <StyledWrapper>
      {createButton(
        data[NewFunnelLoanPermutationsKey.LoanRank] as NewFunnelLoanRank
      )}
      <PreApprovalIntroModal
        onPositiveButtonClick={onPreApprovalIntroStartButtonClick}
      />
      <InstalmentFreeModal
        buttonTitle={
          showProApprovalButton
            ? t("variantDetails.instalmentFreeModal.applyNow")
            : t("variantDetails.instalmentFreeModal.pickACar")
        }
        onButtonClick={onInstalmentFreeModalButtonClick}
      />
    </StyledWrapper>
  );
};

const StyledInstalmentFreeBanner = styled.div`
  margin: 0 auto;
  background: url(${background}) no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160px;
  margin-bottom: 3vh;
  @media (max-width: 700px) {
    background-size: contain;
  }
`;

const StyledWrapper = styled.div`
  padding: 0 16px;
`;
const StyledTextWrapper = styled.div`
  margin-top: 8vh;
  width: 573px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const StyledTextLegal = styled(LinkLabelLargeSemiBold)`
  margin-top: 2vh;
  line-height: 22px;
  color: ${colors.white};
`;
const StyledButtonBanner = styled(Button)`
  color: ${colors.white};
  margin: 5vw;
  border: none;
  background: none;
  width: 90%;
  @media (max-width: 700px) {
    font-size: 16px;
    line-height: 0.75;
    background-size: contain;
  }
`;

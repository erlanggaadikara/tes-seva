import { Button, ButtonType } from "components/Button/Button";
import {
  LocalStorageKey,
  LocationStateKey,
  NewFunnelLoanPermutationsKey,
  NewFunnelLoanRank,
  QueryKeys,
  SizeType,
} from "models/models";
import {
  NewFunnelCarVariantDetails,
  NewFunnelLoanPermutations,
  SimpleCarVariantDetail,
} from "types/types";
import React, { useEffect, useState } from "react";
import {
  loginUrl,
  newFunnelVariantDetailsUrl,
  preApprovalStartUrl,
} from "routes/routes";
import {
  tracSelectV2LoanCalculatorGetApproval,
  tracSelectV2LoanCalculatorSelect,
  tracSelectV2LoanCalculatorSpeak,
} from "helpers/amplitude/newLoanCalculatorEventTracking";

import { AlertInfo } from "components/icon/AlertInfo/AlertInfo";
import { InstalmentFreeBanner } from "pages/VariantListPage/InstalmentFreeBanner/InstalmentFreeBanner";
import { TextLegalSmallRegular } from "components/typography/TextLegalSmallRegular";
import { WhatsAppContactUs } from "component/WhatsAppContactUs/WhatsAppContactUs";
import { colors } from "styles/colors";
import { convertSlashesInStringToVerticalLines } from "utils/stringUtils";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { getCustomerAssistantWhatsAppNumber } from "services/lead";
import { getModelName } from "utils/carModelUtils/carModelUtils";
import { getToken } from "utils/api";
import { isPreApproved } from "preApprovalUitls";
import styled from "styled-components";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { useHistory } from "react-router";
import { useInstalmentFreeModal } from "pages/VariantListPage/InstalmentFreeModal/InstalmentFreeModal";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { usePreApprovalIntroModal } from "component/PreApprovalIntroModal/usePreApprovalIntroModal";
import { useTranslation } from "react-i18next";

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
  const {
    InstalmentFreeModal,
    showModal: showInstalmentFreeModal,
    hideModal: hideInstalmentFreeModal,
  } = useInstalmentFreeModal();
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [showProApprovalButton, setShowProApprovalButton] = useState(false);

  useEffect(() => {
    isPreApproved()
      .then((isPreApproved) => setShowProApprovalButton(!isPreApproved))
      .catch(() => setShowProApprovalButton(true));
  }, []);

  const [, setSimpleCarVariantDetails] =
    useLocalStorage<SimpleCarVariantDetail | null>(
      LocalStorageKey.SimpleCarVariantDetails,
      null
    );

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

  const onSelectLoanClick = () => {
    const queryObj = {
      [QueryKeys.LoanRank]: loanRank,
      [QueryKeys.DpAmount]: dpAmount,
      [QueryKeys.Tenure]: tenure,
      [QueryKeys.MonthlyInstallment]: monthlyInstallment,
    };
    const pathName = newFunnelVariantDetailsUrl.replace(
      ":id",
      carVariantDetails.variantDetail.id
    );
    const query = generateQuery(queryObj);
    history.push({
      pathname: pathName,
      search: query,
    });

    tracSelectV2LoanCalculatorSelect({
      loanRank: loanRank as NewFunnelLoanRank,
      age: String(age?.value),
      income: Number(totalIncome?.value),
      monthlyInstallments: monthlyInstallment,
      downPayment: dpAmount,
      tenure,
    });
  };

  const onInstalmentFreeModalButtonClick = () => {
    hideInstalmentFreeModal();
    if (showProApprovalButton) {
      showPreapprovalModal();

      tracSelectV2LoanCalculatorGetApproval({
        loanRank: loanRank as NewFunnelLoanRank,
        age: String(age?.value),
        income: Number(totalIncome?.value),
        monthlyInstallments: monthlyInstallment,
        downPayment: dpAmount,
        tenure,
      });
    }
  };

  const onPreApprovalIntroStartButtonClick = () => {
    saveSimpleCarData();
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

  const saveSimpleCarData = () => {
    const simpleCarVariantDetails: SimpleCarVariantDetail = {
      modelId: carVariantDetails.modelDetail.id,
      variantId: carVariantDetails.variantDetail.id,
      loanTenure: tenure,
      loanDownPayment: dpAmount,
      loanMonthlyInstallment: monthlyInstallment,
      loanRank: loanRank,
    };
    setSimpleCarVariantDetails(simpleCarVariantDetails);
  };

  const createButton = (loanRank: NewFunnelLoanRank) => {
    switch (loanRank) {
      case NewFunnelLoanRank.Green:
        return (
          <>
            <StyledInstalmentFreeBanner
              onClick={showInstalmentFreeModal}
              size={SizeType.Small}
            />
            <Button
              width={"100%"}
              buttonType={ButtonType.secondary1}
              onClick={onSelectLoanClick}
            >
              {t("newFunnelLoanCalculatorPage.loanCalculatorButton")}
            </Button>
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
      <StyledAlertInfo>
        <AlertInfo width={15} height={15} />
        <StyledAlertInfoText>
          {t("newFunnelLoanCalculatorPage.disclaimer")}
        </StyledAlertInfoText>
      </StyledAlertInfo>
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

const StyledInstalmentFreeBanner = styled(InstalmentFreeBanner)`
  margin-bottom: 16vh;
`;

const StyledWrapper = styled.div`
  padding: 0 16px;
`;
const StyledAlertInfo = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const StyledAlertInfoText = styled(TextLegalSmallRegular)`
  margin-left: 8px;
  color: ${colors.label};
`;

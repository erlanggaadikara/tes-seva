import React, { useState } from "react";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import styled from "styled-components";
import { colors } from "styles/colors";
import { bankSelectionConfig } from "./bankSelection.config";
import { BankItem } from "./BankItem/BankItem";
import { useDialogModal } from "components/DialogModal/DialogModal";
import { getBrickPublicToken } from "services/brick";
import currentEnvironment from "helpers/environments";
import endpoints from "helpers/endpoints";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { TheBank } from "components/icon/GenalBank/TheBank";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import { brickLinkOK } from "routes/routes";
import { useHistory } from "react-router-dom";
import { BankSelectionModalImage } from "components/icon/BankSelectionModalImage/BankSelectionModalImage";
import { handlePreApprovalFlowError } from "services/preApproval";
import { getSpacing } from "utils/componentUtils";
import {
  trackSelectPreapprovalBankLinkingSkip,
  trackSelectPreapprovalBankLinkingBank,
  trackViewPreapprovalBankLinkingBankModal,
  trackSelectPreapprovalBankLinkingBankModalOK,
  trackSelectPreapprovalBankLinkingBankModalDeny,
} from "helpers/amplitude/preApprovalEventTracking";

export enum BankLinkSkipType {
  notListed = "Bank not listed",
  skip = "Skip",
}
export const BankSelectSection = () => {
  const { DialogModal, showModal, hideModal } = useDialogModal();
  const { showToast, RenderToast } = useToast();
  const { t } = useTranslation();
  const history = useHistory();
  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);
  const [selectedBankItemName, setSelectedBankItemName] = useState<string>("");
  const onClickBankItem = (name: string) => {
    showModal();
    trackSelectPreapprovalBankLinkingBank(name);
    trackViewPreapprovalBankLinkingBankModal(name);
    setSelectedBankItemName(name);
  };

  const onConfirm = async () => {
    try {
      setConfirmButtonLoading(true);
      const response = await getBrickPublicToken();
      if (response?.data) {
        setConfirmButtonLoading(false);
        const queryObj = {
          accessToken: response.data,
          redirect_url: `${currentEnvironment.apiBaseUrl}${endpoints.linkBrickRedirect}`,
        };
        const query = generateQuery(queryObj);
        const bankLinkingUrl = `${currentEnvironment.bankLinkingUrl}${query}`;
        window.open(bankLinkingUrl, "_self");
        hideModal();
      }
    } catch (e) {
      setConfirmButtonLoading(false);
      hideModal();
      handlePreApprovalFlowError("bankLinking", e, history, showToast);
    }
    trackSelectPreapprovalBankLinkingBankModalOK(selectedBankItemName);
  };

  const onCancel = () => {
    trackSelectPreapprovalBankLinkingBankModalDeny(selectedBankItemName);
  };

  const skipBankLinkRedirectToSuccessPage = (skipType: BankLinkSkipType) => {
    history.push({
      pathname: brickLinkOK,
    });
    trackSelectPreapprovalBankLinkingSkip(skipType);
  };

  return (
    <section>
      <StyledSectionTitle>
        {t("bankSelectionPage.bankSectionTitle")}
      </StyledSectionTitle>
      <StyledBanksSection>
        {bankSelectionConfig.map(({ imageUrl, width, name }, index) => (
          <StyledBankWrapper key={index}>
            <BankItem
              imageUrl={imageUrl}
              width={width}
              onClick={() => onClickBankItem(name ?? "")}
            />
          </StyledBankWrapper>
        ))}
        <BankItem
          onClick={() =>
            skipBankLinkRedirectToSuccessPage(BankLinkSkipType.notListed)
          }
        >
          <StyledNotListBank>
            <TheBank width={"34px"} height={"34px"} />
            <StyledNotListBankText>
              {t("bankSelectionPage.bankNotListed")}
            </StyledNotListBankText>
          </StyledNotListBank>
        </BankItem>
      </StyledBanksSection>
      <StyledButtonWrapper>
        <Button
          buttonType={ButtonType.secondary1}
          width={"100%"}
          onClick={() =>
            skipBankLinkRedirectToSuccessPage(BankLinkSkipType.skip)
          }
        >
          <LinkLabelSmallSemiBold>{t("common.skip")}</LinkLabelSmallSemiBold>
        </Button>
      </StyledButtonWrapper>
      <DialogModal
        desc={t("bankSelectionPage.modalContent")}
        cancelButtonText={t("common.deny")}
        confirmButtonText={t("bankSelectionPage.confirmButton")}
        onConfirm={onConfirm}
        onCancel={onCancel}
        isNeedCancelButton={true}
        confirmButtonLoading={confirmButtonLoading}
        shouldCloseOnConfirm={false}
        modalImage={<BankSelectionModalImage width={"60%"} height={"100%"} />}
        isCloseIconShow={true}
      />
      <RenderToast
        type={ToastType.Error}
        message={t("bankSelectionPage.linkFailedErrorMessage")}
      />
    </section>
  );
};

const itemWidth = 156;
const spacing = getSpacing(itemWidth);

const StyledSectionTitle = styled(LinkLabelSmallSemiBold)`
  color: ${colors.label};
  display: block;
  margin-bottom: 20px;
  padding: 0 16px;
`;
const StyledBanksSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 14px;
  padding-left: ${spacing}px;
`;
const StyledNotListBank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledNotListBankText = styled(LinkLabelXSmallSemiBold)`
  display: block;
  margin-top: 13px;
  width: 80%;
  text-align: center;
`;
const StyledBankWrapper = styled.div`
  width: ${itemWidth}px;
  margin-right: ${spacing}px;
`;
const StyledButtonWrapper = styled.div`
  padding: 0 16px;
`;

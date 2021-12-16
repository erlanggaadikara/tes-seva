import React, { useState, useEffect, ChangeEvent, HTMLAttributes } from "react";
import styled from "styled-components";
import { useModal } from "components/Modal/Modal";
import { Button, ButtonType } from "components/Button/Button";
import { maxPageWidth } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { Close } from "components/icon/Close/Close";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { Input } from "components/form/Input/Input";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { UncheckedSquareOutlined } from "components/icon/UncheckedSquareOutlined/UncheckedSquareOutlined";
import {
  FormPhoneNumber,
  isValidPhoneNumber,
} from "pages/ScheduleAppointmentPage/FormPhoneNumber/FormPhoneNumber";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { createUnverifiedLead } from "services/lead";
import { ContactType } from "models/models";
import { ToastType, useToast } from "components/Toast/Toast";
import { useDialogModal } from "components/DialogModal/DialogModal";
import { maxPageWidthNumber, screenWidth } from "styles/GlobalStyle";
import { Contact } from "components/icon/Contact/Contact";
import { ZIndex } from "styles/zIndex";
import ReactPixel from "react-facebook-pixel";

interface ContactUsFloatingComponentProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
}
interface ContactUsModalProps {
  title: string;
  onSubmitSuccess: () => void;
}

export const ContactUsFloatingComponent = ({
  title,
  ...restProps
}: ContactUsFloatingComponentProps) => {
  const { ContactUsModal, showModal } = useContactUsModal();
  const { DialogModal, showModal: showDialogModal } = useDialogModal();
  const { t } = useTranslation();

  return (
    <StyledContactUsContainer {...restProps} onClick={showModal}>
      <Contact />
      <ContactUsModal title={title} onSubmitSuccess={showDialogModal} />
      <DialogModal
        title={t("homePageSearch.advisor.thanksTitle")}
        desc={t("homePageSearch.advisor.thanksDesc")}
        confirmButtonText={t("homePageSearch.advisor.alertButton")}
      />
    </StyledContactUsContainer>
  );
};

export const useContactUsModal = () => {
  const { showModal, hideModal, RenderModal } = useModal();

  const ContactUsModal = ({ title, onSubmitSuccess }: ContactUsModalProps) => {
    const [fullName, setFullName] = useState<string>("");
    const [confirmEnabled, setConfirmEnabled] = useState(false);
    const [isWhatsAppChecked, setIsWhatsAppChecked] = useState(false);
    const contactFormData = useContextContactFormData();
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast, RenderToast } = useToast();
    const { funnelQuery } = useFunnelQueryData();
    const { t } = useTranslation();

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) =>
      setFullName(event.target.value);

    const onCheckboxToggle = () => setIsWhatsAppChecked(!isWhatsAppChecked);

    useEffect(() => {
      if (!fullName || fullName[0] === " ") return setConfirmEnabled(false);
      setConfirmEnabled(
        isValidPhoneNumber(contactFormData.phoneNumber?.toString() ?? "")
      );
    }, [fullName, contactFormData.phoneNumber]);

    const onClickOK = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      setLoading(true);
      createUnverifiedLead({
        phoneNumber: contactFormData.phoneNumber as string,
        ...(funnelQuery.downPaymentAmount && {
          maxDp: parseInt(funnelQuery.downPaymentAmount as string),
        }),
        ...(funnelQuery.monthlyInstallment && {
          maxMonthlyInstallment: parseInt(
            funnelQuery.monthlyInstallment as string
          ),
        }),
        name: fullName,
        contactType: isWhatsAppChecked
          ? ContactType.whatsApp
          : ContactType.phone,
      })
        .then(() => {
          setLoading(false);
          hideModal();
          onSubmitSuccess();
        })
        .catch(() => {
          setLoading(false);
          showToast();
        });
    };

    const onClickCancel = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      hideModal();
    };

    return (
      <>
        <RenderModal blur={"22.8438px"}>
          <StyledWrapper>
            <StyledContent>
              <StyledCloseIcon onClick={onClickCancel}>
                <Close color={colors.primary1} />
              </StyledCloseIcon>
              <StyledTitle>{title}</StyledTitle>
              <StyledDesc>{t("contactUs.shareContactDetails")}</StyledDesc>
              <StyledSpacing />
              <Input
                type={"text"}
                maxLength={100}
                placeholder={t("homePageSearch.advisor.fullName")}
                value={fullName}
                onChange={onNameChange}
              />
              <StyledSpacing />
              <FormPhoneNumber showDefaultLabel={false} />
              <StyledSpacing />
              <StyledCheckbox onClick={onCheckboxToggle}>
                {isWhatsAppChecked ? (
                  <CheckedSquareOutlined />
                ) : (
                  <UncheckedSquareOutlined />
                )}
                <StyledCheckboxText>
                  {t("contactUs.contactOnWhatsApp")}
                </StyledCheckboxText>
              </StyledCheckbox>
              <StyledButton
                disabled={!confirmEnabled}
                buttonType={ButtonType.primary1}
                onClick={onClickOK}
                loading={loading}
              >
                {t("contactUs.confirmBtn")}
              </StyledButton>
            </StyledContent>
            <RenderToast
              type={ToastType.Error}
              message={t("common.errorMessage")}
            />
          </StyledWrapper>
        </RenderModal>
      </>
    );
  };
  return { ContactUsModal, hideModal, showModal };
};

const rightPadding = Math.max((screenWidth - maxPageWidthNumber) / 2, 0) + 16;
const StyledContactUsContainer = styled.div`
  position: fixed;
  right: ${rightPadding}px;
  bottom: 16px;
  z-index: ${ZIndex.Modal};
`;

const StyledWrapper = styled.div`
  width: ${maxPageWidth};
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 16px;
`;

const StyledContent = styled.div`
  border-radius: 16px;
  text-align: center;
  flex: 1;
  padding: 20px 24px 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${colors.white};
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  margin-top: 12px;
`;

const StyledDesc = styled(TextSmallRegular)`
  color: ${colors.label};
  margin-top: 10px;
`;

const StyledSpacing = styled.div`
  height: 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 22px;
  margin-bottom: 12px;
`;

const StyledCloseIcon = styled.div`
  display: flex;
  align-self: flex-end;
`;

const StyledCheckbox = styled.div`
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const StyledCheckboxText = styled(TextSmallRegular)`
  color: ${colors.label};
  margin-left: 8px;
  text-align: left;
`;

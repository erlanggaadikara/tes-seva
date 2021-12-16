import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useTranslation } from "react-i18next";
import { Button, ButtonType } from "components/Button/Button";
import { Input } from "components/form/Input/Input";
import {
  FormPhoneNumber,
  isValidPhoneNumber,
} from "pages/ScheduleAppointmentPage/FormPhoneNumber/FormPhoneNumber";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { UncheckedSquareOutlined } from "components/icon/UncheckedSquareOutlined/UncheckedSquareOutlined";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { createUnverifiedLead } from "services/lead";
import { ContactType } from "models/models";
import ReactPixel from "react-facebook-pixel";

interface AdvisorSectionProps {
  onSubmitSuccess: () => void;
}

export const AdvisorSection = ({ onSubmitSuccess }: AdvisorSectionProps) => {
  const [fullName, setFullName] = useState("");
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
    setConfirmEnabled(
      fullName.trim().length > 0 &&
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
      contactType: isWhatsAppChecked ? ContactType.whatsApp : ContactType.phone,
    })
      .then(() => {
        setLoading(false);
        onSubmitSuccess();
      })
      .catch(() => {
        setLoading(false);
        showToast();
      });
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <StyledTitle>{t("advisorSection.title")}</StyledTitle>
        <StyledSubtitle>{t("advisorSection.subtitle")}</StyledSubtitle>
        <InputWrapper>
          <StyledInput
            type={"text"}
            maxLength={100}
            placeholder={t("advisorSection.fullName")}
            value={fullName}
            onChange={onNameChange}
          />
          <FormPhoneNumberWrapper>
            <FormPhoneNumber showDefaultLabel={false} />
          </FormPhoneNumberWrapper>
          <StyledButton
            disabled={!confirmEnabled}
            buttonType={ButtonType.primary1}
            onClick={onClickOK}
            loading={loading}
            height={"40px"}
          >
            <StyledButtonText>{t(`advisorSection.button`)}</StyledButtonText>
          </StyledButton>
        </InputWrapper>
        <StyledCheckbox onClick={onCheckboxToggle}>
          {isWhatsAppChecked ? (
            <CheckedSquareOutlined />
          ) : (
            <UncheckedSquareOutlined />
          )}
          <StyledCheckboxText>
            {t("advisorSection.whatsapp")}
          </StyledCheckboxText>
        </StyledCheckbox>
      </ContentWrapper>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colors.inputBg};
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 60px 10vw;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 700px) {
    gap: 10px;
  }
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  font-size: 30px;
`;

const StyledSubtitle = styled(TextSmallRegular)`
  width: 40vw;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledInput = styled(Input)`
  width: 30vw;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const FormPhoneNumberWrapper = styled.div`
  width: 30vw;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 0;
  width: 15vw;
  height: 50px;
  background: ${colors.primary1};

  @media (max-width: 700px) {
    margin-left: auto;
    width: 100%;
  }
`;

const StyledButtonText = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 15px;
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

import React, { useState, ChangeEvent, useEffect } from "react";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "SectionHeader/SectionHeader";
import AdvisorImgOrigin from "./images/Advisor.png";
import AdvisorImgWebp from "./images/Advisor.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import { Input } from "components/form/Input/Input";
import { useDialogModal } from "components/DialogModal/DialogModal";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { Button, ButtonType } from "components/Button/Button";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { createUnverifiedLead } from "services/lead";
import { ContactType } from "models/models";
import { ToastType, useToast } from "components/Toast/Toast";
import {
  FormPhoneNumber,
  isValidPhoneNumber,
} from "ScheduleAppointmentPage/FormPhoneNumber/FormPhoneNumber";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import {
  trackSelectHomeSendDetails,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";
import { trackGASubmitContactInfo } from "helpers/googleAds";
import { FBPixelStandardEvent } from "helpers/facebookPixel";
import ReactPixel from "react-facebook-pixel";

export const AdvisorSection = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const { showToast, RenderToast } = useToast();
  const { DialogModal, showModal } = useDialogModal();
  const { funnelQuery } = useFunnelQueryData();
  const [ctaEnabled, setCTAEnabled] = useState(false);
  const contactFormData = useContextContactFormData();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCTAEnabled(
      fullName.length > 0 &&
        isValidPhoneNumber(contactFormData.phoneNumber?.toString() ?? "")
    );
  }, [fullName, contactFormData.phoneNumber]);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const onCTA = () => {
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
      contactType: ContactType.phone,
    })
      .then(() => {
        setLoading(false);
        showModal();
      })
      .catch(() => {
        setLoading(false);
        showToast();
      });
    trackSelectHomeSendDetails(NewHomePageVersion.phone);
    trackGASubmitContactInfo();
    ReactPixel.track(FBPixelStandardEvent.SendContactDetail);
  };

  return (
    <StyledWrapper>
      <SectionHeader text={t("homePageSearch.advisor.title")} />
      <WebpPicture
        src={AdvisorImgWebp}
        fallbackImage={
          <StyledFallbackImg src={AdvisorImgOrigin} alt="advisor pic" />
        }
      />
      <StyledDesc>
        <TextMediumRegular>
          {t("homePageSearch.advisor.desc")}
        </TextMediumRegular>
      </StyledDesc>
      <StyledContainer>
        <Input
          type={"text"}
          maxLength={100}
          placeholder={t("homePageSearch.advisor.fullName")}
          value={fullName}
          onChange={onNameChange}
        />
        <StyledSpacing />
        <FormPhoneNumber showDefaultLabel={false} />
        <StyledButton
          buttonType={ButtonType.primary1}
          disabled={!ctaEnabled}
          onClick={onCTA}
          loading={loading}
        >
          {t(`homePageSearch.advisor.cta`)}
        </StyledButton>
      </StyledContainer>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
      <DialogModal
        title={t("homePageSearch.advisor.thanksTitle")}
        desc={t("homePageSearch.advisor.thanksDesc")}
        confirmButtonText={t("homePageSearch.advisor.alertButton")}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledFallbackImg = styled(LazyLoadImage)`
  width: 100%;
`;

const StyledDesc = styled.div`
  margin-top: 28px;
`;

const StyledContainer = styled.div`
  margin-top: 28px;
`;

const StyledSpacing = styled.div`
  height: 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

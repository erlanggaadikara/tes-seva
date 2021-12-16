import React, { useEffect, useState } from "react";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import styled from "styled-components";
import { colors } from "styles/colors";
import { FiledSection } from "FiledSection/FiledSection";

import { useTranslation } from "react-i18next";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { createUnverifiedLead } from "services/lead";
import { AdVariation, LocationStateKey, PaymentType } from "models/models";
import { MonthlyInstallment } from "component/MonthlyInstallment/MonthlyInstallment";
import { PaymentTypeField } from "PaymentTypeField/PaymentTypeField";
import { Button, ButtonType } from "components/Button/Button";
import { LogoAstra } from "components/icon/LogoAstra/LogoAstra";
import ReactPixel from "react-facebook-pixel";
import { FBPixelStandardEvent } from "helpers/facebookPixel";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { CarRecommendationResponse } from "types/types";
import { AxiosResponse } from "axios";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { trackGAContact, trackGALead } from "helpers/googleAds";
import { carResultsUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import { useFunnelFormData } from "context/funnelFormContext/funnelFormContext";
import { FormPhoneNumber } from "ScheduleAppointmentPage/FormPhoneNumber/FormPhoneNumber";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import { DownPaymentAmount } from "component/DownPaymentAmount/DownPaymentAmount";
import {
  trackHomeCTA,
  NewHomePageVersion,
  EventFromType,
} from "helpers/amplitude/newHomePageEventTracking";

interface MiniSurveyFormProp {
  adVariation: AdVariation;
}

export const MiniSurveyForm = ({ adVariation }: MiniSurveyFormProp) => {
  const { funnelQuery, clearFunnelQuery } = useFunnelQueryData();
  const { patchFunnelForm } = useFunnelFormData();
  const { showToast, RenderToast } = useToast();
  const { setRecommendations } = useContextRecommendations();
  const { t } = useTranslation();
  const history = useHistory();
  const contactFormData = useContextContactFormData();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    clearFunnelQuery();
  }, []);

  const handleSearchCars = () => {
    ReactPixel.track(FBPixelStandardEvent.Contact);
    trackHomeCTA(EventFromType.home, adVariation, NewHomePageVersion.phone);

    const phoneNumber = String(contactFormData.phoneNumber);
    const isValidPhoneNumber = phoneNumber.length > 3;
    if (isValidPhoneNumber) {
      trackGALead();
      createUnverifiedLead({
        phoneNumber,
        ...(funnelQuery.downPaymentAmount && {
          maxDp: parseInt(funnelQuery.downPaymentAmount as string),
        }),
        ...(funnelQuery.monthlyInstallment && {
          maxMonthlyInstallment: parseInt(
            funnelQuery.monthlyInstallment as string
          ),
        }),
      });
    } else {
      trackGAContact();
    }
    requestCarRequest();
  };

  const requestCarRequest = () => {
    setLoading(true);
    getNewFunnelRecommendations(funnelQuery)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        setRecommendations(response.data.carRecommendations || []);
        const isRecommendationsEmpty =
          response.data.carRecommendations.length === 0;
        patchFunnelForm({
          monthlyInstallment: funnelQuery.monthlyInstallment,
          downPaymentAmount: funnelQuery.downPaymentAmount,
        });
        setLoading(false);
        history.push(carResultsUrl, {
          [LocationStateKey.IsCarRecommendationsEmpty]: isRecommendationsEmpty,
        });
      })
      .catch(() => {
        showToast();
      });
  };

  return (
    <StyledForm>
      <StyledTitleSection>
        <p>
          <LinkLabelLargeSemiBold>
            {t(`funnelFormPage.channels.${adVariation}.caption`)} 🚗🚀
          </LinkLabelLargeSemiBold>
        </p>
        <p>
          <LinkLabelLegalSemiBold>
            {t(`funnelFormPage.funnelForm.subtitle`)}
          </LinkLabelLegalSemiBold>
        </p>
      </StyledTitleSection>

      <FiledSection fieldLabel={"funnelFormPage.funnelForm.searchBy"}>
        <PaymentTypeField />
      </FiledSection>
      {funnelQuery.paymentType === PaymentType.DownPayment && (
        <FiledSection fieldLabel={"funnelFormPage.funnelForm.maxDpLabel"}>
          <DownPaymentAmount />
        </FiledSection>
      )}
      {funnelQuery.paymentType === PaymentType.MonthlyInstallment && (
        <FiledSection
          fieldLabel={"funnelFormPage.funnelForm.monthlyInstallmentLabel"}
        >
          <MonthlyInstallment />
        </FiledSection>
      )}
      <FiledSection fieldLabel={"funnelFormPage.funnelForm.phoneNumberLabel"}>
        <FormPhoneNumber showDefaultLabel={false} />
      </FiledSection>
      <StyledButtonSection>
        <StyledButtonAboveLabelSection>
          <LinkLabelLegalSemiBold>
            {t(
              `funnelFormPage.funnelForm.buttonAboveLabel.${funnelQuery.paymentType}`
            )}
          </LinkLabelLegalSemiBold>
        </StyledButtonAboveLabelSection>

        <Button
          width={"100%"}
          buttonType={ButtonType.primary1}
          onClick={handleSearchCars}
          loading={loading}
        >
          {t(`funnelFormPage.channels.${adVariation}.cta`)}
        </Button>
      </StyledButtonSection>
      <StyledSupportByText>
        {t(`funnelFormPage.funnelForm.supportBy`)}
      </StyledSupportByText>
      <LogoAstra />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledForm>
  );
};

const StyledSupportByText = styled(LinkLabelLegalSemiBold)`
  display: block;
  margin-top: 8px;
`;
const StyledForm = styled.section`
  padding: 16px;
  background: ${colors.white};
  text-align: center;
  border-radius: 8px;
`;
const StyledTitleSection = styled.section`
  margin-bottom: 16px;
`;
const StyledButtonSection = styled.div`
  margin-top: 24px;
`;
const StyledButtonAboveLabelSection = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.label};
`;

import React, { useEffect, useState } from "react";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import styled from "styled-components";
import { colors } from "styles/colors";
import { FiledSection } from "HomePage/components/FiledSection/FiledSection";
import { useTranslation } from "react-i18next";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { AdVariation, LocationStateKey, PaymentType } from "models/models";
import { DownPaymentAmount } from "component/DownPaymentAmount/DownPaymentAmount";
import { MonthlyInstallment } from "component/MonthlyInstallment/MonthlyInstallment";
import { PaymentTypeField } from "HomePage/components/PaymentTypeField/PaymentTypeField";
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
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import HeaderBgImgWebp from "./images/HeaderBG.webp";
import HeaderBgImg from "./images/HeaderBG.png";
import background from "./images/bg.png";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import {
  trackHomeCTA,
  EventFromType,
} from "helpers/amplitude/newHomePageEventTracking";

interface MiniSurveyFormProp {
  adVariation: AdVariation;
}

export const MiniSurveyForm = ({ adVariation }: MiniSurveyFormProp) => {
  const { funnelQuery, clearFunnelQuery } = useFunnelQueryData();
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
    trackHomeCTA(EventFromType.search, adVariation);
    ReactPixel.track(FBPixelStandardEvent.Contact);
    const phoneNumber = String(contactFormData.phoneNumber);
    const isValidPhoneNumber = phoneNumber.length > 3;
    if (isValidPhoneNumber) {
      trackGALead();
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
    <StyledContainer>
      <StyledHeaderBgContainer>
        <WebpPicture
          src={HeaderBgImgWebp}
          fallbackImage={<StyledHeaderImg alt="image" src={HeaderBgImg} />}
        />
      </StyledHeaderBgContainer>
      <StyledFormBg>
        <StyledForm>
          <StyledTitleSection>
            <p>
              <LinkLabelLargeSemiBold>
                {t(`homePageSearch.form.title`)} 🚗🚀
              </LinkLabelLargeSemiBold>
            </p>
          </StyledTitleSection>
          <FiledSection fieldLabel={"homePageSearch.form.searchBy"}>
            <PaymentTypeField />
          </FiledSection>
          {funnelQuery.paymentType === PaymentType.DownPayment && (
            <FiledSection fieldLabel={"homePageSearch.form.maxDpLabel"}>
              <DownPaymentAmount />
            </FiledSection>
          )}
          {funnelQuery.paymentType === PaymentType.MonthlyInstallment && (
            <FiledSection
              fieldLabel={"homePageSearch.form.monthlyInstallmentLabel"}
            >
              <MonthlyInstallment />
            </FiledSection>
          )}
          <StyledButtonSection>
            <StyledButtonAboveLabelSection>
              <LinkLabelLegalSemiBold>
                {t(
                  `funnelFormPage.funnelForm.buttonAboveLabel.${funnelQuery.paymentType}`
                )}
              </LinkLabelLegalSemiBold>
            </StyledButtonAboveLabelSection>
            <Button
              width="90%"
              buttonType={ButtonType.primary1}
              onClick={handleSearchCars}
              loading={loading}
            >
              {t(`homePageSearch.form.cta`)}
            </Button>
          </StyledButtonSection>
          <StyledSupportByText>
            {t(`funnelFormPage.funnelForm.supportBy`)}
          </StyledSupportByText>
          <LogoAstra />
          <RenderToast
            type={ToastType.Error}
            message={t("common.errorMessage")}
          />
        </StyledForm>
      </StyledFormBg>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyledHeaderImg = styled.img`
  width: 100%;
`;
const StyledSupportByText = styled(LinkLabelLegalSemiBold)`
  display: block;
  margin-top: 20px;
`;
const StyledHeaderBgContainer = styled.div`
  position: relative;
`;
const StyledFormBg = styled.div`
  background: url(${background}) no-repeat center;
  background-size: cover;
  margin-top: -3px;
  padding-bottom: 40px;
`;
const StyledForm = styled.section`
  margin: 0 24px 0;
  padding: 28px 24px;
  text-align: center;
  border-radius: 16px;
  background-color: ${colors.white};
`;
const StyledTitleSection = styled.section`
  text-align: left;
  margin-bottom: 22px;
`;
const StyledButtonSection = styled.div`
  margin-top: -24px;
`;
const StyledButtonAboveLabelSection = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  color: ${colors.label};
  text-align: left;
`;

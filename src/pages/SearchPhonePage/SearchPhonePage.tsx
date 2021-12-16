import React, { useEffect } from "react";
import styled from "styled-components";
import { AdVariation, QueryKeys } from "models/models";
import { useQuery } from "hooks/useQuery";
import {
  setUtmTagsAsUserProperties,
  UTMProps,
} from "helpers/trackingUserProperties";
import { colors } from "styles/colors";
import {
  trackViewHome,
  EventFromType,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";
import { MiniSurveyForm } from "./components/MiniSurveyForm/MiniSurveyForm";
import { BrandSection } from "./components/BrandSection/BrandSection";
import { CarBodyTypeSection } from "./components/CarBodyTypeSection/CarBodyTypeSection";
import { PopularCarSection } from "./components/PopularCarSection/PopularCarSection";
import { SurveySection } from "./components/SurveySection/SurveySection";
import { WalkingThroughSection } from "./components/WalkingThroughSection/WalkingThroughSection";
import { PromotionSection } from "./components/PromotionSection/PromotionSection";
import { AdvisorSection } from "./components/AdvisorSection/AdvisorSection";
import { FooterSection } from "./components/FooterSection/FooterSection";
import { PageHeader } from "component/PageHeader/PageHeader";
import { ContactUsFloatingComponent } from "components/ContactUsModal/ContactUsModal";
import { useTranslation } from "react-i18next";

export default function SearchPhonePage() {
  const {
    adVariation,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_id,
    adset,
    utm_term,
  }: UTMProps & { adVariation: AdVariation } = useQuery([
    QueryKeys.AdVariation,
    QueryKeys.UtmSource,
    QueryKeys.UtmMedium,
    QueryKeys.UtmCampaign,
    QueryKeys.UtmId,
    QueryKeys.UtmContent,
    QueryKeys.AdSet,
    QueryKeys.UtmTerm,
  ]);
  const adChannel = adVariation ?? AdVariation.FindACar;
  const { t } = useTranslation();
  useEffect(() => {
    setUtmTagsAsUserProperties({
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_id,
      adset,
      utm_term,
    });
    trackViewHome(
      EventFromType.searchPhone,
      adChannel,
      NewHomePageVersion.phone
    );
  }, []);

  return (
    <StyledContainer>
      <PageHeader />
      <MiniSurveyForm adVariation={adChannel} />
      <BrandSection />
      <CarBodyTypeSection />
      <PopularCarSection />
      <SurveySection />
      <WalkingThroughSection />
      <PromotionSection />
      <AdvisorSection />
      <FooterSection />
      <ContactUsFloatingComponent title={t("contactUs.getInTouch")} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: ${colors.white};
`;

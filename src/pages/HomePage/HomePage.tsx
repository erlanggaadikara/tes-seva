import React, { useEffect } from "react";

import { MiniSurveyForm } from "./components/MiniSurveyForm/MiniSurveyForm";
import { FunnelBackground } from "component/FunnelBackground/FunnelBackground";
import funnelBackgroundHeaderFindMyCar from "component/FunnelBackground/images/funnelBackgroundHeaderFindMyCar.jpg";
import funnelBackgroundHeaderFindMyCarWebp from "component/FunnelBackground/images/funnelBackgroundHeaderFindMyCar.webp";
import funnelBackgroundHeaderFindADeal from "component/FunnelBackground/images/funnelBackgroundHeaderFindADeal.jpg";
import funnelBackgroundHeaderFindADealWebp from "component/FunnelBackground/images/funnelBackgroundHeaderFindADeal.webp";
import funnelBackgroundHeaderFindALoan from "component/FunnelBackground/images/funnelBackgroundHeaderFindALoan.jpg";
import funnelBackgroundHeaderFindALoanWebp from "component/FunnelBackground/images/funnelBackgroundHeaderFindALoan.webp";
import funnelBackgroundHeaderFindAPromo from "component/FunnelBackground/images/funnelBackgroundHeaderFindAPromo.jpg";
import funnelBackgroundHeaderFindAPromoWebp from "component/FunnelBackground/images/funnelBackgroundHeaderFindAPromo.webp";
import { AdVariation, QueryKeys } from "models/models";
import { useQuery } from "hooks/useQuery";
import {
  trackViewHome,
  EventFromType,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";

const multiChannelsBgImageMap = {
  [AdVariation.FindACar]: {
    originBgImage: funnelBackgroundHeaderFindMyCar,
    webpBgImage: funnelBackgroundHeaderFindMyCarWebp,
  },
  [AdVariation.FindALoan]: {
    originBgImage: funnelBackgroundHeaderFindALoan,
    webpBgImage: funnelBackgroundHeaderFindALoanWebp,
  },
  [AdVariation.FindAPromo]: {
    originBgImage: funnelBackgroundHeaderFindAPromo,
    webpBgImage: funnelBackgroundHeaderFindAPromoWebp,
  },
  [AdVariation.Concierge]: {
    originBgImage: funnelBackgroundHeaderFindADeal,
    webpBgImage: funnelBackgroundHeaderFindADealWebp,
  },
};

export default function HomePage() {
  const { adVariation }: { adVariation: AdVariation } = useQuery([
    QueryKeys.AdVariation,
  ]);
  const adChannel = adVariation ?? AdVariation.FindACar;

  useEffect(() => {
    trackViewHome(EventFromType.home, adChannel, NewHomePageVersion.phone);
  }, []);

  return (
    <FunnelBackground bgImage={multiChannelsBgImageMap[adChannel]}>
      <MiniSurveyForm adVariation={adChannel} />
    </FunnelBackground>
  );
}

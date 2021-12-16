import React from "react";
import { FunnelBackgroundSeva } from "pages/component/FunnelBackgroundSeva/FunnelBackgroundSeva";
import { MaxWidthStyle } from "styles/MaxWidthStyle";
import funnelBackgrondHeaderFindMyCar from "pages/component/FunnelBackgroundSeva/images/funnelBackgrondHeaderFindMyCar.webp";
import funnelBackgrondHeaderFindMyCarMobile from "pages/component/FunnelBackgroundSeva/images/funnelBackgrondHeaderFindMyCarMobile.webp";
import { MiniSurveyFormSeva } from "pages/HomePageSeva/components/MiniSurveyFormSeva/MiniSurveyFormSeva";
import { isMobileDevice } from "utils/window";

export default function HomePageSeva() {
  return (
    <>
      <FunnelBackgroundSeva
        bgImage={
          isMobileDevice
            ? funnelBackgrondHeaderFindMyCarMobile
            : funnelBackgrondHeaderFindMyCar
        }
      >
        <MiniSurveyFormSeva />
      </FunnelBackgroundSeva>
    </>
  );
}

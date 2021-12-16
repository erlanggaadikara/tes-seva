import { FunnelItemStepAction } from "models/models";
import React from "react";
import funnelBackgroundStepSurvey from "./images/funnelBackgroundStepSurvey.png";
import funnelBackgroundStepLoan from "./images/funnelBackgroundStepLoan.png";
import funnelBackgroundStepAgents from "./images/funnelBackgroundStepAgents.png";
import funnelBackgroundStepProgress from "./images/funnelBackgroundStepProgress.png";
import { FunnelStepItemProp } from "./FunnelStepItem/FunnelStepItem";
import { GooglePlayElement } from "AppDownloadPage/component/GooglePlayElement";

export const funnelBackgroundStepsConfig: FunnelStepItemProp[] = [
  {
    image: funnelBackgroundStepSurvey,
    step: `funnelBackground.${FunnelItemStepAction.SurveyContent}.step`,
    title: `funnelBackground.${FunnelItemStepAction.SurveyContent}.title`,
    subtitle: `funnelBackground.${FunnelItemStepAction.SurveyContent}.subtitle`,
    buttonType: {
      action: FunnelItemStepAction.SurveyContent,
      title: `funnelBackground.${FunnelItemStepAction.SurveyContent}.buttonTitle`,
    },
  },
  {
    image: funnelBackgroundStepLoan,
    step: `funnelBackground.${FunnelItemStepAction.PickCar}.step`,
    title: `funnelBackground.${FunnelItemStepAction.PickCar}.title`,
    subtitle: `funnelBackground.${FunnelItemStepAction.PickCar}.subtitle`,
    buttonType: {
      action: FunnelItemStepAction.PickCar,
      title: `funnelBackground.${FunnelItemStepAction.PickCar}.buttonTitle`,
    },
  },
  {
    image: funnelBackgroundStepAgents,
    step: `funnelBackground.${FunnelItemStepAction.TalkToAgents}.step`,
    title: `funnelBackground.${FunnelItemStepAction.TalkToAgents}.title`,
    subtitle: `funnelBackground.${FunnelItemStepAction.TalkToAgents}.subtitle`,
    buttonType: {
      action: FunnelItemStepAction.TalkToAgents,
      title: `funnelBackground.${FunnelItemStepAction.TalkToAgents}.buttonTitle`,
    },
  },
  {
    image: funnelBackgroundStepProgress,
    step: `funnelBackground.${FunnelItemStepAction.TrackProgress}.step`,
    title: `funnelBackground.${FunnelItemStepAction.TrackProgress}.title`,
    subtitle: `funnelBackground.${FunnelItemStepAction.TrackProgress}.subtitle`,
    imageButton: <GooglePlayElement />,
  },
];

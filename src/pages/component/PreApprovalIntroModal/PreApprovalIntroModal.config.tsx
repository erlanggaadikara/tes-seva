import React from "react";
import { PreApprovalOTP } from "components/icon/PreApprovalOTP/PreApprovalOTP";
import { PreApprovalForm } from "components/icon/PreApprovalForm/PreApprovalForm";
import { PreApprovalKTP } from "components/icon/PreApprovalKTP/PreApprovalKTP";
import { PreApprovalIncome } from "components/icon/PreApprovalIncome/PreApprovalIncome";
import { CheckedCircleOutlined } from "components/icon/CheckedCircleOutlined/CheckedCircleOutlined";
import styled from "styled-components";
import { colors } from "styles/colors";

const StyledStepCheckIcon = styled(CheckedCircleOutlined)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(-50%);
`;

export interface PreApprovalStepConfig {
  text: string;
  icon: JSX.Element;
  checkmark?: JSX.Element;
}
interface PreApprovalIntroModalConfig {
  title: string;
  subtitle: string;
  steps: PreApprovalStepConfig[];
  positiveButton: string;
  secureInfoTitle: string;
  secureInfoDesc: string;
}

export const PreApprovalIntroModalConfig: PreApprovalIntroModalConfig = {
  title: "preApprovalIntroModal.title",
  subtitle: "preApprovalIntroModal.subtitle",
  steps: [
    {
      text: "preApprovalIntroModal.steps.0.label",
      icon: <PreApprovalOTP />,
      checkmark: <StyledStepCheckIcon color={colors.secondary} />,
    },
    {
      text: "preApprovalIntroModal.steps.1.label",
      icon: <PreApprovalForm />,
    },
    {
      text: "preApprovalIntroModal.steps.2.label",
      icon: <PreApprovalKTP />,
    },
    {
      text: "preApprovalIntroModal.steps.3.label",
      icon: <PreApprovalIncome />,
      checkmark: <StyledStepCheckIcon color={colors.secondary} />,
    },
  ],
  positiveButton: "preApprovalIntroModal.positiveButton",
  secureInfoTitle: "preApprovalIntroModal.secureInfoTitle",
  secureInfoDesc: "preApprovalIntroModal.secureInfoDesc",
};

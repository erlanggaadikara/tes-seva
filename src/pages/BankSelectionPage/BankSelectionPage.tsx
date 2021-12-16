import React from "react";
import { PreApprovalProgress } from "component/PreApprovalProgress/PreApprovalProgress";
import { PreApprovalProgressType } from "models/models";
import { IncomeEditSection } from "./components/IncomeEditSection/IncomeEditSection";
import styled from "styled-components";
import { ImproveChanceSection } from "./components/ImproveChanceSection/ImproveChanceSection";
import { colors } from "styles/colors";
import { BankSelectSection } from "./components/BankSelectSection/BankSelectSection";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackViewPreapprovalBankLinking } from "helpers/amplitude/preApprovalEventTracking";

export default function BankSelectionPage() {
  useAmplitudePageView(trackViewPreapprovalBankLinking);

  return (
    <section>
      <PreApprovalProgress
        progressType={PreApprovalProgressType.Bank}
        showBackButton={false}
      />
      <StyledContentSection>
        <IncomeEditSection />
        <ImproveChanceSection />
        <BankSelectSection />
      </StyledContentSection>
    </section>
  );
}
const StyledContentSection = styled.section`
  padding-bottom: 51px;
  background: ${colors.offWhite};
`;

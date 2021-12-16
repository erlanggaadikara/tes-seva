import React, { useEffect } from "react";
import { useModal } from "components/Modal/Modal";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Line } from "components/Line/Line";
import { FilterModalHeader } from "./FilterModalHeader";
import { FilterModalMonthlyInstallment } from "./FilterModalMonthlyInstallment";
import { FilterModalDownPayment } from "./FilterModalDownPayment";
import { FilterBrand } from "./FilterModalBrand";
import { maxPageWidth } from "styles/GlobalStyle";
import { FilterModalFooter } from "./FilterModalFooter";
import { PageHeader } from "component/PageHeader/PageHeader";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { trackFilterCarResultsCancel } from "helpers/amplitude/newFunnelEventTracking";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";

interface FilterModalProps {
  isShowFilterModal: boolean;
  hideFilterModal: () => void;
  onSubmitClick?: () => void;
}

export const FilterModal = ({
  isShowFilterModal,
  hideFilterModal,
  onSubmitClick,
}: FilterModalProps) => {
  const { showModal, hideModal, RenderModal } = useModal();
  const [currentLanguage, setLanguage] = useCurrentLanguage();

  useEffect(
    () => (isShowFilterModal ? showModal() : hideModal()),
    [isShowFilterModal]
  );

  const close = () => {
    trackFilterCarResultsCancel();
    hideFilterModal();
    setTimeout(() => {
      setLanguage(currentLanguage);
    }, 0);
  };

  return (
    <RenderModal>
      <StyledContainer>
        <StyledLogoHeader />
        <Line width={"100%"} height={"1px"} background={colors.line} />
        <StyledContent>
          <ArrowBack onClick={close} />
          <FilterModalHeader />
          <FilterModalMonthlyInstallment />
          <Line width={"100%"} height={"1px"} background={colors.line} />
          <FilterModalDownPayment />
          <Line width={"100%"} height={"1px"} background={colors.line} />
          <FilterBrand />
          <FilterModalFooter
            onSubmitClick={onSubmitClick}
            hideFilterModal={hideFilterModal}
          />
        </StyledContent>
      </StyledContainer>
    </RenderModal>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: calc(${maxPageWidth});
  background: ${colors.white};
  min-height: 100vh;
  overflow-y: scroll;
`;

const StyledContent = styled.div`
  padding: 16px;
  position: relative;
`;

const StyledLogoHeader = styled(PageHeader)`
  border-bottom: 1px solid ${colors.line};
`;

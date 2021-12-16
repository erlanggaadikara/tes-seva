import React, { useEffect } from "react";
import { useModal } from "components/Modal/Modal";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Line } from "components/Line/Line";
import { maxPageWidth } from "styles/GlobalStyle";
import { PageHeader } from "pages/component/PageHeader/PageHeader";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { FilterBrand } from "pages/component/Filter/FilterSideMenu/FilterBrand";
import { FilterBody } from "pages/component/Filter/FilterSideMenu/FilterBody";
import { FilterMonthly } from "pages/component/Filter/FilterSideMenu/FilterMonthly";
import { FilterDownPayment } from "pages/component/Filter/FilterSideMenu/FilterDownPayment";
import { FilterModalFooter } from "./FilterModalFooter";
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
          <Wrapper>
            <StyledTitle onClick={onSubmitClick}>Filter by</StyledTitle>
            <FilterBrand />
            <Line width={"100%"} height={"1px"} background={colors.line} />
            <FilterBody />
            <Line width={"100%"} height={"1px"} background={colors.line} />
            <FilterMonthly />
            <Line width={"100%"} height={"1px"} background={colors.line} />
            <FilterDownPayment />
            <FilterModalFooter
              onSubmitClick={onSubmitClick}
              hideFilterModal={hideFilterModal}
            />
          </Wrapper>
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
  margin-bottom: 80px;
`;

const StyledLogoHeader = styled(PageHeader)`
  border-bottom: 1px solid ${colors.line};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  font-size: 28px;
  margin-bottom: 30px;
`;

import React, { useState } from "react";
import { Filter } from "components/icon/Filter/Filter";
import styled from "styled-components";
import { FilterModal } from "./FilterModal/FilterModal";
import { FilterBadge } from "./FilterModal/FilterBadge";
import { clearQuery } from "utils/httpUtils/httpUtils";
interface FilterCarResultsProps {
  onSubmitClick?: () => void;
}

export const FilterCarResults = ({ onSubmitClick }: FilterCarResultsProps) => {
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);

  const showFilterModal = () => {
    clearQuery();
    setIsShowFilterModal(!isShowFilterModal);
  };
  const hideFilterModal = () => setIsShowFilterModal(!isShowFilterModal);

  return (
    <>
      <StyledIcon onClick={showFilterModal}>
        <FilterBadge />
        <Filter />
      </StyledIcon>
      <FilterModal
        onSubmitClick={onSubmitClick}
        isShowFilterModal={isShowFilterModal}
        hideFilterModal={hideFilterModal}
      />
    </>
  );
};

const StyledIcon = styled.div`
  position: relative;
`;

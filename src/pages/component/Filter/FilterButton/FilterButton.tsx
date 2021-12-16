import React, { useState } from "react";
import { Filter } from "components/icon/Filter/Filter";
import styled from "styled-components";
import { FilterModal } from "pages/component/Filter/FilterModal/FilterModal";
import { FilterBadge } from "./FilterBadge";
import { clearQuery } from "utils/httpUtils/httpUtils";

interface FilterButtonProps {
  onSubmitClick?: () => void;
}

export const FilterButton = ({ onSubmitClick }: FilterButtonProps) => {
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

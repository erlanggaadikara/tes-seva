import { colors } from 'styles/colors'
import React from 'react'
import styled from 'styled-components'
import { CarModelBasicDetailsResponse } from 'types/types'

interface ModelDetailHeaderProps {
  carModelDetails: CarModelBasicDetailsResponse
}

export const ModelDetailHeader = ({
  carModelDetails,
}: ModelDetailHeaderProps) => {
  return (
    <StyledHeader>
      {carModelDetails.images && (
        <StyledCarImg src={carModelDetails.images[0]} alt="car image" />
      )}
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  width: 100%;
  background: ${colors.carBg};
`
const StyledCarImg = styled.img`
  width: 82%;
  margin: 0 34px;
`

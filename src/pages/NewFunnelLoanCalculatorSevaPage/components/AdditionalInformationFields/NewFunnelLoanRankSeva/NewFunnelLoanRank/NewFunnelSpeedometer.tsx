import React from 'react'
import { NewFunnelLoanRank } from 'models/models'
import { colors } from 'styles/colors'
import { SpeedometerSvg } from 'components/SpeedometerSvg/SpeedometerSvg'

interface NewFunnelSpeedometerProps {
  loanRank: NewFunnelLoanRank
  radius?: number
  lineWidth?: number
}
const newFunnelSpeedometerMap = {
  [NewFunnelLoanRank.Red]: [
    colors.error,
    colors.error,
    colors.white,
    colors.white,
    colors.white,
    colors.white,
  ],
  [NewFunnelLoanRank.Yellow]: [
    colors.secondaryDark2,
    colors.secondaryDark2,
    colors.secondaryDark2,
    colors.secondaryDark2,
    colors.white,
    colors.white,
  ],
  [NewFunnelLoanRank.Green]: [
    colors.secondaryText,
    colors.secondaryText,
    colors.secondaryText,
    colors.secondaryText,
    colors.secondaryText,
    colors.secondaryText,
  ],
  [NewFunnelLoanRank.Grey]: [
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
    colors.placeholder,
  ],
}
export const NewFunnelSpeedometerSeva = ({
  loanRank,
  radius = 30,
  lineWidth = 8,
}: NewFunnelSpeedometerProps) => {
  return (
    <SpeedometerSvg
      radius={radius}
      colors={newFunnelSpeedometerMap[loanRank]}
      lineWidth={lineWidth}
    />
  )
}

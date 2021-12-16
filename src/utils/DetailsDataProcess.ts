import { LoanRank } from "models/models";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { SpeedometerGreen } from "components/SpeedometerGreen/SpeedometerGreen";
import { SpeedometerYellow } from "components/SpeedometerYellow/SpeedometerYellow";
import {
  ColoredSpeedometerProps,
  SpeedometerRed,
} from "components/SpeedometerRed/SpeedometerRed";

export type RankMap = { [key in keyof typeof LoanRank]: string };
export type LoanRankKey = LoanRank | keyof typeof LoanRank;
const loanRankBgColorMap: RankMap = {
  [LoanRank.Green]: colors.successLight,
  [LoanRank.Yellow]: colors.warningLight,
  [LoanRank.Red]: colors.errorLight,
};
const loanRankColorMap: RankMap = {
  [LoanRank.Green]: colors.success,
  [LoanRank.Yellow]: colors.warning,
  [LoanRank.Red]: colors.error,
};
const loanRankTextMap: RankMap = {
  [LoanRank.Green]: "loanRankText.easy",
  [LoanRank.Yellow]: "loanRankText.maybeDifficult",
  [LoanRank.Red]: "loanRankText.difficult",
};

type SpeedometerMap = {
  [key in keyof typeof LoanRank]: (
    props: ColoredSpeedometerProps
  ) => JSX.Element;
};

const speedometerMap: SpeedometerMap = {
  [LoanRank.Green]: SpeedometerGreen,
  [LoanRank.Yellow]: SpeedometerYellow,
  [LoanRank.Red]: SpeedometerRed,
};
export const getLoanRankBgColor = (loanRank: LoanRankKey) => {
  return loanRankBgColorMap[loanRank];
};
export const getLoanRankColor = (loanRank: LoanRankKey) => {
  return loanRankColorMap[loanRank];
};
export const getLoanRatingText = (loanRank: LoanRankKey) => {
  const { t } = useTranslation();
  return t(loanRankTextMap[loanRank]);
};

export const getSpeedometerMap = (loanRank: LoanRankKey) => {
  return speedometerMap[loanRank];
};

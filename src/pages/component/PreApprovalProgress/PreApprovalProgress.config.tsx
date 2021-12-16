import React from "react";
import {
  PreApprovalQuestionsKey,
  PreApprovalProgressType,
} from "models/models";
import { Questions } from "components/icon/Questions/Questions";
import { IconProps } from "components/icon/iconType";
import { Files } from "components/icon/Files/Files";
import { Bank } from "components/icon/Bank/Bank";
import { transparent } from "styles/colors";

interface PreApprovalProgressConfigType {
  type: PreApprovalProgressType;
  icon: ({ backgroundColor, borderColor }: IconProps) => JSX.Element;
  children?: PreApprovalQuestionsKey[];
}

export const PreApprovalProgressConfig: PreApprovalProgressConfigType[] = [
  {
    type: PreApprovalProgressType.Questions,
    icon: function icon({
      backgroundColor = transparent("white", 0.25),
      borderColor = transparent("white", 0.25),
    }: IconProps) {
      return (
        <Questions
          backgroundColor={backgroundColor}
          borderColor={borderColor}
        />
      );
    },
    children: [
      PreApprovalQuestionsKey.Occupation,
      PreApprovalQuestionsKey.TotalIncome,
      PreApprovalQuestionsKey.Address,
      PreApprovalQuestionsKey.Email,
    ],
  },
  {
    type: PreApprovalProgressType.Files,
    icon: function icon({
      backgroundColor = transparent("white", 0.25),
      borderColor = transparent("white", 0.25),
    }: IconProps) {
      return (
        <Files backgroundColor={backgroundColor} borderColor={borderColor} />
      );
    },
    children: [
      PreApprovalQuestionsKey.Occupation,
      PreApprovalQuestionsKey.TotalIncome,
      PreApprovalQuestionsKey.Address,
      PreApprovalQuestionsKey.Email,
    ],
  },
  {
    type: PreApprovalProgressType.Bank,
    icon: function icon({
      backgroundColor = transparent("white", 0.25),
      borderColor = transparent("white", 0.25),
    }: IconProps) {
      return (
        <Bank backgroundColor={backgroundColor} borderColor={borderColor} />
      );
    },
  },
];

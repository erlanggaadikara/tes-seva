import React from "react";
import { OptionProps } from "components/form/RadioButton/RadioButton";
import { Gender } from "models/models";
import { Male } from "components/icon/Male/Male";
import { Female } from "components/icon/Female/Female";

type GenderOptionProps = OptionProps<Gender>;

interface GenderFormConfig {
  id: string;
  label: string;
  options: GenderOptionProps[];
}

export const genderFormConfig: GenderFormConfig = {
  id: "gender",
  label: "surveyForm.fields.gender.label",
  options: [
    {
      optionValue: Gender.Male,
      image: <Male />,
      label: "surveyForm.fields.gender.options.male",
      isSelected: false,
    },
    {
      optionValue: Gender.Female,
      image: <Female />,
      label: "surveyForm.fields.gender.options.female",
      isSelected: false,
    },
  ],
};

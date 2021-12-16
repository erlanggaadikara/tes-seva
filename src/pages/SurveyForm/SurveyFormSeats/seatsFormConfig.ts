import { Seats } from "models/models";
import { BigCar } from "components/icon/BigCar/BigCar";
import { CheckboxItemType } from "components/form/Checkbox/CheckboxItem";
import { SmallCar } from "components/icon/SmallCar/SmallCar";

interface SeatsFormConfig {
  id: string;
  label: string;
  subtitle: string;
  options: CheckboxItemType[];
}

export const seatsFormConfig: SeatsFormConfig = {
  id: "seats",
  label: "surveyForm.fields.seats.label",
  subtitle: "surveyForm.fields.seats.subtitle",
  options: [
    {
      value: Seats.LessThanOrEqualTo5Seater,
      image: SmallCar,
      label: "surveyForm.fields.seats.options.lessThanOrEqualTo5Seater",
      isChecked: false,
    },
    {
      value: Seats.MoreThan5Seater,
      image: BigCar,
      label: "surveyForm.fields.seats.options.moreThan5Seater",
      isChecked: false,
    },
  ],
};

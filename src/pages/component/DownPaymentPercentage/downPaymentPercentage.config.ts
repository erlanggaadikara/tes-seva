import { CheckboxItemType } from "components/form/Checkbox/CheckboxItem";
import { generateDpPercentageRange } from "pages/HomePage/utils/miniSurveyFormUtil";
import { percentage } from "const/const";

interface OptionConfig {
  options: CheckboxItemType[];
}

const getDropDownOptions = (initDropDownValueRange: string[]) => {
  return initDropDownValueRange.map((item) => {
    return {
      value: `${Number(item) * 100}`,
      label: `${Number(item) * 100}${percentage}`,
      isChecked: false,
    };
  });
};

export const downPaymentPercentageConfig: OptionConfig = {
  options: getDropDownOptions(generateDpPercentageRange()),
};

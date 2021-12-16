import { CheckboxItemType } from "components/form/Checkbox/CheckboxItem";
import { million } from "pages/HomePage/utils/miniSurveyFormUtil";
import { greaterThan, jt, Rp } from "const/const";

interface OptionConfig {
  options: CheckboxItemType[];
}
export const monthlyInstallmentConfig: OptionConfig = {
  options: [
    {
      value: `${3 * million}`,
      label: `${Rp} 3 ${jt}`,
      isChecked: false,
    },
    {
      value: `${4 * million}`,
      label: `${Rp} 4 ${jt}`,
      isChecked: false,
    },
    {
      value: `${5 * million}`,
      label: `${Rp} 5 ${jt}`,
      isChecked: false,
    },
    {
      value: `${6 * million}`,
      label: `${Rp} 6 ${jt}`,
      isChecked: false,
    },
    {
      value: `${7 * million}`,
      label: `${Rp} 7 ${jt}`,
      isChecked: false,
    },
    {
      value: `${10 * million}`,
      label: `${Rp} 10 ${jt}`,
      isChecked: false,
    },
    {
      value: `${10.1 * million}`,
      label: `${Rp} ${greaterThan} 10 ${jt}`,
      isChecked: false,
    },
  ],
};

import { CheckboxItemType } from "components/form/Checkbox/CheckboxItem";

import { greaterThan, jt, million, Rp } from "const/const";
interface OptionConfig {
  options: CheckboxItemType[];
}

export const downPaymentConfig: OptionConfig = {
  options: [
    {
      value: `${30 * million}`,
      label: `${Rp} 30 ${jt}`,
      isChecked: false,
    },
    {
      value: `${40 * million}`,
      label: `${Rp} 40 ${jt}`,
      isChecked: false,
    },
    {
      value: `${50 * million}`,
      label: `${Rp} 50 ${jt}`,
      isChecked: false,
    },
    {
      value: `${75 * million}`,
      label: `${Rp} 75 ${jt}`,
      isChecked: false,
    },
    {
      value: `${100 * million}`,
      label: `${Rp} 100 ${jt}`,
      isChecked: false,
    },
    {
      value: `${150 * million}`,
      label: `${Rp} 150 ${jt}`,
      isChecked: false,
    },
    {
      value: `${250 * million}`,
      label: `${Rp} 250 ${jt}`,
      isChecked: false,
    },
    {
      value: `${350 * million}`,
      label: `${Rp} 350 ${jt}`,
      isChecked: false,
    },
    {
      value: `${351 * million}`,
      label: `${Rp} ${greaterThan} 350 ${jt}`,
      isChecked: false,
    },
  ],
};

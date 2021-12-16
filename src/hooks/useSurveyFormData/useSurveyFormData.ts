import { FormControlValue } from "types/types";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LocalStorageKey, SurveyFormKey } from "models/models";
import { FormControl } from "context/surveyFormContext/surveyFormContext";

export type FormItem = { [k in SurveyFormKey]?: FormControl<FormControlValue> };

export const defaultFormValue: FormItem = {
  [SurveyFormKey.Age]: { value: undefined, isDataValid: false },
  [SurveyFormKey.Gender]: { value: undefined, isDataValid: false },
  [SurveyFormKey.Occupation]: { value: undefined, isDataValid: false },
  [SurveyFormKey.Education]: { value: undefined, isDataValid: false },
  [SurveyFormKey.City]: { value: undefined, isDataValid: false },
  [SurveyFormKey.CashFlow]: { value: undefined, isDataValid: false },
  [SurveyFormKey.TotalIncome]: { value: undefined, isDataValid: false },
  [SurveyFormKey.DownPayment]: { value: undefined, isDataValid: false },
  [SurveyFormKey.HomeOwnership]: { value: undefined, isDataValid: false },
  [SurveyFormKey.SeatNumber]: { value: undefined, isDataValid: false },
};

// MARK: Please use useContextSurveyFormData instead
export const useSurveyFormData = (
  initialFormData: FormItem = defaultFormValue
) => {
  const [formValue, setFormValue] = useLocalStorage<FormItem>(
    LocalStorageKey.SurveyForm,
    initialFormData
  );
  const formItemValue = (key: SurveyFormKey) => formValue[key]?.value;

  const patchFormItemValue = (value: FormItem) => {
    setFormValue((preValue: FormItem) => {
      return { ...preValue, ...value };
    });
  };
  return { formItemValue, patchFormItemValue, formValue };
};

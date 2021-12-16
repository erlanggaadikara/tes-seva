import React, { createContext, useContext } from "react";
import { FormControlValue } from "types/types";
import {
  defaultFormValue,
  useSurveyFormData,
} from "hooks/useSurveyFormData/useSurveyFormData";
import { SurveyFormKey } from "models/models";

export interface FormControl<T extends FormControlValue> {
  value: T;
  isDataValid: boolean;
}
export type FormItem = { [k in SurveyFormKey]?: FormControl<FormControlValue> };

const FormDataContext = createContext<FormItem>(defaultFormValue);
const FormPatchContext = createContext((value: FormItem) => {
  console.log(value);
  return;
});

export const SurveyFormProvider = (props: HTMLElement) => {
  const { patchFormItemValue, formValue } = useSurveyFormData();
  const patchFormValue = (value: FormItem) => {
    patchFormItemValue(value);
  };

  return (
    <FormDataContext.Provider value={formValue}>
      <FormPatchContext.Provider value={patchFormValue}>
        {props.children}
      </FormPatchContext.Provider>
    </FormDataContext.Provider>
  );
};
export const useContextSurveyFormData = () => useContext(FormDataContext);
export const useContextSurveyFormPatch = () => useContext(FormPatchContext);

import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { ContactFormKey, LocalStorageKey } from "models/models";

export type FormItem = { [k in ContactFormKey]?: string };

export const CountryCodePlusSign = "+";
export const IndonesiaCountryCode = "62";

export const defaultContactFormValue: FormItem = {
  [ContactFormKey.Name]: undefined,
  [ContactFormKey.PurchaseTime]: undefined,
  [ContactFormKey.ContactTime]: undefined,
  [ContactFormKey.PhoneNumber]: `${CountryCodePlusSign}${IndonesiaCountryCode}`,
};

export const useContactFormData = (
  initialFormData: FormItem = defaultContactFormValue
) => {
  const [formValue, setFormValue] = useLocalStorage<FormItem>(
    LocalStorageKey.ContactForm,
    initialFormData
  );
  const formItemValue = (key: ContactFormKey) => formValue[key];

  const patchFormItemValue = (value: FormItem) => {
    setFormValue((preValue: FormItem) => {
      return { ...preValue, ...value };
    });
  };
  return { formItemValue, patchFormItemValue, formValue };
};

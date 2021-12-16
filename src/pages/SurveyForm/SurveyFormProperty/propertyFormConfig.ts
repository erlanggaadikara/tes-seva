import { OptionProps } from 'components/form/RadioButton/RadioButton'
import { Property } from 'models/models'

type PropertyOptionProps = OptionProps<Property>

interface PropertyFormConfig {
  id: string
  label: string
  options: PropertyOptionProps[]
}

export const propertyFormConfig: PropertyFormConfig = {
  id: 'property',
  label: 'surveyForm.fields.property.label',
  options: [
    {
      optionValue: Property.Yes,
      label: 'surveyForm.fields.property.options.yes',
      isSelected: false,
    },
    {
      optionValue: Property.No,
      label: 'surveyForm.fields.property.options.no',
      isSelected: false,
    },
  ],
}

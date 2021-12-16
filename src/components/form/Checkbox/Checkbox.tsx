import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { CheckboxItem, CheckboxItemType } from './CheckboxItem'

interface CheckboxProps {
  value: string[]
  options: CheckboxItemType[]
  onChanged: (data: string[]) => void
  showIcon?: boolean
}

export const Checkbox = ({
  value,
  options,
  onChanged,
  showIcon = true,
}: CheckboxProps): ReactElement => {
  const getOptionList = (
    options: CheckboxItemType[],
    selectedValue: string[],
  ) =>
    options.map((option) => {
      const subOptions = option.subOptions?.map((subOption) => ({
        ...subOption,
        isChecked: getCheckedState(selectedValue, subOption.value),
      }))
      return {
        ...option,
        isChecked: getCheckedState(selectedValue, option.value),
        subOptions,
      }
    })

  const getCheckedState = (options: string[], targetValue: string) =>
    !!options.find((selected) => selected === targetValue)

  const [newOptions, setNewOptions] = useState(() =>
    getOptionList(options, value),
  )
  const handleChange = (data: CheckboxItemType) => {
    let result
    if (value) {
      if (!data.isChecked) {
        result = value.filter((item) => !item.startsWith(data.value))
      } else {
        result = [...value, data.value]
      }
    } else {
      result = [data.value]
    }
    const newestOptionList = getOptionList(newOptions, result)
    setNewOptions(newestOptionList)
    onChanged(result)
  }

  return (
    <StyledContainer>
      {newOptions.map((data) => {
        return (
          <CheckboxItem
            key={data.value}
            itemData={data}
            onItemClick={handleChange}
            showIcon={showIcon}
          />
        )
      })}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  align-items: center;
  flex-direction: column;
`

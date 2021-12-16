import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { Input } from "components/form/Input/Input";
import { Search } from "components/icon/Search/Search";
import { Close } from "components/icon/Close/Close";

interface searchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearchInputChange: (value: string) => void;
  searchInputValue: string;
  placeholder?: string;
  height?: number;
}

export const SearchInput = ({
  onSearchInputChange,
  searchInputValue,
  placeholder = "",
  height = 50,
  ...restProps
}: searchInputProps) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(event.target.value);
  };

  const suffixIconClick = () => {
    onSearchInputChange("");
  };
  const suffixIcon = () =>
    searchInputValue ? (
      <div onClick={suffixIconClick}>
        <Close />
      </div>
    ) : (
      <></>
    );
  return (
    <Input
      value={searchInputValue}
      onChange={onInputChange}
      prefixComponent={() => <Search />}
      suffixIcon={suffixIcon}
      placeholder={placeholder}
      type={"text"}
      height={height}
      prefixMarginRight={6}
      {...restProps}
    />
  );
};

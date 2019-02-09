import * as React from 'react';

interface DropdownProps<T> {
  name: string;
  value?: string | number | string[];
  valueField: string;
  disabled?: boolean;
  titleField: string;
  options: Array<T>;
  multiple?: boolean;
  onChange: (e) => void;
  className?: string;
};

export function Dropdown<T> ({
  name,
  value,
  disabled,
  valueField,
  titleField,
  options,
  onChange,
  multiple = false,
  ...props
}: DropdownProps<T>) {
  return (
    <select
      value={value}
      name={name}
      disabled={disabled}
      onChange={onChange}
      multiple={multiple}
      {...props}
    >
      <option value="">-</option>

      {options.map(option => (
        <option key={option[valueField]} value={option[valueField]}>
          {option[titleField]}
        </option>
      ))}
    </select>
  );
};
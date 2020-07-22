import React from 'react';

interface Props {
  placeholder: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}

const Input: React.FC<Props> = ({
  type,
  placeholder,
  disabled,
  value,
  onChange,
  onEnter,
}: Props) => (
  <input
    type={type}
    disabled={disabled}
    className="w-full mt-4 px-4 py-3 bg-red-200 text-gray-900 text-center placeholder-gray-600 rounded-full focus:outline-none focus:shadow-outline"
    placeholder={placeholder}
    value={value}
    onChange={onChange && ((event) => onChange(event.target.value))}
    onKeyDown={(event) => {
      if (onEnter && event.key === 'Enter') onEnter();
    }}
  />
);

export default Input;

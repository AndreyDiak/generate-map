import React from "react";

interface Props {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export const CheckBox = React.memo(({ value, setValue, label }: Props) => (
  <div className="my-2 flex flex-row space-x-2">
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
    />
    <span className="text-sm text-gray-500">{label}</span>
  </div>
));

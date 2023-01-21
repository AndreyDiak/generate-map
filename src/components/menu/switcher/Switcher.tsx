import React from "react";
import { Label } from "../../common/label/Label";
import { Wrapper } from "../../common/wrapper/Wrapper";

interface Props {
  label: string;
  options: { label: string; value: any }[];
  value: any;
  setValue: (value: any) => void;
}

export const Switcher = React.memo(
  ({ value, setValue, label, options }: Props) => (
    <Wrapper>
      <Label label={label} />
      <div className="bg-gray-200 rounded-md flex justify-center flex-row space-x-3 py-2 px-5">
        {options.map((option) => (
          <div
            className={`bg-gray-400 rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-500 font-bold text-sm text-gray-100 ${
              option.value === value && "bg-gray-600 text-white"
            }`}
            onClick={() => setValue(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </Wrapper>
  )
);

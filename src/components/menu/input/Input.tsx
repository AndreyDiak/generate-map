import React from "react";
import { Label } from "../../common/label/Label";
import { Wrapper } from "../../common/wrapper/Wrapper";

interface Props {
  label: string;
  value: number;
  validation?: {
    min?: number;
    max?: number;
  };
  setValue: (value: number) => void;
}

export const Input = React.memo(
  ({ label, value, setValue, validation }: Props) => {
    const handleChange = (value: number) => {
      if (!validation) {
        setValue(value);
      } else {
        if (
          (!!validation.min && value < validation.min) ||
          (!!validation.max && value > validation.max)
        ) {
          return;
        } else {
          setValue(value);
        }
      }
    };

    return (
      <Wrapper>
        <Label label={label} />
        <input
          type="number"
          placeholder="map size"
          className="outline-none bg-gray-200 rounded-lg px-4 py-2 font-bold text-lg max-w-[100px]"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </Wrapper>
    );
  }
);

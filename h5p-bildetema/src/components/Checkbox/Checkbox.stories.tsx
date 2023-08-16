import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

const Template = (disabled: boolean): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = (value: boolean): void => {
    setChecked(value);
  };

  return (
    <Checkbox
      id="small"
      checked={checked}
      disabled={disabled}
      handleChange={handleChange}
      label="Checkbox label"
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};

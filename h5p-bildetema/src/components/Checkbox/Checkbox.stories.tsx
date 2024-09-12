import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: "small",
    checked: false,
    disabled: false,
    label: "Checkbox label",
  },
  render: ({ id, checked, disabled, label }) => {
    const [isChecked, setIsChecked] = useState(checked);

    return (
      <Checkbox
        id={id}
        checked={isChecked}
        disabled={disabled}
        handleChange={setIsChecked}
        label={label}
      />
    );
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
  render: ({ id, checked, label }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(checked);

    let size;

    switch (label) {
      case "Large":
        size = "1.4rem";
        break;
      case "Medium":
        size = "1.2rem";
        break;
      case "Small":
      default:
        size = "1rem";
    }

    return (
      <span style={{ fontSize: size }}>
        <Toggle
          id={id}
          checked={isChecked}
          handleChange={setIsChecked}
          label={label}
        />
      </span>
    );
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

export const LabelSmall: Story = {
  args: {
    id: "small",
    checked: false,
    label: "Small",
  },
};

export const LabelMedium: Story = {
  args: {
    id: "medium",
    checked: false,
    label: "Medium",
  },
};

export const LabelLarge: Story = {
  args: {
    id: "large",
    checked: false,
    label: "Large",
  },
};

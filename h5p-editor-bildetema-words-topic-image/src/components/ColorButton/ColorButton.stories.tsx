import { Meta, StoryObj } from "@storybook/react";
import { Color } from "common/enums/Color";
import { ColorButton, ColorButtonProps } from "./ColorButton";

export default {
  title: "Components/Color button",
  component: ColorButton,
} satisfies Meta<typeof ColorButton>;

type Story = StoryObj<typeof ColorButton>;

export const Default: Story = {
  args: {
    color: Color.ORANGE,
    selected: true,
    handleClick: () => null,
  },
};

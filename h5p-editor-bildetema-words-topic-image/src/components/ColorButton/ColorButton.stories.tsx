import { Meta } from "@storybook/react";
import { Color } from "common/enums/Color";
import { ColorButton, ColorButtonProps } from "./ColorButton";

export default {
  title: "Components/Color button",
  component: ColorButton,
} satisfies Meta<typeof ColorButton>;

export const Default = {
  args: {
    color: Color.ORANGE,
    selected: true,
    handleClick: () => null,
  },
};

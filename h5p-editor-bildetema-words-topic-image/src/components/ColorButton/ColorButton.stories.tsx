import { Meta, StoryFn } from "@storybook/react";
import { Color } from "common/enums/Color";
import { ColorButton, ColorButtonProps } from "./ColorButton";

export default {
  title: "Components/ColorButton",
  component: ColorButton,
} satisfies Meta<typeof ColorButton>;

const Template: StoryFn<typeof ColorButton> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ColorButton {...args} />
);

export const Default = Template.bind({});

const defaultArgs: ColorButtonProps = {
  color: Color.ORANGE,
  selected: true,
  handleClick: () => null,
};

Default.args = defaultArgs;

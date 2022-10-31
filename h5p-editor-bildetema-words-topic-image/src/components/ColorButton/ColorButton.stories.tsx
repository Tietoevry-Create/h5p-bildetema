import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ColorButton, ColorButtonProps } from "./ColorButton";
import { Color } from "../../../../common/enums/Color";

export default {
  title: "Components/ColorButton",
  component: ColorButton,
} as ComponentMeta<typeof ColorButton>;

const Template: ComponentStory<typeof ColorButton> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ColorButton {...args} />
);

export const Default = Template.bind({});

const defaultArgs: ColorButtonProps = {
  color: Color.ORANGE,
  selected: true,
  handleClick: (color: Color) => null,
};

Default.args = defaultArgs;

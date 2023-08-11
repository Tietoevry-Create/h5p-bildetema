import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Color } from "common/enums/Color";
import { ColorButton, ColorButtonProps } from "./ColorButton";

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
  handleClick: () => null,
};

Default.args = defaultArgs;

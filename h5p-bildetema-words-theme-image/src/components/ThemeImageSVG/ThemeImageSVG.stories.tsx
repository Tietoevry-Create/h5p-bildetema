import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ThemeImageSVG } from "./ThemeImageSVG";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";

export default {
  label: "Molecules/Topic grid",
  component: ThemeImageSVG,
} as ComponentMeta<typeof ThemeImageSVG>;

const Template: ComponentStory<typeof ThemeImageSVG> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageSVG {...args} />
);

export const SvgComponent = Template.bind({});
SvgComponent.args = {
  image: cat,
  overlays,
};

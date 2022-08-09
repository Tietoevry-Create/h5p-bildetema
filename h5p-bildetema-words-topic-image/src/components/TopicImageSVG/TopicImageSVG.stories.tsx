import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TopicImageSVG } from "./TopicImageSVG";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";

export default {
  label: "Molecules/Topic grid",
  component: TopicImageSVG,
} as ComponentMeta<typeof TopicImageSVG>;

const Template: ComponentStory<typeof TopicImageSVG> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicImageSVG {...args} />
);

export const SvgComponent = Template.bind({});
SvgComponent.args = {
  image: cat,
  overlays,
};

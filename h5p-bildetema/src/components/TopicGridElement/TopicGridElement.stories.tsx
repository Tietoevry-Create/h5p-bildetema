import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { TopicGridElement } from "./TopicGridElement";

export default {
  title: "Atoms/Grid Element",
  component: TopicGridElement,
} as ComponentMeta<typeof TopicGridElement>;

const Template: ComponentStory<typeof TopicGridElement> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicGridElement {...args} />
);

export const ThemesGridElement = Template.bind({});
ThemesGridElement.args = {
  index: 0,
  title: "test",
};

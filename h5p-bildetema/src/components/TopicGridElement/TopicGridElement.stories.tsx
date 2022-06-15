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
  image: {
    path: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  },
};

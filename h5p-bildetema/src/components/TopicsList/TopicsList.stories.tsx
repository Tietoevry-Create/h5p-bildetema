import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { TopicsList } from "./TopicsList";

export default {
  title: "Molecules/Topic List",
  component: TopicsList,
} as ComponentMeta<typeof TopicsList>;

const Template: ComponentStory<typeof TopicsList> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicsList {...args} />
);


export const ThemesTopicList = Template.bind({});
ThemesTopicList.args = {
};

import { Meta, StoryFn } from "@storybook/react";
import { TopicSizeButtons } from "./TopicSizeButtons";

export default {
  title: "Molecules/Topic Size Buttons",
  component: TopicSizeButtons,
} satisfies Meta<typeof TopicSizeButtons>;

const Template: StoryFn<typeof TopicSizeButtons> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicSizeButtons {...args} />
);

export const ThemesTopicList = Template.bind({});
ThemesTopicList.args = {};

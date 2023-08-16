import { Meta, StoryObj } from "@storybook/react";
import { TopicSizeButtons } from "./TopicSizeButtons";

export default {
  title: "Molecules/Topic Size Buttons",
  component: TopicSizeButtons,
} satisfies Meta<typeof TopicSizeButtons>;

type Story = StoryObj<typeof TopicSizeButtons>;

export const ThemesTopicList: Story = {
  args: {},
};

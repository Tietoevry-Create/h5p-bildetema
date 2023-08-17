import { Meta, StoryObj } from "@storybook/react";
import { PrintButton } from "./PrintButton";

export default {
  title: "Components/Print button",
  component: PrintButton,
} satisfies Meta<typeof PrintButton>;

type Story = StoryObj<typeof PrintButton>;

export const Default: Story = {
  args: {
    topicIds: {},
    showWrittenWords: true,
    isWordView: false,
    showTopicImageView: true,
    showArticles: true,
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { TopicImageWordList } from "./TopicImageWordList";

export default {
  title: "Molecules/Word list",
  component: TopicImageWordList,
} satisfies Meta<typeof TopicImageWordList>;

type Story = StoryObj<typeof TopicImageWordList>;

export const WordList: Story = {
  args: {
    showWrittenWords: true,
    words: [
      {
        id: "1",
        label: "Bildetema",
        images: [{ src: "" }],
        audioFiles: [],
      },
      {
        id: "2",
        label: "Temabilde",
        images: [{ src: "" }],
        audioFiles: [],
      },
    ],
  },
};

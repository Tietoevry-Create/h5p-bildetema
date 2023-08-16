import { Meta } from "@storybook/react";
import { TopicImageWordList } from "./TopicImageWordList";

export default {
  title: "Molecules/Word list",
  component: TopicImageWordList,
} satisfies Meta<typeof TopicImageWordList>;

export const WordList = {
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

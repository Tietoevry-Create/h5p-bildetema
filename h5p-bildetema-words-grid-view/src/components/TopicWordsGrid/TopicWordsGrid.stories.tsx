import { Meta, StoryObj } from "@storybook/react";
import { Word } from "common/types/types";
import { TopicWordsGrid } from "./TopicWordsGrid";

export default {
  title: "Molecules/Topic words grid",
  component: TopicWordsGrid,
} satisfies Meta<typeof TopicWordsGrid>;

type Story = StoryObj<typeof TopicWordsGrid>;

const cdnURL = "https://cdn-prodbildetema.azureedge.net";

const baseWord: Word = {
  id: "V0599",
  label: "Puslespill",
  images: [
    {
      src: `${cdnURL}/images/medium/V0575a.jpeg`,
    },
  ],
  audioFiles: [
    {
      url: "https://www.w3schools.com/TAGS/horse.ogg",
      mimeType: "audio/ogg" as "audio/mp3",
    },
  ],
};

export const ThemesGrid: Story = {
  args: {
    words: [
      { ...baseWord, id: "1", label: "test1", tema1: "test1" } as Word,
      { ...baseWord, id: "2", label: "test2", tema1: "test2" } as Word,
      { ...baseWord, id: "3", label: "test3", tema1: "test3" } as Word,
      { ...baseWord, id: "4", label: "test4", tema1: "test4" } as Word,
      { ...baseWord, id: "5", label: "test5", tema1: "test5" } as Word,
      { ...baseWord, id: "6", label: "test6", tema1: "test6" } as Word,
      { ...baseWord, id: "7", label: "test7", tema1: "test7" } as Word,
      { ...baseWord, id: "8", label: "test8", tema1: "test8" } as Word,
      { ...baseWord, id: "9", label: "test9", tema1: "test9" } as Word,
    ],
    showWrittenWords: true,
  },
};

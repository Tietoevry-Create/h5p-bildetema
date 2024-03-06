import { Meta, StoryObj } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { NewTranslation, NewWord } from "common/types/types";
import { TopicChooser } from "./TopicChooser";

export default {
  title: "Molecules/Topic chooser",
  component: TopicChooser,
} satisfies Meta<typeof TopicChooser>;

type Story = StoryObj<typeof TopicChooser>;

const getTopic = (id: string): NewWord => {
  const map = new Map<LanguageCode, NewTranslation>();

  map.set("nob", {
    labels: [{ label: "Topic 1" }],
    languageCode: "nob",
  });

  const w: NewWord = {
    id,
    images: [],
    translations: map,
    topicId: id,
  };
  return w;
};

const topics = ["T001", "T002", "T003", "T004"].map(id => getTopic(id));

export const ThemesGrid: Story = {
  args: {
    topics,
  },
};

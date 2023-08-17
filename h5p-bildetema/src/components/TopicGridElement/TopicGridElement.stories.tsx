import { Meta, StoryObj } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { TopicGridSizes, Word } from "common/types/types";
import { TopicGridElement } from "./TopicGridElement";

export default {
  title: "Atoms/Grid Element",
  component: TopicGridElement,
} satisfies Meta<typeof TopicGridElement>;

type Story = StoryObj<typeof TopicGridElement>;

export const Default: Story = {
  args: {
    topic: {
      id: "T001",
      label: "",
      subTopics: [],
      words: new Map<LanguageCode, Word[]>(),
      labelTranslations: new Map<LanguageCode, Word>(),
      onlyTopicImage: false,
      images: [
        {
          src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
        },
      ],
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
      },
    ],
    topicSize: TopicGridSizes.Big,
    title: "Dyr",
    languageCode: "nob",
  },
};

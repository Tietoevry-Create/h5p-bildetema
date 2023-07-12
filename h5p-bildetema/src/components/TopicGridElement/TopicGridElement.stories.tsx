import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { TopicGridSizes, Word } from "common/types/types";
import { TopicGridElement, TopicGridElementProps } from "./TopicGridElement";

const fallbackArgs: TopicGridElementProps = {
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
};

export default {
  title: "Atoms/Grid Element",
  component: TopicGridElement,
  args: fallbackArgs,
} as ComponentMeta<typeof TopicGridElement>;

const Template: ComponentStory<typeof TopicGridElement> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicGridElement {...args} />
);

export const Default = Template.bind({});

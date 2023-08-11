import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { Topic, Word } from "common/types/types";
import { TopicChooser } from "./TopicChooser";

export default {
  label: "Molecules/TopicChooser",
  component: TopicChooser,
} as ComponentMeta<typeof TopicChooser>;

const baseTopic: Topic = {
  id: "1",
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
};
const subTopics: Topic[] = [];
subTopics.push({ ...baseTopic, id: "1", label: "Subtopic 1.1" });

const Template: ComponentStory<typeof TopicChooser> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicChooser {...args} />
);

export const ThemesGrid = Template.bind({});
ThemesGrid.args = {
  items: [
    { ...baseTopic, label: "test1", tema1: "test1", subTopics } as Topic,
    { ...baseTopic, label: "test2", tema1: "test2" } as Topic,
    { ...baseTopic, label: "test3", tema1: "test3" } as Topic,
    { ...baseTopic, label: "test4", tema1: "test4" } as Topic,
    { ...baseTopic, label: "test5", tema1: "test5" } as Topic,
    { ...baseTopic, label: "test6", tema1: "test6" } as Topic,
    { ...baseTopic, label: "test7", tema1: "test7" } as Topic,
    { ...baseTopic, label: "test8", tema1: "test8" } as Topic,
    { ...baseTopic, label: "test9", tema1: "test9" } as Topic,
  ],
  topic: { ...baseTopic, label: "test1", tema1: "test1", subTopics } as Topic,
};

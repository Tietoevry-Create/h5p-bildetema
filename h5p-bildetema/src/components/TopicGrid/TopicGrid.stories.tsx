// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Topic, TopicGridSizes, Word } from "../../../../common/types/types";
import { TopicGrid, TopicGridProps } from "./TopicGrid";

export default {
  label: "Molecules/ToppicGrid",
  component: TopicGrid,
} as ComponentMeta<typeof TopicGrid>;

const baseTopic: Topic = {
  id: "1",
  label: "",
  subTopics: new Map<string, Topic>(),
  words: new Map<LanguageCode, Word[]>(),
  labelTranslations: new Map<LanguageCode, Word>(),
  images: [
    {
      src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    },
  ],
};

const Template: ComponentStory<typeof TopicGrid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicGrid {...args} />
);

const defaultArgs: TopicGridProps = {
  topicsSize: TopicGridSizes.Big,
  setIsWordView: () => null,
  showWrittenWords: false,
  currentLanguage: { label: "nob", code: "nob", rtl: false },
};
export const ThemesGrid = Template.bind({});
ThemesGrid.args = {
  ...defaultArgs,
  topics: [
    { ...baseTopic, id: "T001", label: "test1", tema1: "test2" } as Topic,
    { ...baseTopic, id: "T002", label: "test2", tema1: "test2" } as Topic,
    { ...baseTopic, id: "T003", label: "test3", tema1: "test3" } as Topic,
    { ...baseTopic, id: "T004", label: "test4", tema1: "test4" } as Topic,
    { ...baseTopic, id: "T005", label: "test5", tema1: "test5" } as Topic,
    { ...baseTopic, id: "T006", label: "test6", tema1: "test6" } as Topic,
    { ...baseTopic, id: "T007", label: "test7", tema1: "test7" } as Topic,
    { ...baseTopic, id: "T008", label: "test8", tema1: "test8" } as Topic,
  ],
  topicsSize: TopicGridSizes.Big,
};

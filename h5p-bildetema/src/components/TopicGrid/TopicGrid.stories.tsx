import { Meta, StoryFn } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { Topic, TopicGridSizes, Word } from "common/types/types";
import { TopicGrid, TopicGridProps } from "./TopicGrid";

export default {
  title: "Molecules/TopicGrid",
  component: TopicGrid,
} satisfies Meta<typeof TopicGrid>;

const baseTopic: Topic = {
  id: "1",
  label: "",
  subTopics: [],
  words: new Map<LanguageCode, Word[]>(),
  labelTranslations: new Map<LanguageCode, Word>(),
  images: [
    {
      src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    },
  ],
  onlyTopicImage: false,
};

const Template: StoryFn<typeof TopicGrid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicGrid {...args} />
);

const defaultArgs: TopicGridProps = {
  topicsSize: TopicGridSizes.Big,
  setIsWordView: () => null,
  toggleShowTopicImageView: () => null,
  showWrittenWords: false,
  currentLanguage: { label: "nob", code: "nob", rtl: false },
  showArticles: false,
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

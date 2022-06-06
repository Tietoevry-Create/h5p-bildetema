import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Word } from "../../../../common/types/types";
import { TopicWordsGrid } from "./TopicWordsGrid";

export default {
  label: "Molecules/ToppicWordsGrid",
  component: TopicWordsGrid,
} as ComponentMeta<typeof TopicWordsGrid>;

const baseWord: Word = {
  id: "1",
  label: "Elg",
  audio: undefined,
  images: [
    "https://images.unsplash.com/photo-1549471013-3364d7220b75?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750",
    "https://images.unsplash.com/photo-1602391950852-88bf9be72b24?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1654",
    "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070",
    "https://1.vgc.no/drpublish/images/article/2014/04/12/22889912/1/765x478/Elg___fremforer_Lars_Lillo_Stenbergs___Hjernen_er_alene.jpg",
  ],
};

const Template: ComponentStory<typeof TopicWordsGrid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicWordsGrid {...args} />
);

export const ThemesGrid = Template.bind({});
ThemesGrid.args = {
  items: [
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
};

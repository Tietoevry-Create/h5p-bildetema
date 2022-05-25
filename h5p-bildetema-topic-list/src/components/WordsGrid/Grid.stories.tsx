import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Word } from "../../../../common/types/types";
import { WordsGrid } from "./WordsGrid";

export default {
  title: "Molecules/WordsGrid",
  component: WordsGrid,
} as ComponentMeta<typeof WordsGrid>;

const Template: ComponentStory<typeof WordsGrid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <WordsGrid {...args} />
);

export const WordsGridStory = Template.bind({});
WordsGridStory.args = {
  items: [
    { title: "test1", tema1: "test1" } as Word,
    { title: "test2", tema1: "test2" } as Word,
    { title: "test3", tema1: "test3" } as Word,
    { title: "test4", tema1: "test4" } as Word,
    { title: "test5", tema1: "test5" } as Word,
    { title: "test6", tema1: "test6" } as Word,
    { title: "test7", tema1: "test7" } as Word,
    { title: "test8", tema1: "test8" } as Word,
    { title: "test9", tema1: "test9" } as Word,
  ],
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Topic } from "../../../../common/types/types";
import { TopicsGrid } from "./TopicsGrid";

export default {
  title: "Molecules/TopicsGrid",
  component: TopicsGrid,
} as ComponentMeta<typeof TopicsGrid>;

const Template: ComponentStory<typeof TopicsGrid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicsGrid {...args} />
);

export const TopicsGridStory = Template.bind({});
TopicsGridStory.args = {
  items: [
    { title: "test1", tema1: "test1" } as Topic,
    { title: "test2", tema1: "test2" } as Topic,
    { title: "test3", tema1: "test3" } as Topic,
    { title: "test4", tema1: "test4" } as Topic,
    { title: "test5", tema1: "test5" } as Topic,
    { title: "test6", tema1: "test6" } as Topic,
    { title: "test7", tema1: "test7" } as Topic,
    { title: "test8", tema1: "test8" } as Topic,
    { title: "test9", tema1: "test9" } as Topic,
  ],
};

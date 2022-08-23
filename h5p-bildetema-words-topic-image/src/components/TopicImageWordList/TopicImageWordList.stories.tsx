// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { TopicImageWordList } from "./TopicImageWordList";

export default {
  label: "Molecules/Word list",
  component: TopicImageWordList,
} as ComponentMeta<typeof TopicImageWordList>;

const Template: ComponentStory<typeof TopicImageWordList> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicImageWordList {...args} />
);

export const WordList = Template.bind({});
WordList.args = {
  words: [
    {
      id: "1",
      label: "Bildetema",
      images: [{ src: "" }],
      audioFiles: [],
    },
    {
      id: "2",
      label: "Temabilde",
      images: [{ src: "" }],
      audioFiles: [],
    },
  ],
};

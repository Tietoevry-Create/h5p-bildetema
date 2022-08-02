import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ThemeImageWordList } from "./ThemeImageWordList";

export default {
  label: "Molecules/Word list",
  component: ThemeImageWordList,
} as ComponentMeta<typeof ThemeImageWordList>;

const Template: ComponentStory<typeof ThemeImageWordList> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageWordList {...args} />
);

export const WordList = Template.bind({});
WordList.args = {
  words: [
    {
      id: "1",
      label: "Bildetema",
      images: [{ src: "" }],
      audio: "",
    },
    {
      id: "2",
      label: "Temabilde",
      images: [{ src: "" }],
      audio: "",
    },
  ],
};

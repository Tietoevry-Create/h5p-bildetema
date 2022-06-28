import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { WordAudio } from "./WordAudio";
import { Word as WordType } from "../../../../common/types/types";

export default {
  title: "Atoms/WordAudio",
  component: WordAudio,
} as ComponentMeta<typeof WordAudio>;

const Template: ComponentStory<typeof WordAudio> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <WordAudio {...args} />
);

export const Default = Template.bind({});
Default.args = {
  word: {
    id: "V0889",
    label: "Elg",
    images: [
      {
        src: "https://images.unsplash.com/photo-1549471013-3364d7220b75?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750",
      },
    ],
    audio: "https://www.w3schools.com/TAGS/horse.ogg",
  },
};

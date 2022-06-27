import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Word } from "./Word";

export default {
  title: "Atoms/Word",
  component: Word,
} as ComponentMeta<typeof Word>;

const Template: ComponentStory<typeof Word> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Word {...args} />
);

export const Default = Template.bind({});
Default.args = {
  word: {
    id: "V0600",
    label: "Brettspill",
    images: [
      {
        src: "https://prodbildetemabackend.blob.core.windows.net/images/medium/V0575a.jpeg",
      },
    ],
    audio: "https://www.w3schools.com/TAGS/horse.ogg",
  },
  textVisible: true,
};

export const MultipleImages = Template.bind({});
MultipleImages.args = {
  word: {
    id: "V0599",
    label: "Puslespill",
    images: [
      {
        src: "https://prodbildetemabackend.blob.core.windows.net/images/medium/V0575a.jpeg",
      },
      {
        src: "https://prodbildetemabackend.blob.core.windows.net/images/medium/V0575b.jpeg",
      },
    ],
    audio: "https://www.w3schools.com/TAGS/horse.ogg",
  },
  textVisible: true,
};

export const NoImages = Template.bind({});
NoImages.args = {
  word: {
    id: "V0889",
    label: "Elg",
    images: [],
    audio: undefined,
  },
  textVisible: true,
};

export const HiddenText = Template.bind({});
HiddenText.args = {
  word: {
    id: "V0889",
    label: "Elg",
    images: [
      {
        src: "https://prodbildetemabackend.blob.core.windows.net/images/medium/V0575a.jpeg",
      },
    ],
    audio: undefined,
  },
  textVisible: false,
};

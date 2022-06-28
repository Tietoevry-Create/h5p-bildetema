// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import {
  ThemeImageWordList,
  ThemeImageWordListProps,
} from "./ThemeImageWordList";

export default {
  label: "Molecules/ToppicGrid",
  component: ThemeImageWordList,
} as ComponentMeta<typeof ThemeImageWordList>;

const Template: ComponentStory<typeof ThemeImageWordList> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageWordList {...args} />
);

export const ImageContainer = Template.bind({});
ImageContainer.args = {
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

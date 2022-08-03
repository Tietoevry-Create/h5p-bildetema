import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ThemeImageContainer } from "./ThemeImageContainer";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";

export default {
  label: "Molecules/Image container",
  component: ThemeImageContainer,
} as ComponentMeta<typeof ThemeImageContainer>;

const Template: ComponentStory<typeof ThemeImageContainer> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageContainer {...args} />
);

export const ImageContainer = Template.bind({});
ImageContainer.args = {
  topic: {
    id: "1",
    label: "Bildetema",
    images: [{ src: "" }],
    labelTranslations: new Map(),
    subTopics: new Map(),
    words: new Map(),
  },
  aspectRatio: 1,
  themeImage: cat,
  themeOverlays: overlays,
  themeImageType: "vectorImageWithHotspots",
  words: [
    {
      id: overlays[0].wordId,
      label: "Øre",
      images: [{ src: "" }],
      audio: "",
    },
    {
      id: overlays[1].wordId,
      label: "Pote",
      images: [{ src: "" }],
      audio: "",
    },
  ],
};

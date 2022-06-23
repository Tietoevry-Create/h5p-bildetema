// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ThemeImageContainer } from "./ThemeImageContainer";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";

export default {
  label: "Molecules/ToppicGrid",
  component: ThemeImageContainer,
} as ComponentMeta<typeof ThemeImageContainer>;

const Template: ComponentStory<typeof ThemeImageContainer> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageContainer {...args} />
);

export const ImageContainer = Template.bind({});
ImageContainer.args = {
  theme: {
    id: "1",
    label: "Bildetema",
    images: [""],
    audio: "",
  },
  themeImage: cat,
  themeOverlays: overlays,
  themeImageType: "vectorImageWithHotspots",
  words: [
    {
      id: overlays[0].wordId,
      label: "Øre",
      images: [""],
      audio: "",
    },
    {
      id: overlays[1].wordId,
      label: "Pote",
      images: [""],
      audio: "",
    },
  ],
};

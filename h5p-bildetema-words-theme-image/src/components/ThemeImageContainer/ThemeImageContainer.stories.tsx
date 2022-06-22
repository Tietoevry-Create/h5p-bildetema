// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ThemeImageContainer } from "./ThemeImageContainer";

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
  themeImageType: "vectorImageWithHotspots",
  words: [
    {
      id: "1",
      label: "Bildetema",
      images: [""],
      audio: "",
    },
    {
      id: "2",
      label: "Temabilde",
      images: [""],
      audio: "",
    },
  ],
};

/* eslint-disable import/no-extraneous-dependencies */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ThemeImageSVG } from "./ThemeImageSVG";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";

export default {
  label: "Molecules/ToppicGrid",
  component: ThemeImageSVG,
} as ComponentMeta<typeof ThemeImageSVG>;

const Template: ComponentStory<typeof ThemeImageSVG> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageSVG {...args} />
);

export const SvgComponent = Template.bind({});
SvgComponent.args = {
  words: [
    {
      id: "1",
      label: "Øre",
      images: [{ src: "" }],
      audio: "",
    },
    {
      id: "2",
      label: "Pote",
      images: [{ src: "" }],
      audio: "",
    },
  ],
  image: cat,
  overlays,
};

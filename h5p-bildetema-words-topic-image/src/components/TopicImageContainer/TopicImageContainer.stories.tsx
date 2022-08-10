import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { TopicImageContainer } from "./TopicImageContainer";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";

export default {
  label: "Molecules/Image container",
  component: TopicImageContainer,
} as ComponentMeta<typeof TopicImageContainer>;

const Template: ComponentStory<typeof TopicImageContainer> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicImageContainer {...args} />
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
  topicImage: cat,
  topicOverlays: overlays,
  topicImageType: "vectorImageWithHotspots",
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
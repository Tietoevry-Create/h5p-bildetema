import { Meta, StoryFn } from "@storybook/react";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";
import { TopicImageContainer } from "./TopicImageContainer";

export default {
  title: "Molecules/Image container",
  component: TopicImageContainer,
} satisfies Meta<typeof TopicImageContainer>;

const Template: StoryFn<typeof TopicImageContainer> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicImageContainer {...args} />
);

export const ImageContainer = Template.bind({});
ImageContainer.args = {
  aspectRatio: 1,
  showWrittenWords: true,
  topicImage: cat,
  topicOverlays: overlays,
  topicImageType: "vectorImageWithHotspots",
  words: [
    {
      id: overlays[0].wordId,
      label: "Øre",
      images: [{ src: "" }],
      audioFiles: [],
    },
    {
      id: overlays[1].wordId,
      label: "Pote",
      images: [{ src: "" }],
      audioFiles: [],
    },
  ],
};

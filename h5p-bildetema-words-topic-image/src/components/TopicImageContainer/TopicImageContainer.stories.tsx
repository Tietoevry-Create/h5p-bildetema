import { Meta } from "@storybook/react";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";
import { TopicImageContainer } from "./TopicImageContainer";

export default {
  title: "Molecules/Image container",
  component: TopicImageContainer,
} satisfies Meta<typeof TopicImageContainer>;

export const ImageContainer = {
  args: {
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
  },
};

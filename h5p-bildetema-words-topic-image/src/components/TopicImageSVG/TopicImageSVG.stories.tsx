import { Meta } from "@storybook/react";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";
import { TopicImageSVG } from "./TopicImageSVG";

export default {
  title: "Molecules/Topic grid",
  component: TopicImageSVG,
} satisfies Meta<typeof TopicImageSVG>;

export const SvgComponent = {
  args: {
    aspectRatio: 1,
    image: cat,
    overlays,
    topicImageType: "vectorImageWithHotspots",
  },
};

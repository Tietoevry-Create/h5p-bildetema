import { Meta, StoryObj } from "@storybook/react";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";
import { TopicImageSVG } from "./TopicImageSVG";

export default {
  title: "Molecules/Topic grid",
  component: TopicImageSVG,
} satisfies Meta<typeof TopicImageSVG>;

type Story = StoryObj<typeof TopicImageSVG>;

export const SvgComponent: Story = {
  args: {
    aspectRatio: 1,
    image: cat,
    overlays,
    topicImageType: "vectorImageWithHotspots",
  },
};

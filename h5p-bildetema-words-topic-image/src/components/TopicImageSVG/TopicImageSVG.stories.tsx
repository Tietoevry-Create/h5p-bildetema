import { Meta, StoryFn } from "@storybook/react";
import { cat, overlays } from "../../../.storybook/assets/cat.svg";
import { TopicImageSVG } from "./TopicImageSVG";

export default {
  title: "Molecules/Topic grid",
  component: TopicImageSVG,
} satisfies Meta<typeof TopicImageSVG>;

const Template: StoryFn<typeof TopicImageSVG> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicImageSVG {...args} />
);

export const SvgComponent = Template.bind({});
SvgComponent.args = {
  aspectRatio: 1,
  image: cat,
  overlays,
  topicImageType: "vectorImageWithHotspots",
};

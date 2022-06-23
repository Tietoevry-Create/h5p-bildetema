import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Image } from "./Image";

export default {
  title: "Atoms/Image",
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Image {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: "https://prodbildetemabackend.blob.core.windows.net/images/large/V1037a.jpeg",
  srcSet:
    "https://prodbildetemabackend.blob.core.windows.net/images/small/V1037a.jpeg 200, https://prodbildetemabackend.blob.core.windows.net/images/medium/V1037a.jpeg 350,https://prodbildetemabackend.blob.core.windows.net/images/large/V1037a.jpeg 100, https://prodbildetemabackend.blob.core.windows.net/images/xlarge/V1037a.jpeg 600",
  width: "250",
  height: "250",
};

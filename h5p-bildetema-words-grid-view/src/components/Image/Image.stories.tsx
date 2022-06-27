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
  srcSets: [
    {
      src: "https://prodbildetemabackend.blob.core.windows.net/images/small/V1037a.jpeg",
      width: 200,
    },
    {
      src: "https://prodbildetemabackend.blob.core.windows.net/images/medium/V1037a.jpeg",
      width: 350,
    },
    {
      src: "https://prodbildetemabackend.blob.core.windows.net/images/large/V1037a.jpeg",
      width: 600,
    },
    {
      src: "https://prodbildetemabackend.blob.core.windows.net/images/xlarge/V1037a.jpeg",
      width: 1000,
    },
  ],
  width: "250",
  height: "250",
};

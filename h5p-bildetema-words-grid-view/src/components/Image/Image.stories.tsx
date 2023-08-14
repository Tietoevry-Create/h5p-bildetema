import { Meta, StoryFn } from "@storybook/react";
import { Image } from "./Image";

export default {
  title: "Atoms/Image",
  component: Image,
} satisfies Meta<typeof Image>;

const cdnURL = "https://cdn-prodbildetema.azureedge.net";

const Template: StoryFn<typeof Image> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Image {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: `${cdnURL}/images/large/V1037a.jpeg`,
  srcSets: [
    {
      src: `${cdnURL}/images/small/V1037a.jpeg`,
      width: 200,
    },
    {
      src: `${cdnURL}/images/medium/V1037a.jpeg`,
      width: 350,
    },
    {
      src: `${cdnURL}/images/large/V1037a.jpeg`,
      width: 600,
    },
    {
      src: `${cdnURL}/images/xlarge/V1037a.jpeg`,
      width: 1000,
    },
  ],
  width: "250",
  height: "250",
};

import { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

export default {
  title: "Atoms/Image",
  component: Image,
} satisfies Meta<typeof Image>;

type Story = StoryObj<typeof Image>;

const cdnURL = "https://cdn-prodbildetema.azureedge.net";

export const Default: Story = {
  args: {
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
  },
};

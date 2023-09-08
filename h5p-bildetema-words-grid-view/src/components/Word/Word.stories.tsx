import { Meta, StoryObj } from "@storybook/react";
import { Word } from "./Word";

export default {
  title: "Atoms/Word",
  component: Word,
} satisfies Meta<typeof Word>;

type Story = StoryObj<typeof Word>;

const cdnURL = "https://cdn-prodbildetema.azureedge.net";

export const Default: Story = {
  args: {
    word: {
      id: "V0600",
      labels: [{ label: "Brettspill" }],
      images: [
        {
          src: `${cdnURL}/images/medium/V0575a.jpeg`,
        },
      ],
      audioFiles: [
        {
          url: "https://www.w3schools.com/TAGS/horse.ogg",
          mimeType: "audio/ogg" as "audio/mp3",
        },
      ],
    },
    textVisible: true,
  },
};

export const MultipleImages: Story = {
  args: {
    word: {
      id: "V0599",
      labels: [{ label: "Puslespill" }],
      images: [
        {
          src: `${cdnURL}/images/medium/V0575a.jpeg`,
        },
        {
          src: `${cdnURL}/images/medium/V0575b.jpeg`,
        },
      ],
      audioFiles: [
        {
          url: "https://www.w3schools.com/TAGS/horse.ogg",
          mimeType: "audio/ogg" as "audio/mp3",
        },
      ],
    },
    textVisible: true,
  },
};

export const NoImages: Story = {
  args: {
    word: {
      id: "V0889",
      labels: [{ label: "Elg" }],
      images: [],
      audioFiles: [],
    },
    textVisible: true,
  },
};

export const HiddenText: Story = {
  args: {
    word: {
      id: "V0889",
      labels: [{ label: "Elg" }],
      images: [
        {
          src: `${cdnURL}/images/medium/V0575a.jpeg`,
        },
      ],
      audioFiles: [],
    },
    textVisible: false,
  },
};

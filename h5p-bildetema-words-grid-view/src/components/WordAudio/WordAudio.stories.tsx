import { Meta, StoryObj } from "@storybook/react";
import { WordAudio } from "./WordAudio";

export default {
  title: "Atoms/Word audio",
  component: WordAudio,
} satisfies Meta<typeof WordAudio>;

type Story = StoryObj<typeof WordAudio>;

export const Default: Story = {
  args: {
    textVisible: true,
    word: {
      id: "V0889",
      label: "Elg",
      images: [
        {
          src: "https://images.unsplash.com/photo-1549471013-3364d7220b75?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750",
        },
      ],
      audioFiles: [
        {
          url: "https://www.w3schools.com/TAGS/horse.ogg",
          mimeType: "audio/ogg" as "audio/mp3",
        },
      ],
    },
  },
};

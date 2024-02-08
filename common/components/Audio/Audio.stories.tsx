import { Meta, StoryObj } from "@storybook/react";
import { Audio } from "./Audio";

export default {
  title: "Atoms/Word audio",
  component: Audio,
} satisfies Meta<typeof Audio>;

type Story = StoryObj<typeof Audio>;

export const Default: Story = {
  args: {
    label: "Elg",
    audioFiles: [
      {
        url: "https://www.w3schools.com/TAGS/horse.ogg",
        mimeType: "audio/ogg" as "audio/mp3",
      },
    ],
    lang: "nob",
    stopAudioLabel: "Stop audio",
    playAudioLabel: "Play audio",
  },
};

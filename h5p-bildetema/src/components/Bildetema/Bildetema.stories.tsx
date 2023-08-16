import { Meta, StoryObj } from "@storybook/react";
import { Bildetema } from "./Bildetema";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
} satisfies Meta<typeof Bildetema>;

type Story = StoryObj<typeof Bildetema>;

export const Default: Story = {
  args: {
    defaultLanguages: ["nob"],
    isLoadingData: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoadingData: true,
  },
};

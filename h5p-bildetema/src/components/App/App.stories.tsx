import { Meta, StoryObj } from "@storybook/react";
import { App } from "./App";

export default {
  title: "App",
  component: App,
} satisfies Meta<typeof App>;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  args: {
    defaultLanguages: ["nob"],
    backendUrl:
      "https://cdn-dev-bildetema.azureedge.net/data/dataTest.json.tar.gz",
  },
};

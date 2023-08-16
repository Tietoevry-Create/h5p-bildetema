import { Meta } from "@storybook/react";
import { Bildetema } from "./Bildetema";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
} satisfies Meta<typeof Bildetema>;

export const Default = {
  args: {
    defaultLanguages: ["nob"],
    isLoadingData: false,
  },
};

export const Loading = {
  args: {
    ...Default.args,
    isLoadingData: true,
  },
};

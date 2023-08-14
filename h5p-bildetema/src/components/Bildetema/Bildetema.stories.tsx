import { Meta, StoryFn } from "@storybook/react";
import { Bildetema } from "./Bildetema";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
} satisfies Meta<typeof Bildetema>;

const Template: StoryFn<typeof Bildetema> = (args) => (
  <Bildetema {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultLanguages: ["nob"],
  isLoadingData: false,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoadingData: true,
};

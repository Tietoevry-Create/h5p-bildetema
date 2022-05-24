import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import App from "./App";

export default {
  title: "App",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <App {...args} />
);

export const Default = Template.bind({});
Default.args = {
  adjective: "funny",
};

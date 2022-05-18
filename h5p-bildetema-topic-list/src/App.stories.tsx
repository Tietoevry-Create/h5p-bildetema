import React from "react";
import { ComponentMeta } from "@storybook/react";
import App, { AppProps } from "./App";

export default {
  title: "App/App",
  component: App,
} as ComponentMeta<typeof App>;

export const Default = (args: AppProps) => <App {...args} />;

Default.args = {
  adjective: "test",
};

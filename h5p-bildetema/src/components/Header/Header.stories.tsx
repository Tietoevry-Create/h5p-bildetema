import React from "react";
import { ComponentMeta } from "@storybook/react";
import Header from "./Header";

export default {
  title: "Header/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const Default = () => <Header  />;
// export const Default = (args: AppProps) => <App {...args} />;

Default.args = {
  adjective: "test",
};

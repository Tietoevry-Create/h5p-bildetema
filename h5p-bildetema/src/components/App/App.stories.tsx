import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { App } from "./App";

export default {
  title: "App",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => (
  <App defaultLanguages={["nob"]} />
);

export const Default = Template.bind({});

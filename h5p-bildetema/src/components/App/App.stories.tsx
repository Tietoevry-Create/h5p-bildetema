// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { App } from "./App";

export default {
  title: "App",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => (
  <App
    defaultLanguages={["nob"]}
    backendUrl="https://cdn-devbildetema.azureedge.net/data/database.json"
  />
);

export const Default = Template.bind({});

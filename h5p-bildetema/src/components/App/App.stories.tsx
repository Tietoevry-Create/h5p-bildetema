import { Meta, StoryFn } from "@storybook/react";
import { App } from "./App";

export default {
  title: "App",
  component: App,
} satisfies Meta<typeof App>;

const Template: StoryFn<typeof App> = () => (
  <App
    defaultLanguages={["nob"]}
    backendUrl="https://cdn-prodbildetema.azureedge.net/data/database.json"
  />
);

export const Default = Template.bind({});

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { App } from "./App";

export default {
  title: "App",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => (
  <App
    defaultLanguages={["nob"]}
    backendUrl="https://cdn-prodbildetema.azureedge.net/data/database.json"
  />
);

export const Default = Template.bind({});

import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import App from "./App";

export default {
  title: "Pages/App",
  component: App,
  //   args: {
  //     semantics,
  //     parent,

  //     setValue: (newParams: Params) =>
  //       console.info("Params updated", { params: newParams }),
  //     initialParams: params,
  //   },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <App {...args} />
);

export const BildetemaTopicList = Template.bind({});
BildetemaTopicList.args = {};

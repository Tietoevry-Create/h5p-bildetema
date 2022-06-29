import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Svg } from "./Svg";

export default {
  title: "Components/Svg",
  component: Svg,
} as ComponentMeta<typeof Svg>;

const Template: ComponentStory<typeof Svg> = args => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Svg/>
  // <Svg {...args}/>
);

export const Default = Template.bind({});
Default.args = {
  Svg: {
    path: "https://Svgs.unsplash.com/photo-1617051571090-85766fa13621?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    width: 800
  }
};

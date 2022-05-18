import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import GridElement from "./GridElement";

export default {
  title: "Atoms/Grid Element",
  component: GridElement,
} as ComponentMeta<typeof GridElement>;

const Template: ComponentStory<typeof GridElement> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridElement {...args} />
);

export const ThemesGridElement = Template.bind({});
ThemesGridElement.args = {
  index: 0,
  title: "test",
};

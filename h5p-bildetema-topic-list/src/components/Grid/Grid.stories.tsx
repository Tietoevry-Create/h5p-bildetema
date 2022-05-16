import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DUMMY_ITEMS } from "../App/App";
import Grid from "./Grid";

export default {
  title: "Molecules/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Grid {...args} />
);

export const ThemesGrid = Template.bind({});
ThemesGrid.args = {
  items: DUMMY_ITEMS,
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
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
  items: [
    { title: "looooooooooooooooooooooong item" },
    { title: "item 2" },
    { title: "item 3" },
    { title: "item 4" },
  ],
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Word } from "../../../../types";
import GridElementView from "./GridElementView";

export default {
  title: "Atoms/Grid Element",
  component: GridElementView,
} as ComponentMeta<typeof GridElementView>;

const Template: ComponentStory<typeof GridElementView> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridElementView {...args} />
);

export const ThemesGridElementView = Template.bind({});
ThemesGridElementView.args = {
  items: [
    {
      translations: new Map([["no", "Test"]]),
      bildeA: "https://unsplash.com/photos/kmihWgpbDEg/download?w=640",
    } as Word,
  ],
};

/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Svg } from "./Svg";

export default {
  title: "Components/Svg",
  component: Svg,
} as ComponentMeta<typeof Svg>;

const Template: ComponentStory<typeof Svg> = args => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Svg {...args} />
);

export const Default = Template.bind({});
Default.args = {
  hotspots: [
    {
      isDrawingThisPolygon: false,
      word: {
        id: "1",
        label: "hello",
        images: [],
        audioFiles: [],
      },
      points: [
        { x: 10, y: 10, index: 0 },
        { x: 20, y: 20, index: 1 },
        { x: 10, y: 20, index: 2 },
      ],
      rotation: 0,
    },
  ],
  handlePointClick: () => {},
};

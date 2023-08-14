/* eslint-disable @typescript-eslint/no-empty-function */

import { Meta, StoryFn } from "@storybook/react";
import { Color } from "common/enums/Color";
import { Svg } from "./Svg";

export default {
  title: "Components/Svg",
  component: Svg,
} satisfies Meta<typeof Svg>;

const Template: StoryFn<typeof Svg> = args => (
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
      ellipseRadius: 0,
      color: Color.ORANGE,
    },
  ],
  handlePointClick: () => {},
};

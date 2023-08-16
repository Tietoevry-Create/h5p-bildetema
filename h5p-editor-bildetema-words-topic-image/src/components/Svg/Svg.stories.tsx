/* eslint-disable @typescript-eslint/no-empty-function */

import { Meta, StoryObj } from "@storybook/react";
import { Color } from "common/enums/Color";
import { Svg } from "./Svg";

export default {
  title: "Components/Svg",
  component: Svg,
} satisfies Meta<typeof Svg>;

type Story = StoryObj<typeof Svg>;

export const Default: Story = {
  args: {
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
  },
};

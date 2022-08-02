/* eslint-disable @typescript-eslint/no-empty-function */
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
      drawing: false,
      word: {
        id: "1",
        label: "hello",
        images: [],
        audio: undefined,
      },
      points: [
        { x: 10, y: 10 },
        { x: 20, y: 20 },
        { x: 10, y: 20 },
      ],
      wordId: "1",
    },
  ],
  handleCircleClick: () => {},
};

/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid, GridProps } from "./Grid";

export default {
  title: "Organisms/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const defaultArgs: GridProps = {
  items: [],
  gridDimensions: {numberOfColumns: 10, numberOfRows: 10},
};

export const WithItems: ComponentStory<typeof Grid> = () => {
  const args: GridProps = {
    ...defaultArgs,
    items: [
      {
        id: "1",
        label: "Sheep in the distance",
        description: "",
        width: 1,
        height: 1,
        xPosition: 3,
        yPosition: 5,
      },
      {
        id: "2",
        
        label: "Sheep close up",
        description: "Sheep looking right at you.",
        width: 2,
        height: 1,
        xPosition: 5,
        yPosition: 3,
        
      },
    ],
  };
  return (<div style={{height: "600px", width: "600px"}}><Grid {...args} /></div>) ;
};

export const WithoutItems: ComponentStory<typeof Grid> = () => {
  const args: GridProps = { ...defaultArgs };
  return <Grid {...args} />;
};

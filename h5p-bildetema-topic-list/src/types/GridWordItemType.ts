import type { CommonItemType } from "./CommonItemType";

export type GridWordItemType = CommonItemType & {
  /** The x position as a percentage of the container's width */
  xPosition: number;

  /** The y position as a percentage of the container's height */
  yPosition: number;

  /** The width as a number of columns the item spans */
  width: number;

  /** The height as number of rows the item spans */
  height: number;
};

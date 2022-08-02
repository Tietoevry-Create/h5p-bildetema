import { Point } from "./Point";

export type ThemeImageHotspot = {
  id: string;
  points: Array<Point>;
  wordId: `V${string}`;
};

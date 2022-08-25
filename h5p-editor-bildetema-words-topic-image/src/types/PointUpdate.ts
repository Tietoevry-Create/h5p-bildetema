import { Point } from "./Point";

export type PointUpdate = {
  from: Point & { index: number };
  to: Point;
};

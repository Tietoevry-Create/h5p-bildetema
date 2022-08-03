import { Point } from "../../types/Point";

export const findDistance = (a: Point, b: Point): number => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

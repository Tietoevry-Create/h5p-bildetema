import { Point } from "../../types/Point";

export const pointsToDAttribute = (
  connectLastPointToStart: boolean,
  points: Array<Point>,
): string => {
  const d =
    points
      ?.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
      .join(" ") ?? "";

  return connectLastPointToStart ? `${d} Z` : d;
};

export const calculatePoint = (
  { x, y }: Point,
  { width, height, x: offsetX, y: offsetY }: DOMRect,
  aspectRatio: number,
): Point => ({
  x: ((x - offsetX) / width) * 100,
  y: (((y - offsetY) / height) * 100) / aspectRatio,
});

export const getDelta = (pointA: Point, pointB: Point): Point => ({
  x: pointA.x - pointB.x,
  y: pointA.y - pointB.y,
});

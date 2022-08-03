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

import { describe, expect, it } from "vitest";
import { Point } from "../../types/Point";
import { findDistance } from "./figure.utils";

describe(findDistance.name, () => {
  it("should find the distance between two points", () => {
    const pointA: Point = { x: 0, y: 0 };
    const pointB: Point = { x: 3, y: 4 };

    const expected = 5;
    const actual = findDistance(pointA, pointB);

    expect(actual).toBe(expected);
  });

  it("should always return the distance as a positive number", () => {
    const pointA: Point = { x: 3, y: 4 };
    const pointB: Point = { x: 0, y: 0 };

    const expected = 5;
    const actual = findDistance(pointA, pointB);

    expect(actual).toBe(expected);
  });
});

import { describe, expect, it } from "vitest";
import { Point } from "../../../../common/types/Point";
import { renderFigure } from "./figure.utils";

describe(renderFigure.name, () => {
  it("should create an SVG circle if two points are provided", () => {
    const pointA: Point = { x: 0, y: 0 };
    const pointB: Point = { x: 1, y: 1 };

    const actual = renderFigure([pointA, pointB]);

    expect(actual.startsWith("<circle")).toBeTruthy();
  });

  it("should create an SVG polygon if more than two points are provided", () => {
    const pointA: Point = { x: 0, y: 0 };
    const pointB: Point = { x: 1, y: 1 };
    const pointC: Point = { x: 2, y: 2 };

    const actual = renderFigure([pointA, pointB, pointC]);

    expect(actual.startsWith("<polygon")).toBeTruthy();
  });

  it("should return an empty string if less than two points are provided", () => {
    const pointA: Point = { x: 0, y: 0 };

    const actual1 = renderFigure([pointA]);
    const actual2 = renderFigure([]);

    expect(actual1).toBe("");
    expect(actual2).toBe("");
  });
});

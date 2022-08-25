import { describe, expect, it } from "vitest";
import { Word } from "../../../../common/types/types";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import {
  activateDrawingHotspot,
  finishDrawingHotspot,
  removePoint,
  resetPointsOfActiveHotspot,
} from "./hotspot.utils";

describe(finishDrawingHotspot.name, () => {
  const word = { id: "", images: [], label: "" };

  it("should finish drawing the active hotspot", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
    };

    const actual = finishDrawingHotspot(hotspot);

    expect(actual).toEqual(expected);
  });

  it("should reset the hotspot's points if there is only one point", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [{ x: 0, y: 0 }],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
    };

    const actual = finishDrawingHotspot(hotspot);

    expect(actual).toEqual(expected);
  });

  it("should not reset the hotspot's points if there are more than one", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      word,
    };

    const actual = finishDrawingHotspot(hotspot);

    expect(actual).toEqual(expected);
  });
});

describe(resetPointsOfActiveHotspot.name, () => {
  const word = { id: "", images: [], label: "" };

  it("should reset the active hotspot's points", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: true,
      points: [],
      word,
    };

    const actual = resetPointsOfActiveHotspot(hotspot);

    expect(actual).toEqual(expected);
  });

  it("should not reset an inactive hotspot's points", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: false,
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      word,
    };

    const actual = resetPointsOfActiveHotspot(hotspot);

    expect(actual).toEqual(expected);
  });
});

describe(removePoint.name, () => {
  it("should remove the given point from a list of points", () => {
    const point: Point = { x: 1, y: 2 };
    const points: Array<Point> = [
      { x: 1, y: 2 },
      { x: 10, y: 20 },
    ];

    const expected = [{ x: 10, y: 20 }];
    const actual = removePoint(point, points);

    expect(actual).toEqual(expected);
  });
});

describe(activateDrawingHotspot.name, () => {
  it("should activate the hotspot if it has the same word id as the given word id", () => {
    const word: Word = { id: "A001", images: [], label: "Word" };
    const hotspot: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: true,
      points: [],
      word,
    };

    const actual = activateDrawingHotspot(hotspot, word.id);

    expect(actual).toEqual(expected);
  });

  it("should deactivate the hotspot if it does not have the same word id as the given word id", () => {
    const word: Word = { id: "A001", images: [], label: "Word" };
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [],
      word,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
    };

    const actual = activateDrawingHotspot(hotspot, "B002");

    expect(actual).toEqual(expected);
  });
});

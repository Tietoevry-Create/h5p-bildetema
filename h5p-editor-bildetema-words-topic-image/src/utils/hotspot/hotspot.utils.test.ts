// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "vitest";
import { Color } from "../../../../common/enums/Color";
import { Word } from "../../../../common/types/types";
import { Hotspot } from "../../types/Hotspot";
import { PointWithIndex } from "../../types/PointWithIndex";
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
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const actual = finishDrawingHotspot(hotspot);

    expect(actual).toEqual(expected);
  });

  it("should reset the hotspot's points if there is only one point", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [{ x: 0, y: 0, index: 0 }],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const actual = finishDrawingHotspot(hotspot);

    expect(actual).toEqual(expected);
  });

  it("should not reset the hotspot's points if there are more than one", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: true,
      points: [
        { x: 0, y: 0, index: 0 },
        { x: 1, y: 1, index: 1 },
      ],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [
        { x: 0, y: 0, index: 0 },
        { x: 1, y: 1, index: 1 },
      ],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
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
        { x: 0, y: 0, index: 0 },
        { x: 1, y: 1, index: 1 },
      ],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: true,
      points: [],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const actual = resetPointsOfActiveHotspot(hotspot);

    expect(actual).toEqual(expected);
  });

  it("should not reset an inactive hotspot's points", () => {
    const hotspot: Hotspot = {
      isDrawingThisPolygon: false,
      points: [
        { x: 0, y: 0, index: 0 },
        { x: 1, y: 1, index: 1 },
      ],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [
        { x: 0, y: 0, index: 0 },
        { x: 1, y: 1, index: 1 },
      ],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const actual = resetPointsOfActiveHotspot(hotspot);

    expect(actual).toEqual(expected);
  });
});

describe(removePoint.name, () => {
  it("should remove the given point from a list of points", () => {
    const removedPoint: PointWithIndex = { x: 0, y: 0, index: 0 };
    const points: Array<PointWithIndex> = [
      { x: 0, y: 0, index: 0 },
      { x: 1, y: 1, index: 1 },
    ];

    const expected: Array<PointWithIndex> = [{ x: 1, y: 1, index: 1 }];
    const actual = removePoint(removedPoint, points);

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
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: true,
      points: [],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
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
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const expected: Hotspot = {
      isDrawingThisPolygon: false,
      points: [],
      word,
      rotation: 0,
      ellipseRadius: 0,
      color: Color.ORANGE,
    };

    const actual = activateDrawingHotspot(hotspot, "B002");

    expect(actual).toEqual(expected);
  });
});

import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";

export const resetPoints = (hotspot: Hotspot): Hotspot => {
  return {
    ...hotspot,
    points: [],
  };
};

export const resetPointsOfActiveHotspot = (hotspot: Hotspot): Hotspot => {
  if (!hotspot.isDrawingThisPolygon) {
    return hotspot;
  }

  return resetPoints(hotspot);
};

export const finishDrawingHotspot = (hotspot: Hotspot): Hotspot => {
  if (!hotspot.isDrawingThisPolygon) {
    return hotspot;
  }

  let updatedHotspot = {
    ...hotspot,
    isDrawingThisPolygon: false,
  };

  const onlyOnePoint = hotspot.points?.length === 1;
  if (onlyOnePoint) {
    // Each drawing needs at least two points. If there's only one, it will be removed.
    updatedHotspot = resetPoints(updatedHotspot);
  }

  return updatedHotspot;
};

export const removePoint = (
  removedPoint: Point,
  points: Array<Point>,
): Array<Point> => {
  return points.filter(
    ({ x, y }) => x !== removedPoint.x && y !== removedPoint.y,
  );
};

export const movePoint = (
  movedPoint: number,
  newPosition: Point,
  points: Array<Point>,
): Array<Point> => {
  return points.map((point, index) => {
    if (movedPoint === index) {
      return {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
    return point;
  });
};

export const activateDrawingHotspot = (
  hotspot: Hotspot,
  wordId: string,
): Hotspot => {
  const isCorrectWord = hotspot.word.id === wordId;
  if (isCorrectWord) {
    return { ...hotspot, isDrawingThisPolygon: true };
  }

  return {
    ...hotspot,
    isDrawingThisPolygon: false,
  };
};

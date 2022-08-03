import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";

export const resetPoints = (hotspot: Hotspot): Hotspot => {
  return {
    ...hotspot,
    points: [],
  };
};

export const resetPointsOfActiveHotspot = (hotspot: Hotspot): Hotspot => {
  if (!hotspot.drawing) {
    return hotspot;
  }

  return resetPoints(hotspot);
};

export const finishDrawingHotspot = (hotspot: Hotspot): Hotspot => {
  if (!hotspot.drawing) {
    return hotspot;
  }

  let updatedHotspot = {
    ...hotspot,
    drawing: false,
  };

  const onlyOnePoint = hotspot.points.length === 1;
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

export const activateDrawingHotspot = (
  hotspot: Hotspot,
  wordId: string,
): Hotspot => {
  const isCorrectWord = hotspot.word.id === wordId;
  if (isCorrectWord) {
    return { ...hotspot, drawing: true };
  }

  return {
    ...hotspot,
    drawing: false,
  };
};

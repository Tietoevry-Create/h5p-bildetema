import { Hotspot } from "../../types/Hotspot";
import { PointWithIndex } from "../../types/PointWithIndex";

export const resetPoints = (hotspot: Hotspot): Hotspot => {
  return {
    points: [],
    rotation: 0,
    word: hotspot.word,
    isDrawingThisPolygon: hotspot.isDrawingThisPolygon,
    color: hotspot.color,
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
  removedPoint: PointWithIndex,
  points: Array<PointWithIndex>,
): Array<PointWithIndex> => {
  return points.filter(({ index }) => removedPoint.index !== index);
};

export const movePoint = (
  movedPointIndex: number,
  newPosition: PointWithIndex,
  points: Array<PointWithIndex>,
): Array<PointWithIndex> => {
  return points.map((point, index) => {
    if (movedPointIndex === index) {
      return {
        ...point,
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

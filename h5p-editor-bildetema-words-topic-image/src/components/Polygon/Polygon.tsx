import * as React from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { pointsToDAttribute } from "../../utils/figure/figure.utils";
import styles from "./Polygon.module.scss";

export type PolygonProps = {
  hotspot: Hotspot;
  handleShapeClick: (wordId: string) => void;
  startShapeDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endShapeDragging: (event: React.MouseEvent) => boolean;
  isDrawing: boolean;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot,
  handleShapeClick,
  startShapeDragging,
  endShapeDragging,
  isDrawing,
}) => {
  const { points, isDrawingThisPolygon } = hotspot;

  if (!points) {
    return null;
  }

  const onFigureClick = (event: React.MouseEvent): void => {
    if (isDrawingThisPolygon || isDrawing) {
      return;
    }

    event.stopPropagation();
    handleShapeClick(hotspot.word.id);
  };

  const onShapeStartDrag = (event: React.MouseEvent): void => {
    event.stopPropagation();

    const { clientX: x, clientY: y } = event;
    startShapeDragging(hotspot, { x, y });
  };

  return points?.length > 0 ? (
    <path
      className={styles.path}
      d={pointsToDAttribute(!isDrawingThisPolygon, points)}
      strokeWidth="0.3"
      stroke="black"
      onClick={onFigureClick}
      onMouseDown={onShapeStartDrag}
      onMouseUp={endShapeDragging}
    />
  ) : null;
};

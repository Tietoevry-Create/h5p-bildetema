import * as React from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { pointsToDAttribute } from "../../utils/figure/figure.utils";
import styles from "./Polygon.module.scss";

export type PolygonProps = {
  hotspot: Hotspot;
  handleFigureClick: (wordId: string) => void;
  startFigureDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endFigureDraging: (event: React.MouseEvent) => boolean;
  isDrawing: boolean;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot,
  handleFigureClick,
  startFigureDragging,
  endFigureDraging,
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
    handleFigureClick(hotspot.word.id);
  };

  const onFigureStartDrag = (event: React.MouseEvent): void => {
    event.stopPropagation();

    const { clientX: x, clientY: y } = event;
    startFigureDragging(hotspot, { x, y });
  };

  return points?.length > 0 ? (
    <path
      className={styles.path}
      d={pointsToDAttribute(!isDrawingThisPolygon, points)}
      strokeWidth="0.3"
      stroke="black"
      onClick={onFigureClick}
      onMouseDown={onFigureStartDrag}
      onMouseUp={event => endFigureDraging(event)}
    />
  ) : null;
};

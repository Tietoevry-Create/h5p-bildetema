import React from "react";
import { findDistance } from "../../../../common/utils/figure/figure.utils";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { pointsToDAttribute } from "../../utils/figure/figure.utils";
import styles from "./Polygon.module.scss";

export type PolygonProps = {
  hotspot: Hotspot;
  handleCircleClick: (point: Point) => void;
  handleCircleDrag: (point: PointUpdate) => void;
  handleFigureClick: (hotspot: Hotspot) => void;
  startDragging: (startPoint: Point, index: number) => void;
  endDragging: (point: PointUpdate) => void;
  isDragging: boolean;
  isDrawing: boolean;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot,
  handleCircleClick,
  handleCircleDrag,
  handleFigureClick,
  startDragging,
  endDragging,
  isDragging,
  isDrawing,
}) => {
  const { points, isDrawingThisPolygon } = hotspot;

  if (!points) {
    return null;
  }

  const isCircle = points.length === 2;
  const onFigureClick = (event: React.MouseEvent): void => {
    if (isDrawingThisPolygon || isDrawing) {
      return;
    }

    event.stopPropagation();

    handleFigureClick(hotspot);
  };

  return (
    <>
      {isCircle ? (
        <circle
          cx={points[0].x}
          cy={points[0].y}
          r={findDistance(points[0], points[1])}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
          className={`${styles.circle} ${
            isDrawingThisPolygon || isDrawing ? styles.isDrawing : ""
          }`}
          onClick={onFigureClick}
        />
      ) : (
        points?.length && (
          <path
            className={`${styles.path} ${
              isDrawingThisPolygon || isDrawing ? styles.isDrawing : ""
            }`}
            d={pointsToDAttribute(!isDrawingThisPolygon, points)}
            strokeWidth="0.3"
            stroke="black"
            onClick={onFigureClick}
          />
        )
      )}

      {isDrawingThisPolygon &&
        points?.map(({ x, y }, index) => (
          <circle
            className={styles.point}
            style={{ fill: `${index === 0 && "red"}` }}
            onClick={e => {
              e.stopPropagation();
              handleCircleClick({ x, y });
            }}
            onMouseDown={e => {
              if (!isDragging) {
                e.stopPropagation();
                startDragging({ x, y }, index);
              }
            }}
            onMouseUp={e => {
              if (isDragging) {
                e.stopPropagation();
                endDragging({
                  from: { x, y, index },
                  to: { x: e.clientX, y: e.clientY },
                });
              }
            }}
            key={`${x}${y}${x + y + index}`}
            cx={x}
            cy={y}
            r="1"
          />
        ))}
    </>
  );
};

import * as React from "react";
import { FC, MouseEvent } from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { Ellipse } from "../Ellipse/Ellipse";
import { Polygon } from "../Polygon/Polygon";
import styles from "./Shape.module.scss";

type ShapeProps = {
  hotspot: Hotspot;
  handleCircleClick: (point: Point) => void;
  handleFigureClick: (wordId: string) => void;
  startDragging: (startPoint: Point, index: number) => void;
  endDragging: (point: PointUpdate) => void;
  endFigureDraging: (event: MouseEvent) => boolean;
  startFigureDragging: (hotspot: Hotspot, startPoint: Point) => void;
  isDragging: boolean;
  isDrawing: boolean;
};

type CircleHotspot = Omit<Hotspot, "points"> & { points: [Point, Point] };
const isCircle = (
  hotspot: Hotspot | CircleHotspot,
): hotspot is CircleHotspot => {
  return hotspot.points?.length === 2;
};

export const Shape: FC<ShapeProps> = ({
  hotspot,
  handleCircleClick,
  handleFigureClick,
  startDragging,
  endDragging,
  startFigureDragging,
  endFigureDraging,
  isDragging,
  isDrawing,
}) => {
  const { points, isDrawingThisPolygon } = hotspot;

  if (!points) {
    return null;
  }

  return (
    <>
      {isCircle(hotspot) ? (
        <Ellipse
          hotspot={hotspot}
          handleFigureClick={handleFigureClick}
          startFigureDragging={startFigureDragging}
          endFigureDraging={endFigureDraging}
          isDrawing={isDrawing}
        />
      ) : (
        points?.length > 0 && (
          <Polygon
            hotspot={hotspot}
            handleFigureClick={handleFigureClick}
            startFigureDragging={startFigureDragging}
            endFigureDraging={endFigureDraging}
            isDrawing={isDrawing}
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

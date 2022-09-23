import * as React from "react";
import { FC, MouseEvent, RefObject } from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { PointWithIndex } from "../../types/PointWithIndex";
import { Ellipse } from "../Ellipse/Ellipse";
import { Polygon } from "../Polygon/Polygon";
import styles from "./Shape.module.scss";

type ShapeProps = {
  hotspot: Hotspot;
  setHotspot: (hotspot: Hotspot) => void;
  handlePointClick: (point: PointWithIndex) => void;
  handleShapeClick: (wordId: string) => void;
  startPointDragging: (startPoint: PointWithIndex) => void;
  endPointDragging: (point: PointUpdate) => void;
  endShapeDragging: (event: MouseEvent) => boolean;
  startShapeDragging: (hotspot: Hotspot, startPoint: Point) => void;
  isDragging: boolean;
  isDrawing: boolean;
  canvasRef: RefObject<HTMLElement>;
  isDraggingEllipsePoint: boolean;
  setIsDraggingEllipsePoint: (isDragging: boolean) => void;
};

type EllipseHotspot = Omit<Hotspot, "points"> & {
  points: [PointWithIndex, PointWithIndex];
};
const isEllipse = (
  hotspot: Hotspot | EllipseHotspot,
): hotspot is EllipseHotspot => {
  return hotspot.points?.length === 2;
};

export const Shape: FC<ShapeProps> = ({
  hotspot,
  setHotspot,
  handlePointClick,
  handleShapeClick,
  startPointDragging,
  endPointDragging,
  startShapeDragging,
  endShapeDragging,
  isDragging,
  isDrawing,
  canvasRef,
  isDraggingEllipsePoint,
  setIsDraggingEllipsePoint,
}) => {
  const { points, isDrawingThisPolygon } = hotspot;

  if (!points) {
    return null;
  }

  return (
    <>
      {isEllipse(hotspot) ? (
        <Ellipse
          setHotspot={setHotspot}
          isDraggingEllipsePoint={isDraggingEllipsePoint}
          setIsDraggingEllipsePoint={setIsDraggingEllipsePoint}
          hotspot={hotspot}
          handleShapeClick={handleShapeClick}
          startShapeDragging={startShapeDragging}
          endShapeDragging={endShapeDragging}
          isDrawingThisEllipse={isDrawingThisPolygon}
          canvasRef={canvasRef}
        />
      ) : (
        points?.length > 0 && (
          <Polygon
            hotspot={hotspot}
            handleShapeClick={handleShapeClick}
            startShapeDragging={startShapeDragging}
            endShapeDragging={endShapeDragging}
          />
        )
      )}

      {isDrawingThisPolygon &&
        points?.map(({ x, y, index }) => (
          <circle
            className={`${styles.point} ${
              index === 0 && isEllipse(hotspot) ? styles.ellipseStartPoint : ""
            }`}
            style={{ fill: `${index === 0 && "red"}` }}
            onClick={e => {
              e.stopPropagation();
              handlePointClick({ x, y, index });
            }}
            onMouseDown={e => {
              if (!isDragging) {
                e.stopPropagation();

                const startPoint: PointWithIndex = { x, y, index };
                startPointDragging(startPoint);
              }
            }}
            onMouseUp={e => {
              if (isDragging) {
                e.stopPropagation();
                endPointDragging({
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

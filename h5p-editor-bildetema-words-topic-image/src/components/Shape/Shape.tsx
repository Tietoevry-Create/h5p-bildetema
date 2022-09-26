import * as React from "react";
import { FC, MouseEvent, RefObject } from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { PointWithIndex } from "../../types/PointWithIndex";
import { Ellipse } from "../Ellipse/Ellipse";
import { Polygon } from "../Polygon/Polygon";
// import styles from "./Shape.module.scss";

type ShapeProps = {
  hotspot: Hotspot;
  setHotspot: (hotspot: Hotspot) => void;
  handleShapeClick: (wordId: string) => void;
  endShapeDragging: (event: MouseEvent) => boolean;
  startShapeDragging: (hotspot: Hotspot, startPoint: Point) => void;
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
  handleShapeClick,
  startShapeDragging,
  endShapeDragging,
  canvasRef,
  isDraggingEllipsePoint,
  setIsDraggingEllipsePoint,
}) => {
  const { points, isDrawingThisPolygon } = hotspot;

  if (!points) {
    return (null)
  }

  return (
      isEllipse(hotspot) ? (
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
      ) :  (
          <Polygon
            hotspot={hotspot}
            handleShapeClick={handleShapeClick}
            startShapeDragging={startShapeDragging}
            endShapeDragging={endShapeDragging}
          />
        )
      )
};

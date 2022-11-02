import * as React from "react";
import { FC, RefObject, useEffect, useMemo } from "react";
import { findDistance } from "../../../../common/utils/figure/figure.utils";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { getDelta } from "../../utils/figure/figure.utils";
import styles from "./Ellipse.module.scss";
import colorStyles from "../../styles/topicImageEditorColors.module.scss";

type PointWithIndex = Point & { index: number };
type EllipseHotspot = Omit<Hotspot, "points"> & {
  points: [PointWithIndex, PointWithIndex];
};

type EllipseProps = {
  hotspot: EllipseHotspot;
  setHotspot: (hotspot: Hotspot) => void;
  handleShapeClick: (wordId: string) => void;
  startShapeDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endShapeDragging: (event: React.MouseEvent) => boolean;
  isDrawingThisEllipse: boolean;
  canvasRef: RefObject<HTMLElement>;
  isDraggingEllipsePoint: boolean;
  setIsDraggingEllipsePoint: (isDragging: boolean) => void;
};

export const Ellipse: FC<EllipseProps> = ({
  hotspot,
  setHotspot,
  handleShapeClick,
  startShapeDragging,
  endShapeDragging: endFigureDraging,
  isDrawingThisEllipse,
  canvasRef,
  isDraggingEllipsePoint,
  setIsDraggingEllipsePoint,
}) => {
  const [center, radiusPoint] = hotspot.points;
  const radiusX = findDistance(center, radiusPoint);
  const radiusY = hotspot.ellipseRadius ?? radiusX;

  const radiusRatio = radiusX / radiusY;

  const centerRadiusDelta = useMemo(
    () => getDelta(center, radiusPoint),
    [center, radiusPoint],
  );

  // Place the ellipse point π/2 (90 degrees) away from the radius
  const ellipsePoint = useMemo(
    (): Point => ({
      x: center.x - centerRadiusDelta.y / radiusRatio,
      y: center.y + centerRadiusDelta.x / radiusRatio,
    }),
    [center.x, center.y, centerRadiusDelta.x, centerRadiusDelta.y, radiusRatio],
  );

  useEffect(() => {
    const onMouseMove = ({ clientX, clientY }: MouseEvent): void => {
      if (
        !isDrawingThisEllipse ||
        !isDraggingEllipsePoint ||
        !canvasRef?.current
      ) {
        return;
      }

      const {
        x: offsetX,
        y: offsetY,
        height,
        width,
      } = canvasRef.current.getBoundingClientRect();

      const x = clientX - offsetX;
      const y = clientY - offsetY;

      const aspectRatio = width / height;

      const xPercentage = (x * 100) / width;
      const yPercentage = (y * (100 / aspectRatio)) / height;

      const minimalRadius = 1;
      const distanceFromCenter = findDistance(center, {
        x: xPercentage,
        y: yPercentage,
      });

      setHotspot({
        ...hotspot,
        ellipseRadius: Math.max(minimalRadius, distanceFromCenter),
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [
    canvasRef,
    center,
    hotspot,
    isDraggingEllipsePoint,
    isDrawingThisEllipse,
    setHotspot,
  ]);

  if (!center || !radiusPoint) {
    return null;
  }

  return (
    <>
      <ellipse
        cx={center.x}
        cy={center.y}
        rx={radiusX}
        ry={radiusY}
        transform={`rotate(${hotspot.rotation * (180 / Math.PI)} ${center.x} ${
          center.y
        })`}
        stroke="black"
        fill="none"
        strokeWidth="0.3"
        className={`${styles.ellipse} ${colorStyles[hotspot.color]}`}
        onDoubleClick={() => handleShapeClick(hotspot.word.id)}
        onMouseDown={({ clientX: x, clientY: y }) =>
          startShapeDragging(hotspot, { x, y })
        }
        onMouseUp={event => endFigureDraging(event)}
      />

      <circle
        className={`${styles.ellipsePoint} ${
          isDrawingThisEllipse ? styles.show : ""
        }`}
        cx={ellipsePoint.x}
        cy={ellipsePoint.y}
        r={1}
        fill="red"
        stroke="black"
        onMouseDown={() => {
          setIsDraggingEllipsePoint(true);
          setIsDraggingEllipsePoint(true);
        }}
        onMouseUp={() => {
          setIsDraggingEllipsePoint(false);
          setIsDraggingEllipsePoint(false);
        }}
        onClick={event => event.stopPropagation()}
      />
    </>
  );
};

import * as React from "react";
import { FC, RefObject, useEffect, useMemo, useState } from "react";
import { findDistance } from "../../../../common/utils/figure/figure.utils";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { getDelta } from "../../utils/figure/figure.utils";
import styles from "./Ellipse.module.scss";

type EllipseProps = {
  hotspot: Omit<Hotspot, "points"> & { points: [Point, Point] };
  handleFigureClick: (wordId: string) => void;
  startFigureDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endFigureDraging: (event: React.MouseEvent) => boolean;
  isDrawing: boolean;
  rotation: number;
  canvasRef: RefObject<HTMLElement>;
};

export const Ellipse: FC<EllipseProps> = ({
  hotspot,
  handleFigureClick,
  startFigureDragging,
  endFigureDraging,
  isDrawing,
  rotation,
  canvasRef,
}) => {
  const [center, radiusPoint] = hotspot.points;
  const radiusX = findDistance(center, radiusPoint);

  const [isDrawingEllipsePoint, setIsDrawingEllipsePoint] = useState(false);
  const [radiusY, setRadiusY] = useState(radiusX);

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
      if (!isDrawingEllipsePoint || !canvasRef?.current) {
        return;
      }

      const {
        x: offsetX,
        y: offsetY,
        height,
        width,
      } = canvasRef.current.getBoundingClientRect();

      const minimalRadius = 1;
      const distanceFromCenter = findDistance(center, {
        x: ((clientX - offsetX) / width) * 100,
        y: ((clientY - offsetY) / height) * 100,
      });

      setRadiusY(Math.max(minimalRadius, distanceFromCenter));
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef, center, isDrawingEllipsePoint]);

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
        transform={`rotate(${rotation * (180 / Math.PI)} ${center.x} ${
          center.y
        })`}
        stroke="black"
        fill="none"
        strokeWidth="0.3"
        className={styles.ellipse}
        onClick={event => {
          if (isDrawing) {
            return;
          }

          event.stopPropagation();

          handleFigureClick(hotspot.word.id);
        }}
        onMouseDown={({ clientX: x, clientY: y }) =>
          startFigureDragging(hotspot, { x, y })
        }
        onMouseUp={event => endFigureDraging(event)}
      />

      <circle
        cx={ellipsePoint.x}
        cy={ellipsePoint.y}
        r={4}
        fill="red"
        stroke="black"
        onMouseDown={() => setIsDrawingEllipsePoint(true)}
        onMouseUp={() => setIsDrawingEllipsePoint(false)}
        onClick={event => event.stopPropagation()}
      />
    </>
  );
};

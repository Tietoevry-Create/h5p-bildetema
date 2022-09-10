import * as React from "react";
import { FC, useMemo } from "react";
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
};

export const Ellipse: FC<EllipseProps> = ({
  hotspot,
  handleFigureClick,
  startFigureDragging,
  endFigureDraging,
  isDrawing,
}) => {
  const [center, radiusPoint] = hotspot.points;

  const centerRadiusDelta = useMemo(
    () => getDelta(center, radiusPoint),
    [center, radiusPoint],
  );

  const ellipsePoint = useMemo(
    (): Point => ({
      x: center.x - centerRadiusDelta.y,
      y: center.y + centerRadiusDelta.x,
    }),
    [center.x, center.y, centerRadiusDelta.x, centerRadiusDelta.y],
  );

  if (!center || !radiusPoint) {
    return null;
  }

  return (
    <>
      <circle
        cx={ellipsePoint.x}
        cy={ellipsePoint.y}
        r={4}
        fill="none"
        stroke="black"
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={findDistance(center, radiusPoint)}
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
    </>
  );
};

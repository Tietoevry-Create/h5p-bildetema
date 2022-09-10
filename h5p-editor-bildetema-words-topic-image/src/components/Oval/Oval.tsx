import * as React from "react";
import { FC, useMemo, useState } from "react";
import { findDistance } from "../../../../common/utils/figure/figure.utils";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { getDelta } from "../../utils/figure/figure.utils";
import styles from "./Oval.module.scss";

type OvalProps = {
  hotspot: Omit<Hotspot, "points"> & { points: [Point, Point] };
  handleFigureClick: (wordId: string) => void;
  startFigureDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endFigureDraging: (event: React.MouseEvent) => boolean;
  isDrawing: boolean;
};

export const Oval: FC<OvalProps> = ({
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

  const ovalPoint = useMemo(
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
        cx={ovalPoint.x}
        cy={ovalPoint.y}
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
        className={styles.circle}
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

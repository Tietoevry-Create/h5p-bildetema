import * as React from "react";
import { FC } from "react";
import { findDistance } from "../../../../common/utils/figure/figure.utils";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import styles from "./Circle.module.scss";

type CircleProps = {
  hotspot: Omit<Hotspot, "points"> & { points?: [Point, Point] };
  handleFigureClick: (hotspot: Hotspot) => void;
  startFigureDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endFigureDraging: (event: React.MouseEvent) => boolean;
};

export const Circle: FC<CircleProps> = ({
  hotspot,
  handleFigureClick,
  startFigureDragging,
  endFigureDraging,
}) => {
  const [center, tangentPoint] = hotspot.points ?? [];

  if (!center || !tangentPoint) {
    return null;
  }

  return (
    <circle
      cx={center.x}
      cy={center.y}
      r={findDistance(center, tangentPoint)}
      stroke="black"
      fill="none"
      strokeWidth="0.3"
      className={styles.circle}
      onClick={() => handleFigureClick(hotspot)}
      onMouseDown={({ clientX: x, clientY: y }) =>
        startFigureDragging(hotspot, { x, y })
      }
      onMouseUp={event => endFigureDraging(event)}
    />
  );
};

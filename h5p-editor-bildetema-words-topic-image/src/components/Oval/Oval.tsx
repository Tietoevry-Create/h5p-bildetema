import * as React from "react";
import { FC, useState } from "react";
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
  const [center, tangentPoint] = hotspot.points;
  const centerTangentDelta = getDelta(center, tangentPoint);
  const [ovalPoint, setOvalPoint] = useState({
    x: centerTangentDelta.y + center.x,
    y: centerTangentDelta.x + center.y,
  });

  if (!center || !tangentPoint) {
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
        r={findDistance(center, tangentPoint)}
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

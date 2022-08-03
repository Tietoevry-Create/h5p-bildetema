import React from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { findRadius } from "../../utils/polygon/polygon.utils";
import styles from "./Polygon.module.scss";

export type PolygonProps = {
  hotspot: Hotspot;
  handleCircleClick: (point: Point) => void;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot: { points, drawing },
  handleCircleClick,
}) => {
  const pointsToDAttribute = (): string => {
    const d =
      points
        ?.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
        .join(" ") ?? "";
    return drawing ? d : `${d} Z`;
  };

  return (
    <>
      {points?.length === 2 ? (
        <circle
          cx={points[0].x}
          cy={points[0].y}
          r={findRadius(points[0], points[1])}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
          className={styles.circle}
        />
      ) : (
        points?.length && (
          <path
            className={styles.path}
            d={pointsToDAttribute()}
            strokeWidth="0.3"
            stroke="black"
          />
        )
      )}
      {drawing &&
        points?.map(({ x, y }, index) => (
          <circle
            className={styles.point}
            style={{ fill: `${index === 0 && "red"}` }}
            onClick={e => {
              e.stopPropagation();
              handleCircleClick({ x, y });
            }}
            key={`${x}${y}`}
            cx={x}
            cy={y}
            r="1"
          />
        ))}
    </>
  );
};

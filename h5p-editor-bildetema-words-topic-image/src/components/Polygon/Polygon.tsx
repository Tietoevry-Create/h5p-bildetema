import React from "react";
import type { Hotspot, Point } from "../Svg/Svg";
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
    const d = points
      .map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
      .join(" ");
    return drawing ? d : `${d} Z`;
  };

  const findRadius = (a: Point, b: Point): number => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  };

  return (
    <>
      {/* {points.length && <path d={pointsToDAttribute()} fill="transparent" strokeWidth="0.3" stroke="black"/>} */}
      {points.length && points.length === 2 && !drawing ? (
        <circle
          cx={points[0].x}
          cy={points[0].y}
          r={findRadius(points[0], points[1])}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
        />
      ) : (
        points.length && (
          <path
            className={styles.path}
            d={pointsToDAttribute()}
            // fill="transparent"
            strokeWidth="0.3"
            stroke="black"
          />
        )
      )}
      {drawing &&
        points.map(({ x, y }, index) => (
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

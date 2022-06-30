import React from "react";
import type { Hotspot } from "../Svg/Svg";

export type PolygonProps = {
  hotspot: Hotspot;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot: { points, drawing },
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
            d={pointsToDAttribute()}
            fill="transparent"
            strokeWidth="0.3"
            stroke="black"
          />
        )
      )}
      {drawing &&
        points.map(({ x, y }) => (
          <circle
            key={`${x}${y}`}
            cx={x}
            cy={y}
            r="0.5"
            stroke="black"
            fill="none"
            strokeWidth="0.3"
          />
        ))}
    </>
  );
};

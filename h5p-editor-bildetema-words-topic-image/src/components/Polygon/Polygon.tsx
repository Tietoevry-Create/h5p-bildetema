import React from "react";
import { findDistance } from "../../../../common/utils/figure/figure.utils";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { pointsToDAttribute } from "../../utils/figure/figure.utils";
import styles from "./Polygon.module.scss";

export type PolygonProps = {
  hotspot: Hotspot;
  handleCircleClick: (point: Point) => void;
  handleFigureClick: (hotspot: Hotspot) => void;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot,
  handleCircleClick,
  handleFigureClick,
}) => {
  const { points, drawing } = hotspot;

  if (!points) {
    return null;
  }

  const isCircle = points.length === 2;

  const onFigureClick = (event: React.MouseEvent): void => {
    if (drawing) {
      return;
    }

    event.stopPropagation();

    handleFigureClick(hotspot);
  };

  return (
    <>
      {isCircle ? (
        <circle
          cx={points[0].x}
          cy={points[0].y}
          r={findDistance(points[0], points[1])}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
          className={`${styles.circle} ${drawing ? styles.isDrawing : ""}`}
          onClick={onFigureClick}
        />
      ) : (
        points?.length && (
          <path
            className={`${styles.path} ${drawing ? styles.isDrawing : ""}`}
            d={pointsToDAttribute(!drawing, points)}
            strokeWidth="0.3"
            stroke="black"
            onClick={onFigureClick}
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

import React from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { Polygon } from "../Polygon/Polygon";
import styles from "./Svg.module.scss";

export type SvgProps = {
  hotspots: Hotspot[];
  handleCircleClick: (point: Point) => void;
  handleCircleDrag: (point: PointUpdate) => Point;
  handleFigureClick: (hotspot: Hotspot) => void;
  aspectRatio: number;
};

export const Svg: React.FC<SvgProps> = ({
  hotspots,
  handleCircleClick,
  handleCircleDrag,
  handleFigureClick,
  aspectRatio,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<Point | null>(null);

  const startDragging = (startPoint:Point):void => {
    setIsDragging(true);
    setDragStart(startPoint);
  }

  const endDragging = (pointUpdate:PointUpdate):void => {
    setIsDragging(false);
    setDragStart(null);
  }

  return (
    <svg
      className={styles.svg}
      preserveAspectRatio="none"
      viewBox={`0 0 100 ${100 / aspectRatio}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={e => {
        if (isDragging && dragStart) {
          console.info("onDragMove IN SVG", e);
          e.stopPropagation();
        
          setDragStart(handleCircleDrag({ from: dragStart, to: {x: e.clientX, y: e.clientY} }));
        }
      }}
    >
      {hotspots.map(hotspot =>
        hotspot.points && hotspot.points?.length > 0 ? (
          <Polygon
            key={hotspot.word.id}
            hotspot={hotspot}
            handleCircleClick={handleCircleClick}
            handleCircleDrag={handleCircleDrag}
            handleFigureClick={handleFigureClick}
            startDragging={startDragging}
            isDragging={isDragging}
            endDragging={endDragging}
          />
        ) : null,
      )}
    </svg>
  );
};

import React from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { Polygon } from "../Polygon/Polygon";
import styles from "./Svg.module.scss";

export type SvgProps = {
  hotspots: Hotspot[];
  handleCircleClick: (point: Point) => void;
  handleFigureClick: (hotspot: Hotspot) => void;
  aspectRatio: number;
};

export const Svg: React.FC<SvgProps> = ({
  hotspots,
  handleCircleClick,
  handleFigureClick,
  aspectRatio,
}) => {
  return (
    <svg
      className={styles.svg}
      preserveAspectRatio="none"
      viewBox={`0 0 100 ${100 / aspectRatio}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {hotspots.map(hotspot => (
        <Polygon
          key={hotspot.word.id}
          hotspot={hotspot}
          handleCircleClick={handleCircleClick}
          handleFigureClick={handleFigureClick}
        />
      ))}
    </svg>
  );
};

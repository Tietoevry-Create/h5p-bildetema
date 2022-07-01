import React from "react";
import { Polygon } from "../Polygon/Polygon";
import { Word } from "../../../../common/types/types";
import styles from "./Svg.module.scss";

export type Point = {
  x: number;
  y: number;
};

export type Hotspot = {
  points: Point[];
  drawing: boolean;
  word: Word;
};

export type SvgProps = {
  hotspots: Hotspot[];
  handleCircleClick: (point: Point) => void;
};

export const Svg: React.FC<SvgProps> = ({ hotspots, handleCircleClick }) => {
  return (
    <svg
      className={styles.svg}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {hotspots.map(hotspot => (
        <Polygon
          key={hotspot.word.id}
          hotspot={hotspot}
          handleCircleClick={handleCircleClick}
        />
      ))}
    </svg>
  );
};

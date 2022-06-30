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
};

export const Svg: React.FC<SvgProps> = ({ hotspots }) => {
  // const [hotspot, setHotspot] = React.useState<Hotspot>(
  //   {
  //     points: [{x:10, y:10},{x:25, y:20}, {x:30, y:30}],
  //     finishedDrawing: false
  //   }
  // )

  // const hotspot: Hotspot = {
  //   // points: [],
  //   // finished: true
  //   points: [{x:10, y:10},{x:25, y:20}, {x:30, y:30}],
  //   finishedDrawing: false
  // }

  return (
    <svg
      className={styles.svg}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {hotspots.map(hotspot => (
        <Polygon hotspot={hotspot} />
      ))}
      {/* <Polygon hotspot={hotspots[0]}/> */}
    </svg>
  );
};

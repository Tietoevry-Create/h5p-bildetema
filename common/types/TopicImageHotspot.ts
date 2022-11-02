import type { Point } from "./Point";
import type { Word } from "./types";
import { Color } from "../enums/Color";

export type TopicImageHotspot = {
  points: Array<Point>;
  rotation: number;
  ellipseRadius: number;
  word: Word;
  color: Color;
};

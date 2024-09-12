import { Color } from "../enums/Color";
import type { Point } from "./Point";
import type { Word } from "./types";

export type TopicImageHotspot = {
  points: Array<Point>;
  rotation: number;
  ellipseRadius: number;
  word: Word;
  color: Color;
};

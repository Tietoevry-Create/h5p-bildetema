import type { Word } from "../../../common/types/types";
import type { Point } from "./Point";

export type Hotspot = {
  points?: Point[];
  isDrawingThisPolygon: boolean;
  word: Word;
};

import type { Word } from "../../../common/types/types";
import type { PointWithIndex } from "./PointWithIndex";

export type Hotspot = {
  points?: Array<PointWithIndex>;
  isDrawingThisPolygon: boolean;
  word: Word;
  rotation: number;
};

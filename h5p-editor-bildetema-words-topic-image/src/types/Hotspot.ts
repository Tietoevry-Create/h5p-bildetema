import type { Word } from "../../../common/types/types";
import type { PointWithIndex } from "./PointWithIndex";
import type { Color } from "../../../common/enums/Color";

export type Hotspot = {
  points?: Array<PointWithIndex>;
  isDrawingThisPolygon: boolean;
  word: Word;
  rotation: number;
  color: Color;
  ellipseRadius?: number;
};

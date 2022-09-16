import { Hotspot } from "./Hotspot";
import { Point } from "./Point";

export type HotspotUpdate = {
  from: Point;
  hotspot: Hotspot;
  hotspotIndex: number;
};

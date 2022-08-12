import type { Point } from "../../../../common/types/Point";
import { findDistance } from "../../../../common/utils/figure/figure.utils";

export const renderFigure = (points: Array<Point>): string => {
  const html = String.raw;

  const isCircle = points.length === 2;
  const isPolygon = points.length > 2;

  if (isCircle) {
    const [centerPoint, circleEdgePoint] = points;

    return html`<circle
      cx="${centerPoint.x}"
      cy="${centerPoint.y}"
      r="${findDistance(centerPoint, circleEdgePoint)}"
      stroke="black"
      fill="none"
      strokeWidth="0.3"
    />`;
  }

  if (isPolygon) {
    const pointsAttr = points?.map(({ x, y }) => `${x},${y}`).join(" ");

    // TODO: Move inline styling to CSS
    return html`<polygon
      points="${pointsAttr}"
      style="fill:none;stroke:none;stroke-width:0.3"
    />`;
  }

  return "";
};

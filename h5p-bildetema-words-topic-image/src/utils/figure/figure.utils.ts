import type { Point } from "../../../../common/types/Point";
import styles from "./figure.module.scss";

export const renderFigure = (
  points: Array<Point>,
  rotation: number,
  ellipseRadius: number,
): string => {
  const html = String.raw;

  const isCircle = points.length === 2;
  const isPolygon = points.length > 2;

  const findDistance = (a: Point, b: Point): number => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  };

  if (isCircle) {
    const [centerPoint, radiusPoint] = points;
    const radiusX = findDistance(centerPoint, radiusPoint);
    const radiusY = ellipseRadius ?? radiusX;

    return html`<ellipse
      cx="${centerPoint.x}"
      cy="${centerPoint.y}"
      rx="${radiusX}"
      ry="${radiusY}"
      r="${findDistance(centerPoint, radiusPoint)}"
      transform="${`rotate(${rotation * (180 / Math.PI)} ${centerPoint.x} ${
        centerPoint.y
      })`}"
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

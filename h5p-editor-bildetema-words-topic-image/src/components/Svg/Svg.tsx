import * as React from "react";
import {
  FC,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Hotspot } from "../../types/Hotspot";
import { HotspotUpdate } from "../../types/HotspotUpdate";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { getDelta } from "../../utils/figure/figure.utils";
import { Shape } from "../Shape/Shape";
import styles from "./Svg.module.scss";

export type SvgProps = {
  hotspots: Hotspot[];
  handleCircleClick: (point: Point) => void;
  handleCircleDrag: (point: PointUpdate) => Point;
  handleFigureClick: (wordId: string) => void;
  handleFigureDrag: (figureUpdate: HotspotUpdate, newPosition: Point) => void;
  aspectRatio: number;
  canvasRef: RefObject<HTMLElement>;
};

export const Svg: FC<SvgProps> = ({
  hotspots,
  handleCircleClick,
  handleCircleDrag,
  handleFigureClick,
  handleFigureDrag,
  aspectRatio,
  canvasRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<
    (Point & { index: number }) | null
  >(null);
  const [ellipseRotation, setEllipseRotation] = useState(0);

  const [figureDrag, setFigureDrag] = useState<HotspotUpdate | null>(null);

  const endFigureDragging = (event: MouseEvent): boolean => {
    if (isDragging && figureDrag) {
      event.stopPropagation();
      setIsDragging(false);
      setFigureDrag(null);
      return false;
    }
    return true;
  };

  const startFigureDragging = (index: number) => {
    return (hotspot: Hotspot, startPoint: Point) => {
      setIsDragging(true);
      setFigureDrag({ from: startPoint, hotspotIndex: index, hotspot });
    };
  };

  const startDragging = (startPoint: Point, index: number): void => {
    setIsDragging(true);
    setDragStart({ ...startPoint, index });
  };

  const endDragging = (): void => {
    setIsDragging(false);
    setDragStart(null);
  };

  const onCircleDrag = (point: PointUpdate): Point => {
    const startPoint = point.from;

    const drawnHotspot = hotspots.find(hotspot => hotspot.isDrawingThisPolygon);

    const isEllipse = drawnHotspot?.points?.length === 2;

    const ellipseRadiusPoint = drawnHotspot?.points?.[1];
    const isEllipseRadiusPoint =
      isEllipse &&
      ellipseRadiusPoint?.x === startPoint.x &&
      ellipseRadiusPoint.y === startPoint.y;

    if (isEllipseRadiusPoint) {
      const centerPoint = drawnHotspot.points?.[0];

      // @ts-expect-error `centerPoint` is defined
      const radiusPointDelta = getDelta(centerPoint, ellipseRadiusPoint);

      const rotation = Math.atan2(radiusPointDelta.y, radiusPointDelta.x);
      setEllipseRotation(rotation);
    }

    return handleCircleDrag(point);
  };

  const findSomeDrawing = useCallback((): boolean => {
    return !!hotspots.find(hotspot => hotspot.isDrawingThisPolygon);
  }, [hotspots]);

  const [isDrawing, setIsDrawing] = useState(isDrawingSomething());

  useEffect(() => {
    setIsDrawing(isDrawingSomething());
  }, [setIsDrawing, isDrawingSomething]);

  return (
    <svg
      className={styles.svg}
      preserveAspectRatio="none"
      viewBox={`0 0 100 ${100 / aspectRatio}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={e => {
        if (isDragging && dragStart) {
          e.stopPropagation();

          setDragStart({
            ...onCircleDrag({
              from: dragStart,
              to: { x: e.clientX, y: e.clientY },
            }),
            index: dragStart.index,
          });
        } else if (isDragging && figureDrag) {
          e.stopPropagation();
          handleFigureDrag(figureDrag, { x: e.clientX, y: e.clientY });
        }
      }}
    >
      {hotspots.map((hotspot, index) =>
        hotspot.points && hotspot.points?.length > 0 ? (
          <Shape
            isDrawing={isDrawing}
            key={hotspot.word.id}
            hotspot={hotspot}
            handleCircleClick={handleCircleClick}
            handleFigureClick={handleFigureClick}
            startDragging={startDragging}
            startFigureDragging={startFigureDragging(index)}
            endFigureDraging={endFigureDragging}
            isDragging={isDragging}
            endDragging={endDragging}
            ellipseRotation={ellipseRotation}
            canvasRef={canvasRef}
          />
        ) : null,
      )}
    </svg>
  );
};

import { FC, MouseEvent, RefObject, useMemo, useState } from "react";
import { Hotspot } from "../../types/Hotspot";
import { HotspotUpdate } from "../../types/HotspotUpdate";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { PointWithIndex } from "../../types/PointWithIndex";
import { getDelta } from "../../utils/figure/figure.utils";
import { Shape } from "../Shape/Shape";
import styles from "./Svg.module.scss";

export type SvgProps = {
  hotspots: Array<Hotspot>;
  setHotspots: (hotspots: Array<Hotspot>) => void;
  handlePointClick: (point: PointWithIndex) => void;
  handlePointDrag: (point: PointUpdate) => Point;
  handleShapeClick: (wordId: string) => void;
  handleShapeDrag: (hotspotUpdate: HotspotUpdate, newPosition: Point) => void;
  aspectRatio: number;
  canvasRef: RefObject<HTMLElement>;
  isDraggingEllipsePoint: boolean;
  setIsDraggingEllipsePoint: (isDragging: boolean) => void;
  hideHotspotsWhileDrawing: boolean;
};

export const Svg: FC<SvgProps> = ({
  hotspots,
  setHotspots,
  handlePointClick,
  handlePointDrag,
  handleShapeClick,
  handleShapeDrag,
  aspectRatio,
  canvasRef,
  isDraggingEllipsePoint,
  setIsDraggingEllipsePoint,
  hideHotspotsWhileDrawing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<
    (Point & { index: number }) | null
  >(null);
  const [shapeDrag, setShapeDrag] = useState<HotspotUpdate | null>(null);

  const currentDrawnShape = useMemo((): Hotspot | undefined => {
    return hotspots.find(hotspot => hotspot.isDrawingThisPolygon);
  }, [hotspots]);

  const endShapeDragging = (event: MouseEvent): boolean => {
    if (isDragging && shapeDrag) {
      event.stopPropagation();
      setIsDragging(false);
      setShapeDrag(null);
      return false;
    }
    return true;
  };

  const startShapeDragging =
    (index: number) => (hotspot: Hotspot, startPoint: Point) => {
      if (
        !hotspot.isDrawingThisPolygon &&
        hotspots.some(hp => hp.isDrawingThisPolygon)
      )
        return;
      setIsDragging(true);
      setShapeDrag({ from: startPoint, hotspotIndex: index, hotspot });
    };

  const startPointDragging = (startPoint: PointWithIndex): void => {
    setIsDragging(true);
    setDragStart(startPoint);
  };

  const endPointDragging = (): void => {
    setIsDragging(false);
    setDragStart(null);
  };

  const onPointDrag = (point: PointUpdate): Point => {
    const startPoint = point.from;

    const drawnHotspot = hotspots.find(hotspot => hotspot.isDrawingThisPolygon);

    const isEllipse = drawnHotspot?.points?.length === 2;

    const ellipseRadiusPoint = drawnHotspot?.points?.[1];
    const isEllipseRadiusPoint =
      isEllipse &&
      ellipseRadiusPoint?.x === startPoint.x &&
      ellipseRadiusPoint.y === startPoint.y;

    if (isEllipseRadiusPoint && currentDrawnShape) {
      const centerPoint = drawnHotspot.points?.[0];

      // @ts-expect-error `centerPoint` is defined
      const radiusPointDelta = getDelta(centerPoint, ellipseRadiusPoint);

      const rotation = Math.atan2(radiusPointDelta.y, radiusPointDelta.x);
      currentDrawnShape.rotation = rotation;
    }

    return handlePointDrag(point);
  };

  const onMouseMove = (event: MouseEvent): void => {
    const isDraggingPoint = isDragging && dragStart;
    const isDraggingShape = isDragging && shapeDrag;

    if (isDraggingPoint) {
      event.stopPropagation();

      setDragStart({
        ...onPointDrag({
          from: dragStart,
          to: {
            ...dragStart,
            x: event.clientX,
            y: event.clientY,
          },
        }),
        index: dragStart.index,
      });
    } else if (isDraggingShape) {
      event.stopPropagation();

      handleShapeDrag(shapeDrag, { x: event.clientX, y: event.clientY });
    }
  };
  const someDrawing = hotspots.some(hotspot => hotspot.isDrawingThisPolygon);
  return (
    <svg
      className={styles.svg}
      preserveAspectRatio="none"
      viewBox={`0 0 100 ${100 / aspectRatio}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={onMouseMove}
    >
      {hotspots
        .slice(0)
        .reverse()
        .map((hotspot, index) =>
          hotspot.points && hotspot.points?.length > 0 ? (
            <Shape
              key={hotspot.word.id}
              hotspot={hotspot}
              setHotspot={updatedHotspot =>
                setHotspots(
                  hotspots.map(hs =>
                    hs.word.id === updatedHotspot.word.id ? updatedHotspot : hs,
                  ),
                )
              }
              handleShapeClick={handleShapeClick}
              startShapeDragging={startShapeDragging(index)}
              endShapeDragging={endShapeDragging}
              canvasRef={canvasRef}
              isDraggingEllipsePoint={isDraggingEllipsePoint}
              setIsDraggingEllipsePoint={setIsDraggingEllipsePoint}
              isHidden={(() => {
                if (!someDrawing) return false;
                if (hotspot.isDrawingThisPolygon) return false;
                return hideHotspotsWhileDrawing;
              })()}
            />
          ) : null,
        )}
      {currentDrawnShape &&
        currentDrawnShape?.points?.map(({ x, y, index }) => (
          <circle
            className={`${styles.point} 
        ${
          index === 0 &&
          currentDrawnShape?.points?.length === 2 &&
          styles.ellipseStartPoint
        }
        `}
            style={{ fill: `${index === 0 && "red"}` }}
            onDoubleClick={() => handlePointClick({ x, y, index })}
            onMouseDown={e => {
              if (!isDragging) {
                e.stopPropagation();

                const startPoint: PointWithIndex = { x, y, index };
                startPointDragging(startPoint);
              }
            }}
            onMouseUp={e => {
              if (isDragging) {
                e.stopPropagation();
                endPointDragging();
              }
            }}
            key={`${x}${y}${x + y + index}`}
            cx={x}
            cy={y}
            r="1"
          />
        ))}
    </svg>
  );
};

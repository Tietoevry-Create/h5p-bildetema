import React from "react";
import { Hotspot } from "../../types/Hotspot";
import { HotspotUpdate } from "../../types/HotspotUpdate";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { Polygon } from "../Polygon/Polygon";
import styles from "./Svg.module.scss";

export type SvgProps = {
  hotspots: Hotspot[];
  handleCircleClick: (point: Point) => void;
  handleCircleDrag: (point: PointUpdate) => Point;
  handleFigureClick: (hotspot: Hotspot) => void;
  handleFigureDrag: (figureUpdate: HotspotUpdate, newPosition: Point) => void;
  aspectRatio: number;
};

export const Svg: React.FC<SvgProps> = ({
  hotspots,
  handleCircleClick,
  handleCircleDrag,
  handleFigureClick,
  handleFigureDrag,
  aspectRatio,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<
    (Point & { index: number }) | null
  >(null);

  const [figureDrag, setFigureDrag] = React.useState<HotspotUpdate | null>(
    null,
  );

  const endFigureDragging = (event: React.MouseEvent): boolean => {
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

  const endDragging = (pointUpdate: PointUpdate): void => {
    setIsDragging(false);
    setDragStart(null);
  };

  const findSomeDrawing = React.useCallback((): boolean => {
    return !!hotspots.find(hotspot => hotspot.isDrawingThisPolygon);
  }, [hotspots]);

  const [isDrawing, setIsDrawing] = React.useState(findSomeDrawing());

  React.useEffect(() => {
    setIsDrawing(findSomeDrawing());
  }, [setIsDrawing, findSomeDrawing]);

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
            ...handleCircleDrag({
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
          <Polygon
            isDrawing={isDrawing}
            key={hotspot.word.id}
            hotspot={hotspot}
            handleCircleClick={handleCircleClick}
            handleCircleDrag={handleCircleDrag}
            handleFigureClick={handleFigureClick}
            startDragging={startDragging}
            startFigureDragging={startFigureDragging(index)}
            endFigureDraging={endFigureDragging}
            isDragging={isDragging}
            endDragging={endDragging}
          />
        ) : null,
      )}
    </svg>
  );
};

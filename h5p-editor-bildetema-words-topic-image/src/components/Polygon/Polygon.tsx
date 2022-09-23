import * as React from "react";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import { pointsToDAttribute } from "../../utils/figure/figure.utils";
import styles from "./Polygon.module.scss";

export type PolygonProps = {
  isDragging:boolean,
  hotspot: Hotspot;
  handleShapeClick: (wordId: string) => void;
  startShapeDragging: (hotspot: Hotspot, startPoint: Point) => void;
  endShapeDragging: (event: React.MouseEvent) => boolean;
  isDrawing: boolean;
};

export const Polygon: React.FC<PolygonProps> = ({
  hotspot,
  handleShapeClick,
  startShapeDragging,
  endShapeDragging,
  isDrawing,
}) => {
  const { points, isDrawingThisPolygon } = hotspot;
  const timer = React.useRef<NodeJS.Timeout>()

  const [longClick, setLongClick] = React.useState(false)

  
  const onFigureClick = (event: React.MouseEvent): void => {
    if (isDrawingThisPolygon || isDrawing ) {
      return;
    }
    
    event.stopPropagation();
    handleShapeClick(hotspot.word.id);
  };
  
  const onShapeStartDrag = (event: React.MouseEvent): void => {
    event.stopPropagation();
    
    const { clientX: x, clientY: y } = event;
    startShapeDragging(hotspot, { x, y });
  };

  const handleMouseDown = (e: React.MouseEvent): void => {
    timer.current = setTimeout(() => {
      setLongClick(true)
    }, 150)
  }

  return points?.length > 0 ? (
    <path
      className={styles.path}
      d={pointsToDAttribute(!isDrawingThisPolygon, points)}
      strokeWidth="0.3"
      stroke="black"
      onClick={(e)=> {
        if(longClick) {
          setLongClick(false)
          return
        }
        clearInterval(timer.current)
        onFigureClick(e)
      }}
      onMouseDown={(e) => {
        handleMouseDown(e)
        onShapeStartDrag(e)
      }}
      onMouseUp={(e)=>{
        endShapeDragging(e);
      }}
    />
  ) : null;
};

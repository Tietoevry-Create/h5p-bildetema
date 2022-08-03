import type { Image as ImageType } from "h5p-types";
import React from "react";
import { Word } from "../../../../common/types/types";
import { SetValueContext } from "../../contexts/SetValueContext";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
import {
  activateDrawingHotspot,
  finishDrawingHotspot,
  removePoint,
  resetPoints,
  resetPointsOfActiveHotspot,
} from "../../utils/hotspot/hotspot.utils";
import { Button } from "../Button/Button";
import { Image } from "../Image/Image";
import { Svg } from "../Svg/Svg";
import styles from "./Editor.module.scss";

export type EditorProps = {
  image: ImageType | undefined;
  words: Word[];
  initialHotspots: Array<Hotspot>;
};
export const Editor: React.FC<EditorProps> = ({
  image,
  words,
  initialHotspots,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const setValue = React.useContext(SetValueContext);

  const [hotspots, setHotspots] = React.useState(initialHotspots);
  const aspectRatio = (image?.width ?? 1) / (image?.height ?? 1);

  React.useEffect(() => {
    const newHotspots = words.map(word => ({
      points:
        initialHotspots.find(hotspot => hotspot.word.id === word.id)?.points ??
        [],
      drawing: false,
      word,
      wordId: word.id,
    }));

    setHotspots(newHotspots);
  }, [initialHotspots, words]);

  React.useEffect(() => {
    setValue(hotspots);
  }, [hotspots, setValue]);

  const handleClick = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLElement>): void => {
    if (!ref?.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;
    const { width, height } = rect;
    const point = {
      x: ((clientX - offsetX) / width) * 100,
      y: (((clientY - offsetY) / height) * 100) / aspectRatio,
    };

    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.drawing) {
        return hotspot;
      }

      if (hotspot.points) {
        return { ...hotspot, points: [...hotspot.points, point] };
      }

      return {
        ...hotspot,
        points: [point],
      };
    });

    setHotspots(updatedHotspots);
  };

  const handleWordSelected = (id: string): void => {
    const updatedHotspots = hotspots.map(hotspot =>
      activateDrawingHotspot(hotspot, id),
    );

    setHotspots(updatedHotspots);
  };

  const handleFinishedPressed = (): void => {
    const updatedHotspots = hotspots.map(finishDrawingHotspot);
    setHotspots(updatedHotspots);
  };

  const handleReset = (): void => {
    const updatedHotspots = hotspots.map(resetPointsOfActiveHotspot);

    setHotspots(updatedHotspots);
  };

  const handleCircleClick = (point: Point): void => {
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.drawing || !hotspot.points) {
        return hotspot;
      }

      const { x: startX, y: startY } = hotspot.points[0];

      const clickedOnStartPoint = startX === point.x && startY === point.y;
      const startPointIsTheOnlyPoint = hotspot.points.length === 1;

      if (clickedOnStartPoint) {
        if (startPointIsTheOnlyPoint) {
          return resetPoints(hotspot);
        }

        // Finish the drawing without re-adding the current point (because it already exists as the start point)
        return { ...hotspot, drawing: false };
      }

      // If a point other than the start point was clicked, remove it
      return {
        ...hotspot,
        points: removePoint(point, hotspot?.points),
      };
    });

    setHotspots(updatedHotspots);
  };

  // TODO: Translate
  const finishedButtonLabel = "Finished";
  // TODO: Translate
  const resetButtonLabel = "Reset";

  return (
    <div className={styles.editor}>
      <div className={styles.controls}>
        {hotspots.map(({ word: { label, id }, drawing, points }) => (
          <Button
            key={id}
            isActive={drawing}
            color={points?.length ? "#7FD1AE" : ""}
            label={label}
            id={id}
            clickHandler={() => handleWordSelected(id)}
          />
        ))}
        <button type="button" onClick={handleFinishedPressed}>
          {finishedButtonLabel}
        </button>
        <button type="button" onClick={handleReset}>
          {resetButtonLabel}
        </button>
      </div>
      <div
        tabIndex={0}
        ref={ref}
        className={styles.canvas}
        onClick={handleClick}
        onKeyDown={() => null}
        role="button"
      >
        <Image image={image} />
        <Svg
          hotspots={hotspots}
          handleCircleClick={handleCircleClick}
          aspectRatio={aspectRatio}
        />
      </div>
    </div>
  );
};

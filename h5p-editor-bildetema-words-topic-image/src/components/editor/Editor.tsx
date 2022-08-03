import type { Image as ImageType } from "h5p-types";
import React from "react";
import { Word } from "../../../../common/types/types";
import { SetValueContext } from "../../contexts/SetValueContext";
import { Hotspot } from "../../types/Hotspot";
import { Point } from "../../types/Point";
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

  const handleMouseEvent = (e: React.MouseEvent<HTMLElement>): void => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      const offsetX = rect.x;
      const offsetY = rect.y;
      const { width, height } = rect;
      const point = {
        x: ((e.clientX - offsetX) / width) * 100,
        y: ((e.clientY - offsetY) / height) * 100,
      };

      setHotspots(prev => {
        prev.find(hotspot => hotspot.drawing)?.points.push(point);
        return [...prev];
      });
    }
  };

  const handleWordSelected = (id: string): void => {
    setHotspots(prev =>
      prev.map(hotspot =>
        id === hotspot.word.id
          ? { ...hotspot, drawing: true }
          : { ...hotspot, drawing: false },
      ),
    );
  };

  const handleFinishedPressed = (): void => {
    const updatedHotspots = hotspots.map(hotspot => ({
      ...hotspot,
      drawing: false,
    }));

    setHotspots(updatedHotspots);
  };

  const handleReset = (): void => {
    setHotspots(prev =>
      prev.map(hotspot =>
        hotspot.drawing ? { ...hotspot, points: [] } : { ...hotspot },
      ),
    );
  };

  const handleCircleClick = (point: Point): void => {
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.drawing) {
        return hotspot;
      }

      const clickedOnStartPoint =
        hotspot.points[0].x === point.x && hotspot.points[0].y === point.y;
      const startPointIsTheOnlyPoint = hotspot.points.length === 1;

      if (clickedOnStartPoint) {
        if (startPointIsTheOnlyPoint) {
          return {
            ...hotspot,
            points: [],
          };
        }

        // Finish the drawing without re-adding the current point (because it already exists as the start point)
        return { ...hotspot, drawing: false };
      }

      // If a point other than the start point was clicked, remove it
      return {
        ...hotspot,
        points: hotspot.points.filter(
          ({ x, y }) => x !== point.x && y !== point.y,
        ),
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
            color={points.length ? "#7FD1AE" : ""}
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
        onClick={handleMouseEvent}
        onKeyDown={() => null}
        role="button"
      >
        <Image image={image} />
        <Svg hotspots={hotspots} handleCircleClick={handleCircleClick} />
      </div>
    </div>
  );
};

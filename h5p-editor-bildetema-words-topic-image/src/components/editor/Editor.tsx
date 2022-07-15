import React from "react";
import type { Image as ImageType } from "h5p-types";
import { Word } from "../../../../common/types/types";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";
import { Point, Svg } from "../Svg/Svg";
import type { Hotspot } from "../Svg/Svg";
import styles from "./Editor.module.scss";
import { SetValueContext } from "../../contexts/SetValueContext";

export type EditorProps = {
  image: ImageType | undefined;
  words: Word[];
};
export const Editor: React.FC<EditorProps> = ({ image, words }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const setValue = React.useContext(SetValueContext);

  const [hotspots, setHotspots] = React.useState<Hotspot[]>([]);

  React.useEffect(() => {
    setHotspots(words.map(word => ({ points: [], drawing: false, word })));
  }, [words]);

  React.useEffect(() => {
    console.info("Editor useEffect setting value", hotspots);
    setValue(hotspots);
  }, [hotspots,setValue]);

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
      prev.map(hotspot => {
        return id === hotspot.word.id
          ? { ...hotspot, drawing: true }
          : { ...hotspot, drawing: false };
      }),
    );
  };

  const handleFinishedPressed = (): void => {
    setHotspots(prev => [
      ...prev.map(hotspot => ({ ...hotspot, drawing: false })),
    ]);
  };

  const handleReset = (): void => {
    setHotspots(prev => {
      return prev.map(hotspot => {
        return hotspot.drawing ? { ...hotspot, points: [] } : { ...hotspot };
      });
    });
  };

  const handleCircleClick = (point: Point): void => {
    setHotspots(prev => {
      return prev.map(hotspot => {
        if (hotspot.drawing) {
          return hotspot.points[0].x === point.x &&
            hotspot.points[0].y === point.y
            ? { ...hotspot, drawing: false }
            : {
                ...hotspot,
                points: hotspot.points.filter(
                  el => el.x !== point.x && el.y !== point.y,
                ),
              };
        }
        return { ...hotspot };
      });
    });
  };

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
          Finished
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div
        tabIndex={0}
        ref={ref}
        className={styles.canvas}
        onClick={handleMouseEvent}
        // TODO eslint error?
        onKeyDown={() => null}
        role="button"
      >
        <Image image={image} />
        <Svg hotspots={hotspots} handleCircleClick={handleCircleClick} />
      </div>
    </div>
  );
};

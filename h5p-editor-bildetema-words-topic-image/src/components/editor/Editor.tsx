import React from "react";
import type { Image as ImageType } from "h5p-types";
import { Word } from "../../../../common/types/types";
import { Image } from "../Image/Image";
import { Svg } from "../Svg/Svg";
import type { Hotspot } from "../Svg/Svg";
import styles from "./Editor.module.scss";

export type EditorProps = {
  image: ImageType | undefined;
  words: Word[];
};
export const Editor: React.FC<EditorProps> = ({ image, words }) => {
  const ref = React.useRef(null);
  const [hotspots, setHotspots] = React.useState<Hotspot[]>([]);

  React.useEffect(() => {
    setHotspots(words.map(word => ({ points: [], drawing: false, word })));
  }, [words]);

  const handleMouseEvent = (e: React.MouseEvent<HTMLElement>): void => {
    const rect = ref?.current?.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;
    const { width, height } = rect;
    const point = {
      // x: ((e.clientX - offsetX)),
      x: ((e.clientX - offsetX) / width) * 100,
      // y: ((e.clientY - offsetY))
      y: ((e.clientY - offsetY) / height) * 100,
    };

    setHotspots(prev => {
      prev.find(hotspot => hotspot.drawing)?.points.push(point);
      return [...prev];
    });
  };

  const handleWordSelected = (e: React.MouseEvent<HTMLElement>): void => {
    setHotspots(prev =>
      prev.map(hotspot => {
        if (e.target.id === hotspot.word.id) {
          return { ...hotspot, drawing: true };
        }
        return { ...hotspot, drawing: false };
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

  return (
    <div className={styles.editor}>
      <div className={styles.controls}>
        {words.map(word => (
          <button
            key={word.id}
            id={word.id}
            type="button"
            onClick={handleWordSelected}
          >
            {" "}
            {word.label}
          </button>
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
        onKeyDown={() => {
          console.log("first");
        }}
        role="button"
      >
        <Image image={image} />
        <Svg hotspots={hotspots} />
      </div>
    </div>
  );
};

import type { Image as ImageType } from "h5p-types";
import React from "react";
import { Word } from "../../../../common/types/types";
import { SetValueContext } from "../../contexts/SetValueContext";
import { t } from "../../h5p/H5P.util";
import { Hotspot } from "../../types/Hotspot";
import { HotspotUpdate } from "../../types/HotspotUpdate";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { calculatePoint, getDelta } from "../../utils/figure/figure.utils";
import {
  activateDrawingHotspot,
  finishDrawingHotspot,
  movePoint,
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
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const setValue = React.useContext(SetValueContext);

  const [selectedWord, setSelectedWord] = React.useState<string | null>(null);
  const [hotspots, setHotspots] = React.useState(initialHotspots);
  const aspectRatio = (image?.width ?? 1) / (image?.height ?? 1);

  React.useEffect(() => {
    const newHotspots = words.map(word => ({
      points:
        initialHotspots.find(hotspot => hotspot.word.id === word.id)?.points ??
        [],
      isDrawingThisPolygon: false,
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
    if (!canvasRef?.current) {
      return;
    }

    // TODO: Fix performance by caching canvas' bounding box. Must be updated when scrolling/zooming
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;
    const { width, height } = rect;
    const point = {
      x: ((clientX - offsetX) / width) * 100,
      y: (((clientY - offsetY) / height) * 100) / aspectRatio,
    };

    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon) {
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

  const handleWordSelected = (wordId: string): void => {
    setSelectedWord(wordId);

    const updatedHotspots = hotspots.map(hotspot =>
      activateDrawingHotspot(hotspot, wordId),
    );

    setHotspots(updatedHotspots);
  };

  const handleFinishedPressed = (): void => {
    setSelectedWord(null);

    const updatedHotspots = hotspots.map(finishDrawingHotspot);
    setHotspots(updatedHotspots);
  };

  const handleReset = (): void => {
    const updatedHotspots = hotspots.map(resetPointsOfActiveHotspot);

    setHotspots(updatedHotspots);
  };

  const handleFigureDrag = (
    figureDrag: HotspotUpdate,
    newPosition: Point,
  ): void => {
    if (!canvasRef.current) {
      return;
    }

    // TODO: Fix performance by caching canvas' bounding box. Must be updated when scrolling/zooming
    const rect = canvasRef.current.getBoundingClientRect();

    const startPoint = calculatePoint(figureDrag.from, rect, aspectRatio);
    const currentPoint = calculatePoint(newPosition, rect, aspectRatio);

    const motionDelta = getDelta(startPoint, currentPoint);

    const movedPoints = figureDrag.hotspot.points?.map(point =>
      getDelta(point, motionDelta),
    );

    setHotspots([
      ...hotspots.slice(0, figureDrag.hotspotIndex),
      {
        ...hotspots[figureDrag.hotspotIndex],
        isDrawingThisPolygon: false,
        points: movedPoints,
      },
      ...hotspots.slice(figureDrag.hotspotIndex + 1),
    ]);
  };

  const handleCircleDrag = (pointUpdate: PointUpdate): Point => {
    if (!canvasRef.current) {
      return pointUpdate.from;
    }

    // TODO: fix performance
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;
    const { width, height } = rect;

    const toPoint = {
      x: ((pointUpdate.to.x - offsetX) / width) * 100,
      y: (((pointUpdate.to.y - offsetY) / height) * 100) / aspectRatio,
    };
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon || !hotspot.points) {
        return hotspot;
      }

      return {
        ...hotspot,
        points: movePoint(pointUpdate.from.index, toPoint, hotspot.points),
      };
    });

    setHotspots(updatedHotspots);
    return toPoint;
  };

  const handleCircleClick = (point: Point): void => {
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon || !hotspot.points) {
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
        setSelectedWord(null);
        return { ...hotspot, isDrawingThisPolygon: false };
      }

      // If a point other than the start point was clicked, remove it
      return {
        ...hotspot,
        points: removePoint(point, hotspot?.points),
      };
    });

    setHotspots(updatedHotspots);
  };

  const getSelectedWordLabel = (wordId: string): string => {
    return hotspots.filter(hotspot => hotspot.word.id === wordId)[0].word.label;
  };

  const editorLabel = t("editorLabel");
  const editorDescription = t("editorDescription");
  const finishedButtonLabel = t("finishedButtonLabel");
  const resetButtonLabel = t("resetButtonLabel");
  const selectWordLabel = t("selectWordLabel");
  const selectedWordLabel = t("selectedWordLabel");

  return (
    <div className={styles.editor} data-test-id="editor">
      <span className={styles.editor_label}>{editorLabel}</span>
      <span className={styles.editor_description}>{editorDescription}</span>
      <div className={styles.toolbar}>
        {selectedWord
          ? `${selectedWordLabel}: ${getSelectedWordLabel(selectedWord)}`
          : selectWordLabel}
        {selectedWord && (
          <div className={styles.toolbar_buttons}>
            <button type="button" onClick={handleFinishedPressed}>
              {finishedButtonLabel}
            </button>
            <button type="button" onClick={handleReset}>
              {resetButtonLabel}
            </button>
          </div>
        )}
      </div>
      <div className={styles.editor_content}>
        <div>
          <div className={styles.controls}>
            {hotspots.map(
              ({ word: { label, id }, isDrawingThisPolygon, points }) => (
                <Button
                  key={id}
                  isActive={isDrawingThisPolygon}
                  isFinished={!!points?.length}
                  label={label}
                  id={id}
                  clickHandler={() => handleWordSelected(id)}
                />
              ),
            )}
          </div>
        </div>
        <div
          tabIndex={0}
          ref={canvasRef}
          className={styles.canvas}
          onClick={handleClick}
          onKeyDown={() => null}
          role="button"
        >
          <Image image={image} />
          <Svg
            hotspots={hotspots}
            handleCircleClick={handleCircleClick}
            handleCircleDrag={handleCircleDrag}
            handleFigureClick={hotspotId => handleWordSelected(hotspotId)}
            handleFigureDrag={handleFigureDrag}
            aspectRatio={aspectRatio}
          />
        </div>
      </div>
    </div>
  );
};

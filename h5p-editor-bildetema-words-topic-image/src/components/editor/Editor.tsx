import type { Image as ImageType } from "h5p-types";
import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Word } from "../../../../common/types/types";
import { SetValueContext } from "../../contexts/SetValueContext";
import { t } from "../../h5p/H5P.util";
import { Hotspot } from "../../types/Hotspot";
import { Color } from "../../../../common/enums/Color";
import { ColorButton } from "../ColorButton/ColorButton";
import { HotspotUpdate } from "../../types/HotspotUpdate";
import { Point } from "../../types/Point";
import { PointUpdate } from "../../types/PointUpdate";
import { PointWithIndex } from "../../types/PointWithIndex";
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

enum Click {
  SINGLE,
  DOUBLE,
}

const colors = Object.values(Color);

export const Editor: FC<EditorProps> = ({ image, words, initialHotspots }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const setValue = useContext(SetValueContext);

  const timer = useRef<NodeJS.Timeout>();
  const click = useRef<Click>(Click.SINGLE);

  const [selectedWordId, setSelectedWord] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [isDraggingEllipsePoint, setIsDraggingEllipsePoint] = useState(false);

  const aspectRatio = (image?.width ?? 1) / (image?.height ?? 1);

  useEffect(() => {
    const newHotspots: Array<Hotspot> = [];

    initialHotspots.forEach(hotspot => {
      const hotspotIsInWordsArray = words.find(
        word => hotspot.word.id === word.id,
      );
      if (hotspotIsInWordsArray) newHotspots.push(hotspot);
    });

    const addMissingHotspots = (): void => {
      words.forEach(word => {
        const hotspotExists = !!newHotspots.find(
          hotspot => hotspot.word.id === word.id,
        );

        if (hotspotExists) return;

        newHotspots.push({
          points: [],
          isDrawingThisPolygon: false,
          word,
          rotation: 0,
          color: Color.ORANGE,
        });
      });
    };
    addMissingHotspots();

    setHotspots(newHotspots);
  }, [initialHotspots, words]);

  // Update h5p-value
  useEffect(() => {
    setValue(hotspots);
  }, [hotspots, setValue]);

  const selectedHotspot = useMemo(
    () => hotspots.find(hotspot => hotspot.word.id === selectedWordId),
    [hotspots, selectedWordId],
  );

  const handleClick = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLElement>): void => {
    if (!canvasRef?.current || !selectedHotspot || isDraggingEllipsePoint) {
      return;
    }

    // TODO: Fix performance by caching canvas' bounding box. Must be updated when scrolling/zooming
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;
    const { width, height } = rect;
    const point: PointWithIndex = {
      x: ((clientX - offsetX) / width) * 100,
      y: (((clientY - offsetY) / height) * 100) / aspectRatio,
      index: selectedHotspot.points?.length ?? 0,
    };

    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon) {
        return hotspot;
      }

      const points = hotspot.points ? [...hotspot.points, point] : [point];
      const isEllipse = points.length === 2;

      let { rotation } = hotspot;
      if (isEllipse) {
        const radiusPointDelta = getDelta(points[0], points[1]);
        rotation = Math.atan2(radiusPointDelta.y, radiusPointDelta.x);
      }

      return {
        ...hotspot,
        points,
        rotation,
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

  const handleShapeDrag = (
    figureDrag: HotspotUpdate,
    newPosition: Point,
  ): void => {
    if (!canvasRef.current) {
      return;
    }

    // TODO: Fix performance by caching canvas' bounding box. Must be updated when scrolling/zooming
    const rect = canvasRef.current.getBoundingClientRect();
    setSelectedWord(null);

    const startPoint = calculatePoint(figureDrag.from, rect, aspectRatio);
    const currentPoint = calculatePoint(newPosition, rect, aspectRatio);

    const motionDelta = getDelta(startPoint, currentPoint);

    const movedPoints: Array<PointWithIndex> | undefined =
      figureDrag.hotspot.points?.map(point => ({
        ...point,
        ...getDelta(point, motionDelta),
      }));

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

  const handlePointDrag = (pointUpdate: PointUpdate): Point => {
    if (!canvasRef.current) {
      return pointUpdate.from;
    }

    // TODO: fix performance
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;
    const { width, height } = rect;

    const { index } = pointUpdate.from;

    const toPoint: PointWithIndex = {
      index,
      x: ((pointUpdate.to.x - offsetX) / width) * 100,
      y: (((pointUpdate.to.y - offsetY) / height) * 100) / aspectRatio,
    };
    const updatedHotspots: Array<Hotspot> = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon || !hotspot.points) {
        return hotspot;
      }

      return {
        ...hotspot,
        points: movePoint(index, toPoint, hotspot.points),
      };
    });

    setHotspots(updatedHotspots);
    return toPoint;
  };

  const handlePointClick = (point: PointWithIndex): void => {
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon || !hotspot.points) {
        return hotspot;
      }

      const { index } = point;

      const clickedOnStartPoint = index === 0;
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

  useEffect(() => {
    const stopDraggingEllipsePoint = (): void => {
      requestAnimationFrame(() => setIsDraggingEllipsePoint(false));
    };

    window.addEventListener("mouseup", stopDraggingEllipsePoint);
    return () =>
      window.removeEventListener("mouseup", stopDraggingEllipsePoint);
  }, []);

  const setHotspotColor = (color: Color): void => {
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon) return hotspot;

      return { ...hotspot, color };
    });

    setHotspots(updatedHotspots);
  };

  const moveHotspotTop = (): void => {
    if (!selectedHotspot) return;
    const newHotspots = hotspots.filter(
      hotspot => hotspot.word.id !== selectedHotspot.word.id,
    );
    newHotspots.unshift(selectedHotspot);
    setHotspots(newHotspots);
  };

  const moveHotspotBottom = (): void => {
    if (!selectedHotspot) return;
    const newHotspots = hotspots.filter(
      hotspot => hotspot.word.id !== selectedHotspot.word.id,
    );
    newHotspots.push(selectedHotspot);
    setHotspots(newHotspots);
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
        {selectedWordId
          ? `${selectedWordLabel}: ${getSelectedWordLabel(selectedWordId)}`
          : selectWordLabel}
        {selectedWordId && (
          <div className={styles.toolbar_buttons}>
            {colors.map(color => (
              <ColorButton
                key={color}
                color={color}
                handleClick={setHotspotColor}
                selected={selectedHotspot?.color === color}
              />
            ))}
            <button
              className={styles.button}
              type="button"
              onClick={handleFinishedPressed}
            >
              {finishedButtonLabel}
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={handleReset}
            >
              {resetButtonLabel}
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={moveHotspotTop}
            >
              Move top
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={moveHotspotBottom}
            >
              Move bottom
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
          onClick={e => {
            timer.current = setTimeout(() => {
              if (click.current === Click.DOUBLE) {
                click.current = Click.SINGLE;
                return;
              }
              handleClick(e);
            }, 200);
          }}
          onDoubleClick={() => {
            click.current = Click.DOUBLE;
            clearTimeout(timer.current);
          }}
          onKeyDown={() => null}
          role="button"
        >
          <Image image={image} />
          <Svg
            hotspots={hotspots}
            setHotspots={setHotspots}
            handlePointClick={handlePointClick}
            handlePointDrag={handlePointDrag}
            handleShapeClick={hotspotId => handleWordSelected(hotspotId)}
            handleShapeDrag={handleShapeDrag}
            aspectRatio={aspectRatio}
            canvasRef={canvasRef}
            isDraggingEllipsePoint={isDraggingEllipsePoint}
            setIsDraggingEllipsePoint={setIsDraggingEllipsePoint}
          />
        </div>
      </div>
    </div>
  );
};

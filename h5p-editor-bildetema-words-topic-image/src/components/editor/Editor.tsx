import { Color } from "common/enums/Color";
import { Word } from "common/types/types";
import type { H5PImage } from "h5p-types";
import {
  FC,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { extractWordLabel } from "common/utils/word.utils";
import { SetValueContext } from "../../contexts/SetValueContext";
import { t } from "../../h5p/H5P.util";
import { Hotspot } from "../../types/Hotspot";
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
import { ColorButton } from "../ColorButton/ColorButton";
import { ArrowIcon } from "../Icons/Icons";
import { Image } from "../Image/Image";
import { Svg } from "../Svg/Svg";
import styles from "./Editor.module.scss";

export type EditorProps = {
  image: H5PImage | undefined;
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

  const timer = useRef<NodeJS.Timeout>(null);
  const click = useRef<Click>(Click.SINGLE);

  const [selectedWordId, setSelectedWord] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [isDraggingEllipsePoint, setIsDraggingEllipsePoint] = useState(false);
  const [copiedHotspot, setCopiedHotspot] = useState<Hotspot>();
  const [hideHotspotsWhileDrawing, sethideHotspotsWhileDrawing] =
    useState(false);

  const aspectRatio = (image?.width ?? 1) / (image?.height ?? 1);

  useEffect(() => {
    const newHotspots: Array<Hotspot> = [];

    initialHotspots.forEach(hotspot => {
      const hotspotWordFromWordsArray = words.find(
        word => hotspot.word.id === word.id,
      );
      if (hotspotWordFromWordsArray) {
        const updatedHotspot = {
          ...hotspot,
          word: hotspotWordFromWordsArray,
        };
        newHotspots.push(updatedHotspot);
      }
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

  const handleClick = ({ clientX, clientY }: MouseEvent<HTMLElement>): void => {
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
    const hotspotIndex = hotspots.findIndex(
      hotspot => hotspot.word.id === figureDrag.hotspot.word.id,
    );

    setHotspots([
      ...hotspots.slice(0, hotspotIndex),
      {
        ...hotspots[hotspotIndex],
        isDrawingThisPolygon: false,
        points: movedPoints,
      },
      ...hotspots.slice(hotspotIndex + 1),
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
    const hotspot = hotspots.find(el => el.word.id === wordId);
    if (!hotspot) return "";
    return extractWordLabel(hotspot.word, false);
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

  const moveHotspotUp = (): void => {
    if (!selectedHotspot) return;
    const hotspotIndex = hotspots.findIndex(
      hotspot => hotspot.word.id === selectedHotspot.word.id,
    );
    if (hotspotIndex === 0 || hotspotIndex === -1) return;
    [hotspots[hotspotIndex], hotspots[hotspotIndex - 1]] = [
      hotspots[hotspotIndex - 1],
      hotspots[hotspotIndex],
    ];
    setHotspots([...hotspots]);
  };

  const moveHotspotDown = (): void => {
    if (!selectedHotspot) return;
    const hotspotIndex = hotspots.findIndex(
      hotspot => hotspot.word.id === selectedHotspot.word.id,
    );
    if (hotspotIndex === hotspots.length - 1 || hotspotIndex === -1) return;
    [hotspots[hotspotIndex], hotspots[hotspotIndex + 1]] = [
      hotspots[hotspotIndex + 1],
      hotspots[hotspotIndex],
    ];
    setHotspots([...hotspots]);
  };

  const handleCopy = (): void => {
    if (!selectedHotspot?.points) return;
    const cPoints = selectedHotspot.points.map(point => ({
      x: point.x + 5,
      y: point.y + 5,
      index: point.index,
    }));
    setCopiedHotspot({ ...selectedHotspot, points: cPoints });
    handleFinishedPressed();
  };

  const handlePaste = (): void => {
    if (!copiedHotspot) return;
    const updatedHotspots = hotspots.map(hotspot => {
      if (!hotspot.isDrawingThisPolygon) return hotspot;
      return { ...copiedHotspot, word: hotspot.word };
    });
    setHotspots(updatedHotspots);
  };

  const editorLabel = t("editorLabel");
  const editorDescription = t("editorDescription");
  const finishedButtonLabel = t("finishedButtonLabel");
  const resetButtonLabel = t("resetButtonLabel");
  const selectWordLabel = t("selectWordLabel");
  const selectedWordLabel = t("selectedWordLabel");

  const copy = !!selectedHotspot?.points?.length;
  const paste = !copy && !!copiedHotspot;

  return (
    <div className={styles.editor} data-test-id="editor">
      <span className={styles.editor_label}>{editorLabel}</span>
      <span className={styles.editor_description}>{editorDescription}</span>

      <div className={styles.toolbar}>
        <div>
          {selectedWordId
            ? `${selectedWordLabel}: ${getSelectedWordLabel(selectedWordId)}`
            : selectWordLabel}
        </div>
        <div>
          {selectedWordId && (
            <div className={styles.wrapper}>
              <div className={styles.toolbar_buttons}>
                {colors.map(color => (
                  <ColorButton
                    key={color}
                    color={color}
                    handleClick={setHotspotColor}
                    selected={selectedHotspot?.color === color}
                  />
                ))}
              </div>
              <div className={styles.toolbar_buttons}>
                {copy && (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
                )}
                {paste && (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handlePaste}
                  >
                    Paste
                  </button>
                )}
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
                  onClick={moveHotspotUp}
                  aria-label="Move up"
                >
                  <ArrowIcon
                    transform="scale(0.9) rotate(180)"
                    transformOrigin="50% 50%"
                  />
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={moveHotspotDown}
                  aria-label="Move down"
                >
                  <ArrowIcon transform="scale(0.9)" transformOrigin="50% 50%" />
                </button>

                <button
                  className={`${styles.button} ${hideHotspotsWhileDrawing ? styles.active : ""
                    }`}
                  type="button"
                  onClick={() => sethideHotspotsWhileDrawing(prev => !prev)}
                >
                  Hide shapes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.editor_content}>
        <div>
          <div className={styles.controls}>
            {hotspots.map(({ word, isDrawingThisPolygon, points }) => {
              return (
                <Button
                  key={word.id}
                  isActive={isDrawingThisPolygon}
                  isFinished={!!points?.length}
                  label={extractWordLabel(word, false)}
                  id={word.id}
                  clickHandler={() => handleWordSelected(word.id)}
                />
              );
            })}
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
            if (timer.current) {
              clearTimeout(timer.current);
            }
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
            canvasRef={canvasRef as React.RefObject<HTMLDivElement>}
            isDraggingEllipsePoint={isDraggingEllipsePoint}
            setIsDraggingEllipsePoint={setIsDraggingEllipsePoint}
            hideHotspotsWhileDrawing={hideHotspotsWhileDrawing}
          />
        </div>
      </div>
    </div>
  );
};

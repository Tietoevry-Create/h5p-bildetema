import { Word } from "common/types/types";
import { FC, useEffect, useState } from "react";
import { TopicImageContainer } from "./components/TopicImageContainer/TopicImageContainer";
import { Params } from "./h5p/H5PWrapper";
import { OverlayType } from "./types/OverlayType";
import { renderFigure } from "./utils/figure/figure.utils";

export type AppProps = {
  params: Params;
  imagePath: string;
  aspectRatio: number;
  showWrittenWords: boolean;
  showArticles: boolean;
};

export const App: FC<AppProps> = ({
  params,
  imagePath,
  aspectRatio,
  showWrittenWords,
  showArticles,
}) => {
  const [overlays, setOverlays] = useState<Array<OverlayType>>([]);
  const [words, setWords] = useState<Array<Word>>([]);

  useEffect(() => {
    const paramHotspots = params.hotspots;

    const filteredHotspots = paramHotspots.filter(
      hotspot => hotspot != null && hotspot.points?.length > 0,
    );
    const computedWords = filteredHotspots.map(hotspot => hotspot.word);

    const computedOverlays = filteredHotspots.map(
      ({ word, points, rotation, ellipseRadius, color }) => ({
        wordId: word.id,
        outline: renderFigure(points, rotation, ellipseRadius),
        color,
      }),
    );

    setWords(computedWords);
    setOverlays(computedOverlays);
  }, [params]);
  return (
    <TopicImageContainer
      topicImage={imagePath}
      aspectRatio={aspectRatio}
      topicImageType="nonVectorImageWithHotspots"
      topicOverlays={overlays}
      words={words}
      showWrittenWords={showWrittenWords}
      showArticles={showArticles}
    />
  );
};

import { useQuery } from "@tanstack/react-query";
import { Topic, Word } from "common/types/types";
import { getData } from "common/utils/data.utils";
import { FC, useCallback, useEffect, useState } from "react";
import { TopicImageContainer } from "./components/TopicImageContainer/TopicImageContainer";
import { Params } from "./h5p/H5PWrapper";
import { useL10n } from "./hooks/useL10n";
import { OverlayType } from "./types/OverlayType";
import { renderFigure } from "./utils/figure/figure.utils";

export type AppProps = {
  params: Params;
  imagePath: string;
  aspectRatio: number;
  backendUrl: string;
  showWrittenWords: boolean;
  showArticles: boolean;
};

// const hasValue = <T,>(obj: T | null | undefined): obj is T => !!obj;

export const App: FC<AppProps> = ({
  params,
  imagePath,
  aspectRatio,
  backendUrl,
  showWrittenWords,
  showArticles,
}) => {
  // const [topic, setTopic] = useState<Topic | undefined>();
  const [overlays, setOverlays] = useState<Array<OverlayType>>([]);
  const [words, setWords] = useState<Array<Word>>([]);
  // const [currentLanguageWords, setCurrentLanguageWords] = useState<Array<Word>>(
  //   [],
  // );
  // const [showNoTopicsSelectedText, setShowNoTopicsSelectedText] =
  //   useState(false);

  // const noTopicSelectedText = useL10n("noTopicSelected");

  // const setComputedWords = useCallback(
  //   (words: Word[] | undefined): void => {
  //     const paramHotspots = params.hotspots;

  //     const computedWords = paramHotspots
  //       .filter(hotspot => hotspot && hotspot.points?.length > 0)
  //       .map(hotspot => hotspot.word.id)
  //       .map(wordId => words?.find(word => word.id === wordId))
  //       .filter(hasValue);

  //     setCurrentLanguageWords(computedWords ?? []);
  //   },
  //   [params.hotspots],
  // );

  // const { isLoading: isLoadingData } = useQuery(
  //   ["topicsFromDB"],
  //   () => getData(backendUrl),
  //   {
  //     onSuccess({ topics: fetchedTopics }) {
  //       const rootTopic = fetchedTopics?.find(
  //         t => t.id === params.selectedTopic.topicId,
  //       );

  //       const subTopic = rootTopic?.subTopics.find(
  //         s => s.id === params.selectedTopic.subTopicId,
  //       );

  //       if (subTopic) {
  //         setTopic(subTopic);
  //       } else {
  //         setTopic(rootTopic);
  //       }
  //     },
  //   },
  // );

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!topic) {
  //       setShowNoTopicsSelectedText(true);
  //     }
  //   }, 1000);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (!topic) {
  //     return;
  //   }

  //   if (params.currentLanguage) {
  //     const languageCode = params.currentLanguage;
  //     const topicWords = topic.words.get(languageCode);
  //     // Only show words that have hotspots
  //     setComputedWords(topicWords);
  //   } else {
  //     // TODO: Add language selector to `h5p-bildetema-words-topic-image`

  //     const fallbackLanguage = "nob";
  //     const fallbackWords = topic.words.get(fallbackLanguage);
  //     // Only show words that have hotspots
  //     setComputedWords(fallbackWords);
  //   }
  // }, [params.currentLanguage, setComputedWords, topic]);
  // useEffect(() => {
  //   const paramHotspots = params.hotspots;
  //   const paramWords = paramHotspots.map(hotspot => hotspot.word)
  //   setWords(paramWords)
  // },[params.hotspots])

  useEffect(() => {
    const paramHotspots = params.hotspots;

    const filteredHotspots = paramHotspots.filter(hotspot => hotspot != null && hotspot.points?.length > 0)
    const computedWords = filteredHotspots.map(hotspot => hotspot.word)

    const computedOverlays = filteredHotspots.map(({ word, points, rotation, ellipseRadius, color }) => ({
      wordId: word.id,
      outline: renderFigure(points, rotation, ellipseRadius),
      color,
    }));
    
    setWords(computedWords)
    setOverlays(computedOverlays);
  }, [params]);
  return  <TopicImageContainer
      topicImage={imagePath}
      aspectRatio={aspectRatio}
      topicImageType="nonVectorImageWithHotspots"
      topicOverlays={overlays}
      // words={currentLanguageWords}
      words={words}
      showWrittenWords={showWrittenWords}
      showArticles={showArticles}
    />
  
    // <div>hi</div>
};

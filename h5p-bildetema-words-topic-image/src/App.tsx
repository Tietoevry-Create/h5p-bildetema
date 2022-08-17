import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Topic, Word } from "../../common/types/types";
import { getTopics } from "../../common/utils/data.utils";
import { makeLanguageCode } from "../../common/utils/LanguageCode.utils";
import { TopicImageContainer } from "./components/TopicImageContainer/TopicImageContainer";
import { Params } from "./h5p/H5PWrapper";
import { useL10n } from "./hooks/useL10n";
import { OverlayType } from "./types/OverlayType";
import { renderFigure } from "./utils/figure/figure.utils";

export type AppProps = {
  params: Params;
  imagePath: string;
  aspectRatio: number;
};

const hasValue = <T,>(obj: T | null | undefined): obj is T => !!obj;

export const App: FC<AppProps> = ({ params, imagePath, aspectRatio }) => {
  const [topic, setTopic] = useState<Topic | undefined>();
  const [overlays, setOverlays] = useState<Array<OverlayType>>([]);
  const [currentLanguageWords, setCurrentLanguageWords] = useState<Array<Word>>(
    [],
  );

  const noTopicSelectedText = useL10n("noTopicSelected");

  useQuery(["topicsFromDB"], getTopics, {
    onSuccess(fetchedTopics) {
      const rootTopic = fetchedTopics?.find(
        t => t.id === params.selectedTopic.topicId,
      );

      const subTopic = rootTopic?.subTopics.get(
        params.selectedTopic.subTopicId,
      );

      if (subTopic) {
        setTopic(subTopic);
      } else {
        setTopic(rootTopic);
      }
    },
  });

  useEffect(() => {
    if (!topic) {
      return;
    }

    if (params.currentLanguage) {
      const languageCode = makeLanguageCode(params.currentLanguage);
      setCurrentLanguageWords(topic.words.get(languageCode) ?? []);
    } else {
      // TODO: Add language selector to `h5p-bildetema-words-topic-image`

      const fallbackLanguage = makeLanguageCode("nob");
      setCurrentLanguageWords(topic.words.get(fallbackLanguage) ?? []);
    }
  }, [params.currentLanguage, topic]);

  useEffect(() => {
    const paramHotspots = params.hotspots;

    const computedOverlays = paramHotspots
      .filter(hotspot => hotspot != null && hotspot.points?.length > 0)
      .map(({ word, points }) => ({
        wordId: word.id,
        outline: renderFigure(points),
      }));

    setOverlays(computedOverlays);

    const computedWords = paramHotspots
      .filter(hotspot => hotspot && hotspot.points?.length > 0)
      .map(hotspot => hotspot.word.id)
      .map(wordId => currentLanguageWords.find(word => word.id === wordId))
      .filter(hasValue);

    setCurrentLanguageWords(computedWords);

    // This effect should not depend on `words`, because it's set inside the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return topic ? (
    <TopicImageContainer
      topicImage={imagePath}
      aspectRatio={aspectRatio}
      topicImageType="nonVectorImageWithHotspots"
      topicOverlays={overlays}
      words={currentLanguageWords}
    />
  ) : (
    <p>{noTopicSelectedText}</p>
  );
};

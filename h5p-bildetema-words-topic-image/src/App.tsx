import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Topic, Word } from "../../common/types/types";
import { getTopics } from "../../common/utils/data.utils";
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

export const App: React.FC<AppProps> = ({ params, imagePath, aspectRatio }) => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topic, setTopic] = React.useState<Topic | undefined>();
  const [overlays, setOverlays] = React.useState<Array<OverlayType>>([]);
  const [words, setWords] = React.useState<Array<Word>>([]);

  const noTopicSelectedText = useL10n("noTopicSelected");

  useQuery(["topicsFromDB"], getTopics, {
    onSuccess(fetchedTopics) {
      setTopics(fetchedTopics);
    },
  });

  React.useEffect(() => {
    const rootTopic = topics?.find(t => t.id === params.selectedTopic.topicId);
    const subTopic = rootTopic?.subTopics.get(params.selectedTopic.subTopicId);

    if (subTopic) {
      setTopic(subTopic);
    } else {
      setTopic(rootTopic);
    }
  }, [params, topics]);

  React.useEffect(() => {
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
      .map(wordId => words.find(word => word.id === wordId))
      .filter(hasValue);

    setWords(computedWords);

    // This effect should not depend on `words`, because it's set inside the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return topic ? (
    <TopicImageContainer
      topic={topic}
      topicImage={imagePath}
      aspectRatio={aspectRatio}
      topicImageType="nonVectorImageWithHotspots"
      topicOverlays={overlays}
      words={words}
    />
  ) : (
    <p>{noTopicSelectedText}</p>
  );
};

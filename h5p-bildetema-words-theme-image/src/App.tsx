import * as React from "react";
import { useQuery } from "react-query";
import { getTopics } from "../../common/utils/data.utils";
import { ThemeImageContainer } from "./components/ThemeImageContainer/ThemeImageContainer";
import { Topic, Word } from "../../common/types/types";
import { OverlayType } from "./types/OverlayType";
import { Params } from "./h5p/H5PWrapper";

export type AppProps = {
  params: Params;
  imagePath: string;
};

const hasValue = <T,>(obj: T | null | undefined): obj is T => !!obj;

export const App: React.FC<AppProps> = ({ params, imagePath }) => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topic, setTopic] = React.useState<Topic | undefined>();
  const [overlays, setOverlays] = React.useState<Array<OverlayType>>([]);
  const [words, setWords] = React.useState<Array<Word>>([]);

  // TODO: Translate
  const noTopicSelectedText = "No topic selected."; // useL10n(...);

  useQuery("topicsFromDB", getTopics, {
    onSuccess(fetchedTopics) {
      setTopics(fetchedTopics);
    },
  });

  React.useEffect(() => {
    const rootTopic = topics?.find(
      t => t.id === params["bildetema-words-topic-view"].selectedTopic.topic,
    );
    const subTopic = rootTopic?.subTopics.get(
      params["bildetema-words-topic-view"].selectedTopic.subTopic,
    );
    if (subTopic) {
      setTopic(subTopic);
    } else {
      setTopic(rootTopic);
    }
  }, [params, topics]);

  React.useEffect(() => {
    const paramHotspots = params["bildetema-words-topic-view"].hotspots;

    const computedOverlays = paramHotspots
      .filter(hotspot => hotspot != null && hotspot.points?.length > 0)
      .map(({ id, wordId, points }) => ({
        id,
        wordId,
        outline: `<polygon points="${points
          ?.map(point => `${point.x},${point.y}`)
          .join(" ")}" style="fill:lime;stroke:purple;stroke-width:1"/>`,
      }));

    setOverlays(computedOverlays);

    const computedWords = paramHotspots
      .filter(hotspot => hotspot && hotspot.points?.length > 0)
      .map(hotspot => hotspot.wordId)
      .map(wordId => words.find(word => word.id === wordId))
      .filter(hasValue);

    setWords(computedWords);
  }, [params, words]);

  return (
    <>
      {topic ? (
        <ThemeImageContainer
          topic={topic}
          themeImage={imagePath}
          themeImageType="nonVectorImageWithHotspots"
          themeOverlays={overlays}
          words={words}
        />
      ) : (
        <p>{noTopicSelectedText}</p>
      )}
      <h1> {JSON.stringify(params)}</h1>
    </>
  );
};

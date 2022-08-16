import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useH5PInstance } from "use-h5p";
import {
  Language,
  Topic,
  TopicGridSizes,
  TopicIds,
} from "../../../../common/types/types";
import { H5PWrapper } from "../../h5p/H5PWrapper";
import {
  findTopic,
  langIdToLanguage,
  validRoute,
} from "../../utils/router/router.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";

export type RouteControllerProps = {
  topicsFromDB?: Topic[];
  languagesFromDB?: Language[];
  showWrittenWords: boolean;
  setIsWordView: React.Dispatch<React.SetStateAction<boolean>>;
  setTopicIds: React.Dispatch<React.SetStateAction<TopicIds>>;
  topicsSize: TopicGridSizes;
  favLanguages: Language[];
  addFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const RouteController: React.FC<RouteControllerProps> = ({
  topicsFromDB,
  languagesFromDB,
  showWrittenWords,
  setIsWordView,
  topicsSize,
  setTopicIds,
  addFavoriteLanguage,
  favLanguages,
}) => {
  const h5pInstance = useH5PInstance<H5PWrapper>();
  const { langId, topicLabel, subTopicId } = useParams();
  const [currentTopicId, setCurrentTopicId] = useState<string>();
  const [currentSubTopicId, setCurrentSubTopicId] = useState<string>();

  const { words, topics, language, currentTopic } = useMemo(
    () =>
      validRoute(
        topicsFromDB,
        languagesFromDB,
        favLanguages,
        setTopicIds,
        langId,
        topicLabel,
        subTopicId,
        addFavoriteLanguage,
      ),
    [
      addFavoriteLanguage,
      favLanguages,
      langId,
      languagesFromDB,
      setTopicIds,
      subTopicId,
      topicLabel,
      topicsFromDB,
    ],
  );

  const currentLanguage = useMemo(() => {
    if (!langId || !languagesFromDB) {
      return undefined;
    }

    return langIdToLanguage(langId, languagesFromDB);
  }, [langId, languagesFromDB]);

  useEffect(() => {
    if (!topicsFromDB || !currentLanguage) {
      return;
    }

    const isFrontpage = !topicLabel;

    let newTopicId: string | undefined;
    let topicHasChanged = false;

    let newSubTopicId: string | undefined;
    let subTopicHasChanged = false;

    if (!isFrontpage) {
      const topic = findTopic(topicsFromDB, currentLanguage, topicLabel);
      newTopicId = topic?.id;

      topicHasChanged = newTopicId !== currentTopicId;

      const topicHasSubTopics = !!topic?.subTopics;
      const subTopicIsSetInUrl = !!subTopicId;

      if (topicHasSubTopics && subTopicIsSetInUrl) {
        const subTopics = Array.from(topic.subTopics.values());

        const subTopic = findTopic(subTopics, currentLanguage, subTopicId);
        newSubTopicId = subTopic?.id;
      }
    }

    subTopicHasChanged = newSubTopicId !== currentSubTopicId;

    if (isFrontpage || topicHasChanged || subTopicHasChanged) {
      h5pInstance?.getWrapper().scrollIntoView();
    }

    setCurrentTopicId(newTopicId);
    setCurrentSubTopicId(newSubTopicId);

    // Avoid depending on `currentTopicId` and `currentSubTopicId` as they are set by the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, h5pInstance, subTopicId, topicLabel, topics]);

  if ((words && language) || (topics && language)) {
    return (
      <TopicGrid
        topics={topics}
        words={words}
        topicsSize={topicsSize}
        currentLanguage={language}
        showWrittenWords={showWrittenWords}
        setIsWordView={setIsWordView}
        currentTopic={currentTopic}
      />
    );
  }

  return <div>Page does not exist</div>;
};

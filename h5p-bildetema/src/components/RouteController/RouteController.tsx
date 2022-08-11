import React from "react";
import { useParams } from "react-router-dom";
import { labelToUrlComponent } from "../../../../common/utils/string.utils";
import {
  Language,
  Topic,
  TopicGridSizes,
  Word,
  TopicIds,
} from "../../../../common/types/types";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";

export type RouteControllerProps = {
  topicsFromDB?: Topic[];
  languagesFromDB?: Language[];
  showWrittenWords: boolean;
  setIsWordView: React.Dispatch<React.SetStateAction<boolean>>;
  setTopicIds: React.Dispatch<React.SetStateAction<TopicIds>>;
  topicsSize: TopicGridSizes;
};

export type TopicsAndWords = {
  topics?: Topic[];
  words?: Word[];
  language?: Language;
  currentTopic?: TopicIds;
};

export const RouteController: React.FC<RouteControllerProps> = ({
  topicsFromDB,
  languagesFromDB,
  showWrittenWords,
  setIsWordView,
  topicsSize,
  setTopicIds,
}) => {
  const { langId, topicLabel, subTopicId } = useParams();

  const findTopic = (
    topics: Topic[],
    language: Language,
    topicValue: string,
  ): Topic | undefined => {
    const langCode = language.code;
    return topics?.find(el => {
      const word = el.labelTranslations.get(langCode);
      if (!word) return false;

      const { label, id } = word;
      if (label !== "") return labelToUrlComponent(label) === topicValue;

      return labelToUrlComponent(id) === topicValue;
    });
  };

  const validRoute = (): TopicsAndWords => {
    if (!topicsFromDB || !langId) return {};

    const langCode = makeLanguageCode(langId);
    const language = languagesFromDB?.find(el => el.code === langCode);
    if (!language) {
      setTopicIds({});
      return {};
    }

    if (!topicLabel) {
      setTopicIds({});
      return { topics: topicsFromDB, language };
    }

    const topic = findTopic(topicsFromDB, language, topicLabel);
    if (!topic) {
      setTopicIds({});
      return {};
    }

    const subTopics = Array.from(topic.subTopics.values());

    if (!subTopicId) {
      setTopicIds({ topicId: topic.id });

      if (subTopics.length) return { topics: subTopics, language };
      return { words: topic.words.get(language.code), language };
    }

    const subTopic = findTopic(subTopics, language, subTopicId);

    setTopicIds({ topicId: topic.id, subTopicId: subTopic?.id });
    return {
      words: subTopic?.words.get(language.code),
      language,
      currentTopic: { topicId: topic?.id, subTopicId: subTopic?.id },
    };
  };

  const handleRoute = (): JSX.Element => {
    const { words, topics, language, currentTopic } = validRoute();
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
  return handleRoute();
};

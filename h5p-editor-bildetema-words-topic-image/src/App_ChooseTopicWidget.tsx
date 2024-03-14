import { useQuery } from "@tanstack/react-query";
import { NewWord } from "common/types/types";
import {
  getMainTopics,
  getNewData,
  getNewWordsFromId,
  newWordsIsTopics,
} from "common/utils/data.utils";
import { FC, useEffect, useMemo, useState } from "react";
import { TopicChooser } from "./components/TopicChooser/TopicChooser";
import { Params as ChooseTopicWidgetParams } from "./h5p/ChooseTopicH5PWrapper";

export type Params = {
  setValue: (value: ChooseTopicWidgetParams) => void;
  backendUrl: string;
  topicId: string | undefined;
  subTopicId: string | undefined;
};

export const AppChooseTopicWidget: FC<Params> = ({
  setValue,
  backendUrl,
  topicId,
  subTopicId,
}) => {
  const { data } = useQuery(
    ["topicsFromDB", backendUrl],
    () => getNewData(backendUrl),
    {
      refetchOnWindowFocus: false,
    },
  );

  const [currentTopic, setCurrentTopic] = useState<NewWord | undefined>(
    undefined,
  );

  const [currentSubTopic, setCurrentSubTopic] = useState<NewWord | undefined>(
    undefined,
  );

  const topics = useMemo(() => {
    return getMainTopics(data?.idToWords, data?.idToContent);
  }, [data]);

  const subTopics = useMemo(() => {
    if (!currentTopic || !data) return undefined;
    const newCurrentSubTopics = getNewWordsFromId(
      currentTopic.id,
      data.idToWords,
      data.idToContent,
    );
    if (!(newCurrentSubTopics.length > 0)) return undefined;
    if (!newWordsIsTopics(newCurrentSubTopics)) return undefined;
    return newCurrentSubTopics;
  }, [currentTopic, data]);

  useEffect(() => {
    if (data && topicId) {
      const newCurrentTopic = data.idToWords.get(topicId);
      setCurrentTopic(newCurrentTopic);

      if (subTopicId) {
        const newCurrentSubTopic = data.idToWords.get(subTopicId);
        setCurrentSubTopic(newCurrentSubTopic);
      }
    }
  }, [topics, topicId, subTopicId, data]);

  useEffect(() => {
    if (currentTopic) {
      setValue({ topicId: currentTopic.id, subTopicId: currentSubTopic?.id });
    }
  }, [currentTopic, setValue, currentSubTopic]);

  const onTopicChange = (topic: NewWord): void => {
    setCurrentTopic(topic);
  };

  const onSubTopicChange = (subTopic: NewWord | undefined): void => {
    setCurrentSubTopic(subTopic);
  };

  return (
    <TopicChooser
      setCurrentTopic={onTopicChange}
      setCurrentSubTopic={onSubTopicChange}
      topic={currentTopic}
      subTopic={currentSubTopic}
      subTopics={subTopics}
      topics={topics}
    />
  );
};

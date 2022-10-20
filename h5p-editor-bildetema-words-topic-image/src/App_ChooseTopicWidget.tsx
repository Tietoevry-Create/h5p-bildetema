import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Topic } from "../../common/types/types";
import { getData } from "../../common/utils/data.utils";
import { TopicChooser } from "./components/TopicChooser/TopicChooser";
import { Params as ChooseTopicWidgetParams } from "./h5p/ChooseTopicH5PWrapper";

export type Params = {
  setValue: (value: ChooseTopicWidgetParams) => void;
  backendUrl: string;
  topicId: string | undefined;
  subTopicId: string | undefined;
};

export const AppChooseTopicWidget: React.FC<Params> = ({
  setValue,
  backendUrl,
  topicId,
  subTopicId,
}) => {
  const { data } = useQuery(["topicsFromDB", backendUrl], () =>
    getData(backendUrl),
  );
  const topics = data?.topics;

  const [currentTopic, setCurrentTopic] = React.useState<Topic | undefined>(
    undefined,
  );
  const [currentSubTopic, setCurrentSubTopic] = React.useState<
    Topic | undefined
  >(undefined);

  React.useEffect(() => {
    if (topics && topicId) {
      const newCurrentTopic = topics.find(topic => topic.id === topicId);
      setCurrentTopic(newCurrentTopic);

      if (subTopicId) {
        setCurrentSubTopic(
          newCurrentTopic?.subTopics.find(s => s.id === subTopicId),
        );
      }
    }
  }, [topics, topicId, subTopicId]);

  React.useEffect(() => {
    if (currentTopic) {
      setValue({ topicId: currentTopic.id, subTopicId: currentSubTopic?.id });
    }
  }, [currentTopic, setValue, currentSubTopic]);

  const onTopicChange = (topic: Topic): void => {
    setCurrentTopic(topic);
  };

  return (
    <TopicChooser
      setCurrentTopic={onTopicChange}
      setCurrentSubTopic={setCurrentSubTopic}
      topic={currentTopic}
      subTopic={currentSubTopic}
      items={topics}
    />
  );
};

import { useQuery } from "react-query";
import * as React from "react";
import { Language, Topic } from "../../common/types/types";
import { TopicChooser } from "./components/TopicChooser/TopicChooser";
import { makeLanguageCode } from "../../common/utils/LanguageCode.utils";
import { getTopics } from "../../common/utils/data.utils";

export type Params = {
  setValue: (value: { topic: string; subTopic: string | undefined }) => void;
  topicId: string | undefined;
  subTopicId: string | undefined;
};
// eslint-disable-next-line no-empty-pattern
export const AppChooseTopicWidget: React.FC<Params> = ({
  setValue,
  topicId,
  subTopicId,
}) => {
  const { data: topics } = useQuery("topicsFromDB", getTopics);

  const [currentTopic, setCurrentTopic] = React.useState<Topic | undefined>(
    undefined,
  );
  const [currentSubTopic, setCurrentSubTopic] = React.useState<
    Topic | undefined
  >(undefined);
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>({
    label: "Norsk bokmål",
    code: makeLanguageCode("nob"),
    rtl: false,
  });

  React.useEffect(() => {
    if (topics) {
      const newCurrentTopic = topics.find(topic => topic.id === topicId);
      setCurrentTopic(newCurrentTopic);
      if (subTopicId) {
        setCurrentSubTopic(newCurrentTopic?.subTopics.get(subTopicId));
      }
    }
  }, [topics, topicId, subTopicId, currentSubTopic]);

  React.useEffect(() => {
    if (currentTopic) {
      setValue({ topic: currentTopic.id, subTopic: currentSubTopic?.id });
    }
  }, [currentTopic, setValue, currentSubTopic]);

  const onTopicChange = (topic: Topic): void => {
    setCurrentTopic(topic);
  };

  return (
    <TopicChooser
      setCurrentTopic={onTopicChange}
      setCurrentSubTopic={setCurrentSubTopic}
      currentLanguage={currentLanguage}
      topic={currentTopic}
      subTopic={currentSubTopic}
      items={topics}
    />
  );
};

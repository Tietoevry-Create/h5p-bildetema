import * as React from "react";
import { useQuery } from "react-query";
import { Language, Topic } from "../../common/types/types";
import { getTopics } from "../../common/utils/data.utils";
import { makeLanguageCode } from "../../common/utils/LanguageCode.utils";
import { TopicChooser } from "./components/TopicChooser/TopicChooser";
import { Params as ChooseTopicWidgetParams } from "./h5p/ChooseTopicH5PWrapper";

export type Params = {
  setValue: (value: ChooseTopicWidgetParams) => void;
  topicId: string | undefined;
  subTopicId: string | undefined;
};

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
    if (topics && topicId) {
      const newCurrentTopic = topics.find(topic => topic.id === topicId);
      setCurrentTopic(newCurrentTopic);

      if (subTopicId) {
        setCurrentSubTopic(newCurrentTopic?.subTopics.get(subTopicId));
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
      currentLanguage={currentLanguage}
      topic={currentTopic}
      subTopic={currentSubTopic}
      items={topics}
    />
  );
};

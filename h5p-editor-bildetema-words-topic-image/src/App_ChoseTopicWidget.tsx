import type { Image } from "h5p-types";
import { H5PEditor } from "h5p-utils";
import { useQuery } from "react-query";
import * as React from "react";
import { Language, Topic } from "../../common/types/types";
import { Editor } from "./components/Editor/Editor";
import { TopicChooser } from "./components/TopicChooser/TopicChooser";
import { makeLanguageCode } from "../../common/utils/LanguageCode.utils";
import { getTopics } from "../../common/utils/data.utils";

export type Params = {
  setValue: (value: {topic: string; subTopic:string|undefined}) => void;
  topicId: string|undefined;
  subTopicId: string|undefined;
}
// eslint-disable-next-line no-empty-pattern
export const AppChooseTopicWidget: React.FC<Params> = ({setValue, topicId, subTopicId}) => {

  const { isLoading: isLoadingTopics, data: topics } = useQuery(
    "topicsFromDB",
    getTopics,
  );
  const [currentTopic, setCurrentTopic] = React.useState<Topic | undefined>(undefined);
  const [currentSubTopic, setCurrentSubTopic] = React.useState<Topic | undefined>(undefined);
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>({
    label: "Norsk bokmål",
    code: makeLanguageCode("nob"),
    rtl: false,
    isFavorite: true,
  });

  React.useEffect(() => {
    if(topics) {
      const newCurrentTopic = topics.find(topic => topic.id === topicId);
      setCurrentTopic(newCurrentTopic);
      if(subTopicId){
        console.info("looging for subtopic", subTopicId, "in", newCurrentTopic?.subTopics);
        setCurrentSubTopic(newCurrentTopic?.subTopics.get(subTopicId));
        console.info("found subtopic", currentSubTopic);
      }
    }
  }, [topics, topicId, subTopicId]);

  React.useEffect(() => {
    if(currentTopic){
      setValue({topic: currentTopic.id, subTopic: currentSubTopic?.id});
    }
  }, [currentTopic, setValue, currentSubTopic]);

  const onTopicChange = (topic: Topic):void => {
    console.info("onTopicChange", topic);
    setCurrentTopic(topic);
    // setValue({topic: topic.id, subTopic: undefined});
  }

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

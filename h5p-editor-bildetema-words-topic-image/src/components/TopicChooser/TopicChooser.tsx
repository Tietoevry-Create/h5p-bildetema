import  * as React from "react";
import {
  Language,
  Topic,
  TopicGridSizes,
  Word,
} from "../../../../common/types/types";
import styles from "./TopicChooser.module.scss";

type TopicChooserProps = {
  items?: Topic[];
  setCurrentTopic: (topic: Topic) => void;
  setCurrentSubTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  currentLanguage: Language;
  topic?: Topic;
  subTopic?: Topic;
};

export const TopicChooser: React.FC<TopicChooserProps> = ({
  items,
  setCurrentTopic,
  setCurrentSubTopic,
  topic,
  currentLanguage,
  subTopic,
}) => {
  // React.useEffect(() => {
  //   if(setCurrentTopic && setCurrentSubTopic){
  //     if(topic){
  //       setCurrentTopic(topic);
  //     }
  //     if(subTopic){
  //       setCurrentSubTopic(subTopic);
  //     }
  //   }
  // }, [
  //   topic,
  //   subTopic,
  //   setCurrentTopic,
  //   setCurrentSubTopic,
  // ]);

  const onTopicSelected = (event:any):void => {
    console.info("onTopicSelected", event);
      if(setCurrentTopic){
        const selectedTopic = items?.find(item => item.id === event.target.value);
        if(selectedTopic){
          setCurrentTopic(selectedTopic);
          setCurrentSubTopic(undefined);
        }
      }
    
  };

  const onSubTopicSelected = (event:any):void =>{
      if(setCurrentSubTopic){
        const selectedSubTopic = topic?.subTopics.get(event.target.value);
        if(selectedSubTopic){
          setCurrentSubTopic(selectedSubTopic);
        }
      }
  };


  if (items) {
    return (
      <div className={styles.topicChooser}>
        <div>{JSON.stringify(topic)}</div>
      <select
        className={styles.gridCompact}
        onChange={onTopicSelected}
      >
        <option value="" disabled selected={topic === undefined}>Please choose</option>
        {items?.map(item => {
          return (
            <option value={item.id} selected={item.id === topic?.id}>{item.label}</option>
          );
        })}
      </select>
      {topic && topic.subTopics && topic.subTopics.size > 0 && (
        <select
        className={styles.gridCompact}
        onChange={onSubTopicSelected}
      >
        <option value="" disabled selected={subTopic === undefined}>Please choose</option>
        {Array.from(topic.subTopics?.values()).map(item => {
          return (
            <option value={item.id}>{item.label}</option>
          );
        })}
      </select>
    )}
    </div>
    );
  }
 

  return <h1>No items</h1>;
};

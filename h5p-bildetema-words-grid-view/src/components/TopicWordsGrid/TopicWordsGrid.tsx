import * as React from "react";
import { useContentId } from "use-h5p";
import { Word as WordType } from "../../../../common/types/types";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
  showWrittenWords: boolean;
};

export const TopicWordsGrid: React.FC<TopicWordsGridProps> = ({
  words,
  showWrittenWords,
}) => {
  const [textVisible, setTextVisible] = React.useState(showWrittenWords);

  const handleChange = (e: Event): void => {
    setTextVisible((e.target as HTMLInputElement).checked);
  };

  const contentId = useContentId();

  React.useEffect(() => {
    // Temp Hack: Navigating from topic -> words causes document.getElementById(`toggle-${contentId}`) to be null, if we not wait...
    setTimeout(()=>{
      document
      .getElementById(`toggle-${contentId}`)
      ?.addEventListener("change", handleChange);
     }, 10)

    return () => {
      document
        .getElementById(`toggle-${contentId}`)
        ?.removeEventListener("change", handleChange);
    };
  },[contentId]);

  return (
    <div className={styles.topicgrid}>
      {words.map(word => (
        <Word key={word.id} word={word} textVisible={textVisible} />
      ))}
    </div>
  );
};
